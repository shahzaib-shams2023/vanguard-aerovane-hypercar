import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CAMERA_SHOTS,
  CaliperFinish,
  LiveryFinish,
} from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

export interface Ferrari488StageProps {
  activeShotId: string;
  activeLivery: LiveryFinish;
  activeCaliper: CaliperFinish;
  lampsOn: boolean;
  wheelSpinSpeed: number; // 0 when parked, >0 when spinning in chassis/track view
  interactiveOrbit: boolean;
  reducedMotion: boolean;
}

/**
 * Generates a CanvasTexture by shifting only the factory Rosso paint pixels
 * to the chosen bespoke RGB while leaving carbon fiber, intakes, grilles, and shading intact.
 */
function buildRecoloredLiveryTexture(
  sourceImg: HTMLImageElement | ImageBitmap,
  targetRgb: [number, number, number]
): THREE.CanvasTexture {
  const width = 'naturalWidth' in sourceImg && sourceImg.naturalWidth ? sourceImg.naturalWidth : sourceImg.width;
  const height = 'naturalHeight' in sourceImg && sourceImg.naturalHeight ? sourceImg.naturalHeight : sourceImg.height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.drawImage(sourceImg as CanvasImageSource, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const [tr, tg, tb] = targetRgb;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Identify factory red paint pixels by strong red channel dominance
    const maxGB = Math.max(g, b);
    if (r > 65 && r > maxGB * 1.45) {
      // Preserve painted surface shading luminance while adopting target hue
      const lum = Math.min(1.18, (0.299 * r + 0.587 * g + 0.114 * b) / 118);
      data[i] = Math.min(255, Math.round(tr * lum));
      data[i + 1] = Math.min(255, Math.round(tg * lum));
      data[i + 2] = Math.min(255, Math.round(tb * lum));
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

export const Ferrari488Stage: React.FC<Ferrari488StageProps> = ({
  activeShotId,
  activeLivery,
  activeCaliper,
  lampsOn,
  wheelSpinSpeed,
  interactiveOrbit,
  reducedMotion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shotRef = useRef<string>(activeShotId);
  const liveryRef = useRef<LiveryFinish>(activeLivery);
  const caliperRef = useRef<CaliperFinish>(activeCaliper);
  const lampsRef = useRef<boolean>(lampsOn);
  const wheelSpinRef = useRef<number>(wheelSpinSpeed);
  const orbitActiveRef = useRef<boolean>(interactiveOrbit);
  const reducedMotionRef = useRef<boolean>(reducedMotion);

  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  shotRef.current = activeShotId;
  liveryRef.current = activeLivery;
  caliperRef.current = activeCaliper;
  lampsRef.current = lampsOn;
  wheelSpinRef.current = wheelSpinSpeed;
  orbitActiveRef.current = interactiveOrbit;
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setLoadError('WebGL hardware rendering is unavailable in this browser context.');
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobileViewport = () => (container.clientWidth || window.innerWidth) < 1024;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileViewport() ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b);
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.052);

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 80);
    const initialShot = CAMERA_SHOTS.hero;
    camera.position.set(...initialShot.position);

    // Studio IBL environment for clearcoat lacquer & metallic rims
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTex = pmrem.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTex;
    roomEnv.dispose();
    pmrem.dispose();

    // Studio Architectural Lighting
    const ambient = new THREE.AmbientLight(0xf4f1ea, 0.25);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.8);
    keyLight.position.set(-4.5, 6.5, -4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = isMobileViewport() ? 1024 : 2048;
    keyLight.shadow.mapSize.height = isMobileViewport() ? 1024 : 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd8e2f0, 1.35);
    rimLight.position.set(5.5, 3.2, 4.5);
    scene.add(rimLight);

    // Overhead wind-tunnel light blade geometry (subtle architectural reflection line)
    const lightBladeGeo = new THREE.PlaneGeometry(5.6, 0.18);
    const lightBladeMat = new THREE.MeshBasicMaterial({
      color: 0xf4f1ea,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });
    const lightBlade = new THREE.Mesh(lightBladeGeo, lightBladeMat);
    lightBlade.rotation.x = Math.PI / 2;
    lightBlade.rotation.z = Math.PI / 2;
    lightBlade.position.set(0, 3.35, 0);
    scene.add(lightBlade);

    // Paddock Tarmac Floor with deep matte obsidian finish so studio lighting focuses on the car
    const floorGeo = new THREE.CircleGeometry(28, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070709,
      roughness: 0.92,
      metalness: 0.06,
      envMapIntensity: 0.12,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle overhead studio pool spotlight framing the vehicle on tarmac
    const studioPool = new THREE.SpotLight(0xfff5e8, 16, 16, Math.PI / 4, 0.75, 1.5);
    studioPool.position.set(0, 6.2, -0.4);
    scene.add(studioPool);

    // Subtle hairline turntable ring (1px architectural reference)
    const ringGeo = new THREE.RingGeometry(2.95, 2.965, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2c2e36,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const turntableRing = new THREE.Mesh(ringGeo, ringMat);
    turntableRing.rotation.x = -Math.PI / 2;
    turntableRing.position.y = 0.002;
    scene.add(turntableRing);

    // Headlight projector spots (activated when lampsOn === true)
    const leftBeam = new THREE.SpotLight(0xfff6e5, 0, 14, Math.PI / 5, 0.55, 1.4);
    leftBeam.position.set(-0.72, 0.52, -2.18);
    const leftTarget = new THREE.Object3D();
    leftTarget.position.set(-0.72, 0.0, -8.5);
    scene.add(leftTarget);
    leftBeam.target = leftTarget;
    scene.add(leftBeam);

    const rightBeam = new THREE.SpotLight(0xfff6e5, 0, 14, Math.PI / 5, 0.55, 1.4);
    rightBeam.position.set(0.72, 0.52, -2.18);
    const rightTarget = new THREE.Object3D();
    rightTarget.position.set(0.72, 0.0, -8.5);
    scene.add(rightTarget);
    rightBeam.target = rightTarget;
    scene.add(rightBeam);

    // OrbitControls for interactive Atelier 360 inspection
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false; // Never hijack vertical page scroll
    controls.minPolarAngle = 0.28;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.enabled = false;
    controls.target.set(...initialShot.target);

    // Model state & dynamic material handles
    const carRoot = new THREE.Group();
    scene.add(carRoot);

    interface WheelPivot {
      pivot: THREE.Group;
      isFront: boolean;
    }
    const wheelPivots: WheelPivot[] = [];
    const exteriorPaintMaterials: THREE.MeshPhysicalMaterial[] = [];
    const caliperMaterials: THREE.MeshStandardMaterial[] = [];
    const headlightMaterials: THREE.MeshStandardMaterial[] = [];
    const taillightMaterials: THREE.MeshStandardMaterial[] = [];

    let originalPaintTexture: THREE.Texture | null = null;
    const cachedLiveryTextures = new Map<string, THREE.CanvasTexture>();
    let appliedLiveryId = '';
    let appliedCaliperId = '';

    // Load 2018_ferrari_488_gt3.glb
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    let disposed = false;

    gltfLoader.load(
      './models/2018_ferrari_488_gt3.glb',
      (gltf) => {
        if (disposed) return;

        const root = gltf.scene;

        // CRITICAL: Hide BONNETCAM & DAMAGE subtrees so broken panels & scratches do not overlap LOD00
        root.traverse((obj) => {
          const upper = (obj.name || '').toUpperCase();
          if (
            upper === 'BONNETCAM' ||
            upper === 'DAMAGE' ||
            upper.includes('_DAMAGE') ||
            upper.includes('_BROKEN')
          ) {
            obj.visible = false;
          }
        });

        // Normalize scale to exact 4.72m real-world length (GLB FBX node carries a 0.01 scale matrix)
        const lod00 = root.getObjectByName('LOD00') ?? root;
        root.updateMatrixWorld(true);
        const unscaledBox = new THREE.Box3().setFromObject(lod00);
        const unscaledSize = unscaledBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(unscaledSize.x, unscaledSize.y, unscaledSize.z);
        if (maxDim > 0) {
          root.scale.multiplyScalar(4.72 / maxDim);
        }
        root.updateMatrixWorld(true);

        // Ground and center LOD00 accurately at y = 0
        const rawBox = new THREE.Box3().setFromObject(lod00);
        const center = rawBox.getCenter(new THREE.Vector3());
        root.position.set(-center.x, -rawBox.min.y, -center.z);
        root.updateMatrixWorld(true);

        // Build clean axle-centered wheel pivots (leaving brake calipers stationary)
        const wheelGroupNames = ['wheel_FL', 'wheel_FR', 'wheel_BL', 'wheel_BR'];
        wheelGroupNames.forEach((wName) => {
          const wGroup = root.getObjectByName(wName);
          if (!wGroup) return;

          const rotatingParts: THREE.Object3D[] = [];
          wGroup.children.forEach((child) => {
            const cname = child.name.toUpperCase();
            if (!cname.includes('CALIPER')) {
              rotatingParts.push(child);
            }
          });

          if (rotatingParts.length > 0) {
            const wBox = new THREE.Box3();
            rotatingParts.forEach((p) => wBox.expandByObject(p));
            const worldCenter = wBox.getCenter(new THREE.Vector3());
            // Convert world axle center into wGroup local space
            const localCenter = wGroup.worldToLocal(worldCenter.clone());

            const pivot = new THREE.Group();
            pivot.position.copy(localCenter);
            wGroup.add(pivot);

            rotatingParts.forEach((part) => {
              part.position.sub(localCenter);
              pivot.add(part);
            });

            wheelPivots.push({
              pivot,
              isFront: wName.includes('_F'),
            });
          }
        });

        // Tune materials on visible LOD00 meshes
        lod00.traverse((child) => {
          if (!child.visible) return;
          if (!(child as THREE.Mesh).isMesh) return;

          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const meshName = (mesh.name || '').toUpperCase();
          const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
          if (!mat) return;

          const matName = (mat.name || '').toLowerCase();

          if (matName.includes('mm_ext')) {
            if (!originalPaintTexture && mat.map) {
              originalPaintTexture = mat.map;
            }
            if (!exteriorPaintMaterials.includes(mat as THREE.MeshPhysicalMaterial)) {
              mat.metalness = 0.24;
              mat.roughness = 0.22;
              mat.envMapIntensity = 1.45;
              if ('clearcoat' in mat) {
                mat.clearcoat = 1.0;
                mat.clearcoatRoughness = 0.05;
              }
              exteriorPaintMaterials.push(mat as THREE.MeshPhysicalMaterial);
            }
          } else if (matName.includes('mm_wheel')) {
            mat.metalness = 0.78;
            mat.roughness = 0.22;
            mat.envMapIntensity = 1.4;
          } else if (matName.includes('mm_rotor')) {
            mat.metalness = 0.85;
            mat.roughness = 0.34;
            mat.envMapIntensity = 1.2;
          } else if (matName.includes('mm_windows')) {
            mat.envMapIntensity = 1.7;
            mat.roughness = 0.06;
            mat.opacity = 0.68;
          } else if (meshName.includes('BRAKE_CALIPER')) {
            const caliperMat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(caliperRef.current.hex),
              metalness: 0.45,
              roughness: 0.28,
              envMapIntensity: 1.2,
            });
            mesh.material = caliperMat;
            caliperMaterials.push(caliperMat);
          } else if (
            meshName.includes('FRONTBUMPER_MM_LIGHTS') ||
            meshName.includes('CHASSIS_MM_LIGHTS')
          ) {
            const hlMat = mat.clone();
            hlMat.emissive = new THREE.Color(0xfff2dc);
            hlMat.emissiveIntensity = 0;
            mesh.material = hlMat;
            headlightMaterials.push(hlMat);
          } else if (
            meshName.includes('TAILLIGHT') ||
            meshName.includes('BRAKES_LEFT') ||
            meshName.includes('BRAKES_RIGHT') ||
            meshName.includes('REARBUMPER_MM_LIGHTS')
          ) {
            const tlMat = mat.clone();
            tlMat.emissive = new THREE.Color(0xd91b10);
            tlMat.emissiveIntensity = 0.5;
            mesh.material = tlMat;
            taillightMaterials.push(tlMat);
          }
        });

        carRoot.add(root);
        (window as unknown as { __FERRARI_488__?: THREE.Object3D }).__FERRARI_488__ = root;
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.min(100, Math.round((xhr.loaded / xhr.total) * 100)));
        }
      },
      () => {
        setLoadError('Unable to load 2018_ferrari_488_gt3.glb asset.');
      }
    );

    // Pointer parallax (subtle studio camera breathing on desktop)
    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // WebGL Context Loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setLoadError('WebGL rendering context interrupted.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // Smooth camera interpolation state
    const currentCamPos = new THREE.Vector3(...initialShot.position);
    const currentCamTarget = new THREE.Vector3(...initialShot.target);
    const desiredCamPos = new THREE.Vector3();
    const desiredCamTarget = new THREE.Vector3();
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let wasOrbitActive = false;
    let prevWheelSpin = 0;

    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(0.05, clock.getDelta());

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const mobile = w < 1024;

      const shot = CAMERA_SHOTS[shotRef.current] ?? CAMERA_SHOTS.hero;

      // Apply livery change when needed
      const targetLiv = liveryRef.current;
      if (isLoaded || exteriorPaintMaterials.length > 0) {
        if (appliedLiveryId !== targetLiv.id && exteriorPaintMaterials.length > 0) {
          appliedLiveryId = targetLiv.id;

          let texToApply: THREE.Texture | null = originalPaintTexture;
          if (targetLiv.targetRgb && originalPaintTexture?.image) {
            let cached = cachedLiveryTextures.get(targetLiv.id);
            if (!cached) {
              cached = buildRecoloredLiveryTexture(originalPaintTexture.image, targetLiv.targetRgb);
              cachedLiveryTextures.set(targetLiv.id, cached);
            }
            texToApply = cached;
          }

          exteriorPaintMaterials.forEach((m) => {
            if (texToApply) m.map = texToApply;
            m.metalness = targetLiv.metalness;
            m.roughness = targetLiv.roughness;
            if ('clearcoat' in m) m.clearcoat = targetLiv.clearcoat;
            m.needsUpdate = true;
          });
        }

        const targetCal = caliperRef.current;
        if (appliedCaliperId !== targetCal.id && caliperMaterials.length > 0) {
          appliedCaliperId = targetCal.id;
          caliperMaterials.forEach((m) => {
            m.color.set(targetCal.hex);
          });
        }
      }

      // Lamps state
      const lampsActive = lampsRef.current;
      const targetBeam = lampsActive ? 3.8 : 0;
      leftBeam.intensity = THREE.MathUtils.lerp(leftBeam.intensity, targetBeam, 0.1);
      rightBeam.intensity = THREE.MathUtils.lerp(rightBeam.intensity, targetBeam, 0.1);
      headlightMaterials.forEach((m) => {
        m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, lampsActive ? 2.6 : 0.15, 0.1);
      });
      taillightMaterials.forEach((m) => {
        m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, lampsActive ? 2.4 : 0.65, 0.1);
      });

      // Wheel rotation (true-axis spin in chassis section)
      const spin = wheelSpinRef.current;
      if (spin < prevWheelSpin - 0.3) {
        gt3Audio.playTurboFlutter();
      }
      prevWheelSpin = spin;
      if (spin > 0 && wheelPivots.length > 0 && !reducedMotionRef.current) {
        const angularStep = spin * delta * 6.5;
        wheelPivots.forEach(({ pivot }) => {
          pivot.rotation.x -= angularStep;
        });
        gt3Audio.updateRpm(Math.min(1, spin / 2.2));
      } else {
        gt3Audio.updateRpm(0.08);
      }

      // Orbit vs Choreographed Camera
      const orbitOn = orbitActiveRef.current;
      if (orbitOn && !wasOrbitActive) {
        // Transition into OrbitControls cleanly from current camera pose
        camera.clearViewOffset();
        camera.updateProjectionMatrix();
        controls.target.copy(currentCamTarget);
        controls.enabled = true;
      } else if (!orbitOn && wasOrbitActive) {
        controls.enabled = false;
        currentCamPos.copy(camera.position);
        currentCamTarget.copy(controls.target);
      }
      wasOrbitActive = orbitOn;

      if (orbitOn) {
        controls.update();
      } else {
        const parallaxScale = reducedMotionRef.current || mobile ? 0 : 1;
        desiredCamPos.set(
          shot.position[0] + pointer.x * 0.12 * parallaxScale,
          shot.position[1] - pointer.y * 0.06 * parallaxScale,
          shot.position[2]
        );
        desiredCamTarget.set(...shot.target);

        const lerpFactor = reducedMotionRef.current ? 1 : 1 - Math.exp(-4.2 * delta);
        currentCamPos.lerp(desiredCamPos, lerpFactor);
        currentCamTarget.lerp(desiredCamTarget, lerpFactor);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentCamTarget);

        // Expand vertical FOV gently on portrait mobile/tablet so the 4.72m car fits cleanly
        const aspect = w / Math.max(1, h);
        const portraitBoost = aspect < 1 ? Math.min(20, (1 - aspect) * 34) : 0;
        const targetFov = shot.fov + portraitBoost;
        if (Math.abs(camera.fov - targetFov) > 0.05) {
          camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, lerpFactor);
        }

        // Responsive optical shift via setViewOffset
        const targetOffX = mobile ? 0 : shot.desktopOffsetX;
        const targetOffY = mobile ? shot.mobileOffsetY : 0;
        currentOffsetX = THREE.MathUtils.lerp(currentOffsetX, targetOffX, lerpFactor);
        currentOffsetY = THREE.MathUtils.lerp(currentOffsetY, targetOffY, lerpFactor);

        if (Math.abs(currentOffsetX) > 0.001 || Math.abs(currentOffsetY) > 0.001) {
          camera.setViewOffset(w, h, w * currentOffsetX, h * currentOffsetY, w, h);
        } else {
          camera.clearViewOffset();
        }
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const rw = container.clientWidth || window.innerWidth;
      const rh = container.clientHeight || window.innerHeight;
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, rw < 1024 ? 1.5 : 2));
      renderer.setSize(rw, rh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      controls.dispose();
      dracoLoader.dispose();
      cachedLiveryTextures.forEach((tex) => tex.dispose());
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive 3D 2018 Ferrari 488 GT3 Stage"
      className={`fixed inset-0 w-full h-full z-0 ${
        interactiveOrbit ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
    >
      {/* Non-blocking subtle corner load indicator while GLB streams */}
      {!isLoaded && !loadError && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-30 pointer-events-none bg-gunmetal/95 border border-hairline px-4 py-2.5 flex items-center gap-3 font-mono text-[11px] tracking-editorial uppercase text-chalk"
        >
          <span className="w-1.5 h-1.5 bg-rosso animate-pulse" />
          <span>488 GT3 GEOMETRY</span>
          <span className="text-ash tabular-nums">{loadProgress}%</span>
        </div>
      )}

      {/* Graceful fallback if WebGL or GLB fails */}
      {loadError && (
        <div className="fixed inset-0 flex items-center justify-center bg-tarmac px-6 z-0 pointer-events-none">
          <div className="max-w-md border border-hairline bg-gunmetal p-6 text-center space-y-2">
            <p className="font-mono text-[11px] tracking-telemetry uppercase text-rosso">
              3D STAGE NOTICE
            </p>
            <p className="font-sans text-sm text-ash">{loadError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

