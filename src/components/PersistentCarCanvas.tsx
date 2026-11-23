import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface CarPaintOption {
  id: string;
  name: string;
  color: string;
  hex: number;
  roughness: number;
  metalness: number;
}

export const PAINT_OPTIONS: CarPaintOption[] = [
  { id: 'rosso-corsa', name: 'Rosso Corsa Crimson', color: '#D40000', hex: 0xd40000, roughness: 0.15, metalness: 0.85 },
  { id: 'nero-daytona', name: 'Nero Daytona Carbon', color: '#111215', hex: 0x111215, roughness: 0.12, metalness: 0.9 },
  { id: 'grigio-titanio', name: 'Grigio Titanio Silver', color: '#8E94A0', hex: 0x8e94a0, roughness: 0.18, metalness: 0.92 },
  { id: 'giallo-modena', name: 'Giallo Modena Yellow', color: '#FFB800', hex: 0xffb800, roughness: 0.2, metalness: 0.8 },
  { id: 'monaco-azzurro', name: 'Monaco Azzurro Cerulean', color: '#0055A5', hex: 0x0055a5, roughness: 0.16, metalness: 0.88 },
];

interface PersistentCarCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activePaint: CarPaintOption;
  onModelLoaded?: () => void;
}

export const PersistentCarCanvas: React.FC<PersistentCarCanvasProps> = ({
  scrollProgress,
  activePaint,
  onModelLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(scrollProgress);
  const activePaintRef = useRef<CarPaintOption>(activePaint);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  scrollRef.current = scrollProgress;
  activePaintRef.current = activePaint;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.055);

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.2, 1.3, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. STUDIO ENVIRONMENT & LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key overhead warm softbox light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.8);
    keyLight.position.set(5, 7, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Rim back light (sculpts roofline)
    const rimLight = new THREE.DirectionalLight(0x70aaff, 1.6);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // Underbody track diffuser glow (Rosso Corsa red)
    const underGlow = new THREE.PointLight(0xe61a24, 2.2, 7);
    underGlow.position.set(0, -0.2, 0);
    scene.add(underGlow);

    // 3. STUDIO FLOOR & TELEMETRY RINGS
    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c10,
      roughness: 0.65,
      metalness: 0.35,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.4;
    floor.receiveShadow = true;
    floorGroup.add(floor);

    // Precision Ring Dial on floor
    const ringGeo = new THREE.RingGeometry(3.1, 3.14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x232733,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.395;
    floorGroup.add(ring);

    // 4. KINETIC SPEEDLINES (Active during Performance section)
    const speedlineCount = 120;
    const speedlineGeo = new THREE.BufferGeometry();
    const speedlinePositions = new Float32Array(speedlineCount * 3);
    const speedlineSpeeds: number[] = [];

    for (let i = 0; i < speedlineCount; i++) {
      speedlinePositions[i * 3] = (Math.random() - 0.5) * 12;
      speedlinePositions[i * 3 + 1] = Math.random() * 2.5 - 0.3;
      speedlinePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speedlineSpeeds.push(Math.random() * 0.15 + 0.08);
    }
    speedlineGeo.setAttribute('position', new THREE.BufferAttribute(speedlinePositions, 3));

    const speedlineMat = new THREE.PointsMaterial({
      color: 0xff333d,
      size: 0.045,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const speedlines = new THREE.Points(speedlineGeo, speedlineMat);
    scene.add(speedlines);

    // 5. CAR MODEL & MATERIALS
    const carRoot = new THREE.Group();
    scene.add(carRoot);

    // Materials map for real-time car tuning
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activePaintRef.current.hex),
      metalness: 0.88,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      transparent: true,
      opacity: 0.35,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      metalness: 0.8,
      roughness: 0.45,
    });

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a92a0,
      metalness: 0.95,
      roughness: 0.22,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x151618,
      metalness: 0.05,
      roughness: 0.88,
    });

    const bodyMeshes: THREE.Mesh[] = [];

    // Load Model with Draco decompression
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      './models/ferrari.glb',
      (gltf) => {
        const car = gltf.scene;

        car.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const meshName = (mesh.name || '').toLowerCase();
            const origMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            const matName = (origMat?.name || '').toLowerCase();

            // Target the main body paint specifically for custom automotive lacquer clearcoat
            if (
              matName.includes('body_color') ||
              matName.includes('yellow') ||
              matName.includes('dodger') ||
              meshName.includes('body')
            ) {
              mesh.material = bodyMaterial;
              bodyMeshes.push(mesh);
            } else if (matName.includes('glass')) {
              // Ensure glass has refined transparency
              mesh.material = glassMaterial;
            } else if (matName.includes('metal_chrome')) {
              // Ensure chrome accents shine
              (origMat as THREE.MeshStandardMaterial).metalness = 0.95;
              (origMat as THREE.MeshStandardMaterial).roughness = 0.1;
            } else if (matName.includes('tires')) {
              // Proper tire rubber
              (origMat as THREE.MeshStandardMaterial).roughness = 0.85;
            }
          }
        });

        // Center and normalize scale
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());
        car.position.sub(center);
        car.position.y += 0.04;

        carRoot.add(car);
        setIsLoaded(true);
        if (onModelLoaded) onModelLoaded();
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading car GLB:', error);
      }
    );

    // 6. SCROLL CHOREOGRAPHY & KEYFRAME INTERPOLATION
    // Target vectors for smooth lerping
    const targetCarPos = new THREE.Vector3();
    const targetCarRot = new THREE.Euler();
    const targetCamPos = new THREE.Vector3();
    const targetCamTarget = new THREE.Vector3();

    const currentCamTarget = new THREE.Vector3(0, 0.1, 0);

    const calculateKeyframe = (p: number) => {
      // p is between 0.0 (top) and 1.0 (bottom)
      if (p <= 0.16) {
        // Section 1: Hero Front 3/4 Stance
        const t = p / 0.16;
        targetCarPos.set(0.8, -0.38, 0.2);
        targetCarRot.set(0, 2.25 + t * 0.15, 0);
        targetCamPos.set(3.4, 1.25, 4.2);
        targetCamTarget.set(0.4, 0.15, 0);
        speedlineMat.opacity = 0;
      } else if (p <= 0.36) {
        // Section 2: Aerodynamics & Front Flanks
        const t = (p - 0.16) / 0.2;
        targetCarPos.set(
          THREE.MathUtils.lerp(0.8, -1.1, t),
          -0.38,
          THREE.MathUtils.lerp(0.2, 0.6, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(2.4, 3.6, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(3.4, 2.4, t),
          THREE.MathUtils.lerp(1.25, 0.95, t),
          THREE.MathUtils.lerp(4.2, 3.0, t)
        );
        targetCamTarget.set(
          THREE.MathUtils.lerp(0.4, -0.6, t),
          0.25,
          THREE.MathUtils.lerp(0, 0.2, t)
        );
        speedlineMat.opacity = t * 0.25;
      } else if (p <= 0.56) {
        // Section 3: Powertrain & Velocity (Rear haunches & diffuser)
        const t = (p - 0.36) / 0.2;
        targetCarPos.set(
          THREE.MathUtils.lerp(-1.1, 1.3, t),
          -0.38,
          THREE.MathUtils.lerp(0.6, -0.4, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(3.6, 5.8, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(2.4, -2.4, t),
          THREE.MathUtils.lerp(0.95, 0.75, t),
          THREE.MathUtils.lerp(3.0, -2.6, t)
        );
        targetCamTarget.set(
          THREE.MathUtils.lerp(-0.6, 0.6, t),
          0.32,
          THREE.MathUtils.lerp(0.2, 0, t)
        );
        speedlineMat.opacity = 0.85;
      } else if (p <= 0.74) {
        // Section 4: Engineering & Monocoque (High-angle CAD blueprint)
        const t = (p - 0.56) / 0.18;
        targetCarPos.set(
          THREE.MathUtils.lerp(1.3, 0, t),
          -0.35,
          THREE.MathUtils.lerp(-0.4, 0, t)
        );
        targetCarRot.set(
          THREE.MathUtils.lerp(0, 0.22, t),
          THREE.MathUtils.lerp(5.8, 7.2, t),
          0
        );
        targetCamPos.set(
          THREE.MathUtils.lerp(-2.4, 0.1, t),
          THREE.MathUtils.lerp(0.75, 3.8, t),
          THREE.MathUtils.lerp(-2.6, 3.2, t)
        );
        targetCamTarget.set(0, 0, 0);
        speedlineMat.opacity = (1 - t) * 0.85;
      } else if (p <= 0.88) {
        // Section 5: Cockpit & Ergonomics (Camera dive towards driver cabin)
        const t = (p - 0.74) / 0.14;
        targetCarPos.set(
          THREE.MathUtils.lerp(0, 0.2, t),
          THREE.MathUtils.lerp(-0.35, -0.55, t),
          THREE.MathUtils.lerp(0, 0.3, t)
        );
        targetCarRot.set(
          THREE.MathUtils.lerp(0.22, 0, t),
          THREE.MathUtils.lerp(7.2, 8.6, t),
          0
        );
        targetCamPos.set(
          THREE.MathUtils.lerp(0.1, 0.55, t),
          THREE.MathUtils.lerp(3.8, 0.95, t),
          THREE.MathUtils.lerp(3.2, 1.35, t)
        );
        targetCamTarget.set(0.05, 0.65, 0.1);
        speedlineMat.opacity = 0;
      } else {
        // Section 6: Runway Finale & Atelier Configurator
        const t = Math.min(1, (p - 0.88) / 0.12);
        targetCarPos.set(
          THREE.MathUtils.lerp(0.2, 0, t),
          THREE.MathUtils.lerp(-0.55, -0.38, t),
          THREE.MathUtils.lerp(0.3, 0, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(8.6, 8.4, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(0.55, 3.4, t),
          THREE.MathUtils.lerp(0.95, 1.25, t),
          THREE.MathUtils.lerp(1.35, 4.0, t)
        );
        targetCamTarget.set(0, 0.15, 0);
        speedlineMat.opacity = 0;
      }
    };

    // 7. ANIMATION TICKER
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Compute targets based on current scroll
      calculateKeyframe(scrollRef.current);

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos, 0.08);
      currentCamTarget.lerp(targetCamTarget, 0.08);
      camera.lookAt(currentCamTarget);

      // Smooth car interpolation
      carRoot.position.lerp(targetCarPos, 0.08);
      carRoot.rotation.x = THREE.MathUtils.lerp(carRoot.rotation.x, targetCarRot.x, 0.08);
      carRoot.rotation.y = THREE.MathUtils.lerp(carRoot.rotation.y, targetCarRot.y, 0.08);
      carRoot.rotation.z = THREE.MathUtils.lerp(carRoot.rotation.z, targetCarRot.z, 0.08);

      // Dynamic paint material color update
      const activeHex = activePaintRef.current.hex;
      if (bodyMaterial.color.getHex() !== activeHex) {
        bodyMaterial.color.setHex(activeHex);
        underGlow.color.setHex(activeHex);
      }

      // Speedlines streaming animation
      if (speedlineMat.opacity > 0.01) {
        const posArr = speedlineGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < speedlineCount; i++) {
          posArr[i * 3 + 2] += speedlineSpeeds[i] * 1.8;
          if (posArr[i * 3 + 2] > 7) {
            posArr[i * 3 + 2] = -7;
          }
        }
        speedlineGeo.attributes.position.needsUpdate = true;
      }

      // Floor ring slow rotation
      ring.rotation.z = time * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    >
      {/* Loading HUD overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-vanguard-dark z-50 pointer-events-auto">
          <div className="space-y-4 text-center max-w-sm px-6">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase">
              <span className="w-2 h-2 rounded-full bg-vanguard-red animate-ping" />
              <span>INITIALIZING V12 POWERTRAIN GEOMETRY</span>
            </div>
            <div className="font-display text-2xl tracking-wider text-vanguard-silver">
              VANGUARD AEROVANE
            </div>
            <div className="w-full h-1 bg-vanguard-panel rounded-full overflow-hidden">
              <div
                className="h-full bg-vanguard-red transition-all duration-200"
                style={{ width: `${Math.max(10, loadingProgress)}%` }}
              />
            </div>
            <div className="font-mono text-xs text-vanguard-muted">
              TELEMETRY BUFFER: {loadingProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

