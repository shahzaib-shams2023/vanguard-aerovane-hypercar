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
  { id: 'rosso-corsa', name: 'Rosso Corsa Crimson', color: '#D40000', hex: 0xd40000, roughness: 0.12, metalness: 0.88 },
  { id: 'nero-daytona', name: 'Nero Daytona Carbon', color: '#111215', hex: 0x111215, roughness: 0.1, metalness: 0.92 },
  { id: 'grigio-titanio', name: 'Grigio Titanio Silver', color: '#8E94A0', hex: 0x8e94a0, roughness: 0.16, metalness: 0.94 },
  { id: 'giallo-modena', name: 'Giallo Modena Yellow', color: '#FFB800', hex: 0xffb800, roughness: 0.18, metalness: 0.82 },
  { id: 'monaco-azzurro', name: 'Monaco Azzurro Cerulean', color: '#0055A5', hex: 0x0055a5, roughness: 0.14, metalness: 0.9 },
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
    scene.fog = new THREE.FogExp2(0x07080a, 0.05);

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.4, 1.2, 4.4);

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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. STUDIO ENVIRONMENT & LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Overhead key softbox light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Cool rim light (outlines the aerodynamic waistline)
    const rimLight = new THREE.DirectionalLight(0x75b0ff, 1.8);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // Fill light (ensures wheel arches & underbody are beautifully lit)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(0, 2, 6);
    scene.add(fillLight);

    // Rosso Corsa diffuser ground effect glow
    const underGlow = new THREE.PointLight(0xe61a24, 2.5, 8);
    underGlow.position.set(0, -0.4, 0);
    scene.add(underGlow);

    // 3. STUDIO FLOOR & TELEMETRY RINGS
    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    const groundLevel = -0.55;

    const floorGeo = new THREE.PlaneGeometry(48, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07080a,
      roughness: 0.72,
      metalness: 0.28,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = groundLevel;
    floor.receiveShadow = true;
    floorGroup.add(floor);

    // Telemetry track ring on floor
    const ringGeo = new THREE.RingGeometry(3.2, 3.24, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1f232d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = groundLevel + 0.002;
    floorGroup.add(ring);

    // Inner dashed orbit ring
    const innerRingGeo = new THREE.RingGeometry(2.1, 2.12, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x242833,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = groundLevel + 0.003;
    floorGroup.add(innerRing);

    // 4. KINETIC SPEEDLINES (Active during Performance section)
    const speedlineCount = 120;
    const speedlineGeo = new THREE.BufferGeometry();
    const speedlinePositions = new Float32Array(speedlineCount * 3);
    const speedlineSpeeds: number[] = [];

    for (let i = 0; i < speedlineCount; i++) {
      speedlinePositions[i * 3] = (Math.random() - 0.5) * 14;
      speedlinePositions[i * 3 + 1] = Math.random() * 2.5 - 0.4;
      speedlinePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      speedlineSpeeds.push(Math.random() * 0.16 + 0.09);
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
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.92,
      transparent: true,
      opacity: 0.32,
    });

    const alloyRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde3ea,
      metalness: 0.95,
      roughness: 0.15,
    });

    const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00,
      metalness: 0.35,
      roughness: 0.25,
    });

    const brakeDiscMaterial = new THREE.MeshStandardMaterial({
      color: 0x363940,
      metalness: 0.85,
      roughness: 0.35,
    });

    const tireRubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      metalness: 0.04,
      roughness: 0.88,
    });

    const carbonFiberMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      metalness: 0.75,
      roughness: 0.45,
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

            // 1. Car Body Lacquer Paint
            if (
              matName.includes('body_color') ||
              matName.includes('dodger') ||
              meshName.includes('body')
            ) {
              mesh.material = bodyMaterial;
              bodyMeshes.push(mesh);
            }
            // 2. Glass and windscreen
            else if (matName.includes('glass')) {
              mesh.material = glassMaterial;
            }
            // 3. Forged Alloy Rims
            else if (
              meshName.includes('rim') ||
              meshName === 'wheel' ||
              matName.includes('metal_chrome') ||
              (matName.includes('metal_gray') && (meshName.includes('rim') || meshName.includes('wheel')))
            ) {
              mesh.material = alloyRimMaterial;
            }
            // 4. Brake Discs
            else if (meshName.includes('brake')) {
              mesh.material = brakeDiscMaterial;
            }
            // 5. Brake Calipers & Wheel Badges
            else if (
              meshName.includes('centre') ||
              matName.includes('ferrari_yellow') ||
              meshName.includes('caliper')
            ) {
              mesh.material = brakeCaliperMaterial;
            }
            // 6. Pirelli Compound Tires
            else if (meshName.includes('tire') || matName.includes('tires')) {
              mesh.material = tireRubberMaterial;
            }
            // 7. Carbon Fiber Aerodynamic Elements
            else if (
              matName.includes('carbon') ||
              meshName.includes('carbon') ||
              meshName.includes('diffuser') ||
              meshName.includes('splitter')
            ) {
              mesh.material = carbonFiberMaterial;
            }
          }
        });

        // ACCURATELY GROUND THE CAR:
        // Calculate the bounding box of the entire vehicle
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());

        // Center X and Z so rotation occurs around vehicle center
        car.position.x = -center.x;
        car.position.z = -center.z;
        // Position car vertically so the absolute bottom of the tires (box.min.y) sits on y = 0
        car.position.y = -box.min.y;

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
    const targetCarPos = new THREE.Vector3();
    const targetCarRot = new THREE.Euler();
    const targetCamPos = new THREE.Vector3();
    const targetCamTarget = new THREE.Vector3();

    const currentCamTarget = new THREE.Vector3(0.3, 0.2, 0);

    const calculateKeyframe = (p: number) => {
      // p: 0.0 (hero top) to 1.0 (configurator bottom)
      // Car ground elevation is locked to groundLevel = -0.55 so tires touch the floor with 0 clipping
      if (p <= 0.16) {
        // Section 1: Hero Front 3/4 Dynamic Stance
        const t = p / 0.16;
        targetCarPos.set(1.25, groundLevel, 0.15);
        targetCarRot.set(0, 2.28 + t * 0.15, 0);
        targetCamPos.set(3.6, 1.2, 4.4);
        targetCamTarget.set(0.65, 0.2, 0);
        speedlineMat.opacity = 0;
      } else if (p <= 0.36) {
        // Section 2: Aerodynamics & Front Flanks
        const t = (p - 0.16) / 0.2;
        targetCarPos.set(
          THREE.MathUtils.lerp(1.25, -1.0, t),
          groundLevel,
          THREE.MathUtils.lerp(0.15, 0.5, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(2.45, 3.65, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(3.4, 2.5, t),
          THREE.MathUtils.lerp(1.15, 0.9, t),
          THREE.MathUtils.lerp(4.2, 3.2, t)
        );
        targetCamTarget.set(
          THREE.MathUtils.lerp(0.35, -0.6, t),
          0.22,
          THREE.MathUtils.lerp(0, 0.2, t)
        );
        speedlineMat.opacity = t * 0.25;
      } else if (p <= 0.56) {
        // Section 3: Powertrain & Velocity (Rear haunches & active diffuser)
        const t = (p - 0.36) / 0.2;
        targetCarPos.set(
          THREE.MathUtils.lerp(-1.0, 1.25, t),
          groundLevel,
          THREE.MathUtils.lerp(0.5, -0.3, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(3.65, 5.85, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(2.5, -2.5, t),
          THREE.MathUtils.lerp(0.9, 0.72, t),
          THREE.MathUtils.lerp(3.2, -2.7, t)
        );
        targetCamTarget.set(
          THREE.MathUtils.lerp(-0.6, 0.65, t),
          0.28,
          THREE.MathUtils.lerp(0.2, 0, t)
        );
        speedlineMat.opacity = 0.85;
      } else if (p <= 0.74) {
        // Section 4: Engineering & Monocoque (High-angle CAD blueprint)
        const t = (p - 0.56) / 0.18;
        targetCarPos.set(
          THREE.MathUtils.lerp(1.25, 0, t),
          groundLevel + 0.05,
          THREE.MathUtils.lerp(-0.3, 0, t)
        );
        targetCarRot.set(
          THREE.MathUtils.lerp(0, 0.18, t),
          THREE.MathUtils.lerp(5.85, 7.3, t),
          0
        );
        targetCamPos.set(
          THREE.MathUtils.lerp(-2.5, 0.1, t),
          THREE.MathUtils.lerp(0.72, 3.8, t),
          THREE.MathUtils.lerp(-2.7, 3.2, t)
        );
        targetCamTarget.set(0, 0.05, 0);
        speedlineMat.opacity = (1 - t) * 0.85;
      } else if (p <= 0.88) {
        // Section 5: Cockpit & Ergonomics (Driver cabin dive)
        const t = (p - 0.74) / 0.14;
        targetCarPos.set(
          THREE.MathUtils.lerp(0, 0.2, t),
          groundLevel,
          THREE.MathUtils.lerp(0, 0.25, t)
        );
        targetCarRot.set(
          THREE.MathUtils.lerp(0.18, 0, t),
          THREE.MathUtils.lerp(7.3, 8.7, t),
          0
        );
        targetCamPos.set(
          THREE.MathUtils.lerp(0.1, 0.55, t),
          THREE.MathUtils.lerp(3.8, 0.95, t),
          THREE.MathUtils.lerp(3.2, 1.35, t)
        );
        targetCamTarget.set(0.08, 0.65, 0.1);
        speedlineMat.opacity = 0;
      } else {
        // Section 6: Runway Finale & Atelier Configurator
        const t = Math.min(1, (p - 0.88) / 0.12);
        targetCarPos.set(
          THREE.MathUtils.lerp(0.2, 0, t),
          groundLevel,
          THREE.MathUtils.lerp(0.25, 0, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(8.7, 8.5, t), 0);
        targetCamPos.set(
          THREE.MathUtils.lerp(0.55, 3.5, t),
          THREE.MathUtils.lerp(0.95, 1.25, t),
          THREE.MathUtils.lerp(1.35, 4.2, t)
        );
        targetCamTarget.set(0, 0.18, 0);
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

      // Dynamic paint material update
      const activeHex = activePaintRef.current.hex;
      if (bodyMaterial.color.getHex() !== activeHex) {
        bodyMaterial.color.setHex(activeHex);
        underGlow.color.setHex(activeHex);
      }

      // Speedlines streaming animation
      if (speedlineMat.opacity > 0.01) {
        const posArr = speedlineGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < speedlineCount; i++) {
          posArr[i * 3 + 2] += speedlineSpeeds[i] * 2.0;
          if (posArr[i * 3 + 2] > 8) {
            posArr[i * 3 + 2] = -8;
          }
        }
        speedlineGeo.attributes.position.needsUpdate = true;
      }

      // Floor ring slow telemetry spin
      ring.rotation.z = time * 0.03;
      innerRing.rotation.z = -time * 0.02;

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
            <div className="font-display text-2xl tracking-wider text-vanguard-silver font-bold">
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
