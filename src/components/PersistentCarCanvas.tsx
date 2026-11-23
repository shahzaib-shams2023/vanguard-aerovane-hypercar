import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { hypercarAudio } from '../utils/sound';

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
  selectedComponent?: string | null;
  aeroMode?: 'downforce' | 'vmax';
  onModelLoaded?: () => void;
}

export const PersistentCarCanvas: React.FC<PersistentCarCanvasProps> = ({
  scrollProgress,
  activePaint,
  selectedComponent = null,
  aeroMode = 'downforce',
  onModelLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(scrollProgress);
  const activePaintRef = useRef<CarPaintOption>(activePaint);
  const selectedComponentRef = useRef<string | null>(selectedComponent);
  const aeroModeRef = useRef<'downforce' | 'vmax'>(aeroMode);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  scrollRef.current = scrollProgress;
  activePaintRef.current = activePaint;
  selectedComponentRef.current = selectedComponent;
  aeroModeRef.current = aeroMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ==========================================
    // 1. SCENE & CAMERA SETUP
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060709, 0.045);

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.08,
      120
    );
    camera.position.set(3.6, 1.2, 4.4);

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
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ==========================================
    // 2. COMPREHENSIVE LIGHTING ENVIRONMENT
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Softbox Light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Cool Rim Light (aerodynamic silhouette)
    const rimLight = new THREE.DirectionalLight(0x70aaff, 2.2);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    // Ground Diffuser Underglow
    const underGlow = new THREE.PointLight(0xe61a24, 2.8, 7);
    underGlow.position.set(0, -0.42, 0);
    scene.add(underGlow);

    // Dynamic Headlight Beam Projectors (Forward road illumination)
    const leftHeadlight = new THREE.SpotLight(0xd5eeff, 0, 18, Math.PI / 6, 0.45, 1.2);
    leftHeadlight.position.set(-0.6, 0.45, -2.1);
    const leftTarget = new THREE.Object3D();
    leftTarget.position.set(-0.6, -0.5, -9);
    scene.add(leftTarget);
    leftHeadlight.target = leftTarget;
    scene.add(leftHeadlight);

    const rightHeadlight = new THREE.SpotLight(0xd5eeff, 0, 18, Math.PI / 6, 0.45, 1.2);
    rightHeadlight.position.set(0.6, 0.45, -2.1);
    const rightTarget = new THREE.Object3D();
    rightTarget.position.set(0.6, -0.5, -9);
    scene.add(rightTarget);
    rightHeadlight.target = rightTarget;
    scene.add(rightHeadlight);

    // Rear Taillight / Exhaust Afterburner Glow
    const taillightGlow = new THREE.PointLight(0xff1122, 0, 6);
    taillightGlow.position.set(0, 0.35, 2.4);
    scene.add(taillightGlow);

    // High-speed Twin Exhaust Flame Core
    const exhaustFlame = new THREE.PointLight(0x00f0ff, 0, 3.5);
    exhaustFlame.position.set(0, 0.28, 2.3);
    scene.add(exhaustFlame);

    // ==========================================
    // 3. MULTI-ENVIRONMENT FLOOR & WORLDS
    // ==========================================
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    const groundLevel = -0.55;

    // Base Studio Floor
    const floorGeo = new THREE.PlaneGeometry(64, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x06070a,
      roughness: 0.65,
      metalness: 0.35,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = groundLevel;
    floor.receiveShadow = true;
    worldGroup.add(floor);

    // Ambient Floor Telemetry Ring
    const ringGeo = new THREE.RingGeometry(3.2, 3.25, 72);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1f232d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = groundLevel + 0.002;
    worldGroup.add(ring);

    // Inner Dashed Orbit Ring
    const innerRingGeo = new THREE.RingGeometry(2.1, 2.12, 72);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x272c38,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = groundLevel + 0.003;
    worldGroup.add(innerRing);

    // ------------------------------------------
    // Environment 2: CFD Aerodynamic Streamline Ribbons
    // ------------------------------------------
    const cfdCount = 380;
    const cfdGeo = new THREE.BufferGeometry();
    const cfdPositions = new Float32Array(cfdCount * 3);
    const cfdOriginals: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < cfdCount; i++) {
      const spreadX = (Math.random() - 0.5) * 2.2;
      const spreadY = Math.random() * 1.2 + 0.1;
      const startZ = -4.5 - Math.random() * 3;
      cfdPositions[i * 3] = spreadX;
      cfdPositions[i * 3 + 1] = spreadY;
      cfdPositions[i * 3 + 2] = startZ;
      cfdOriginals.push({
        x: spreadX,
        y: spreadY,
        z: startZ,
        speed: 0.08 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }
    cfdGeo.setAttribute('position', new THREE.BufferAttribute(cfdPositions, 3));

    const cfdMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.042,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const cfdParticles = new THREE.Points(cfdGeo, cfdMat);
    scene.add(cfdParticles);

    // ------------------------------------------
    // Environment 3: High-Speed Night Runway / Tunnel Gantries
    // ------------------------------------------
    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    // 12 Overhead Neon Architectural Gantries
    const gantryCount = 12;
    const gantries: THREE.LineSegments[] = [];
    for (let i = 0; i < gantryCount; i++) {
      const archPts = [
        new THREE.Vector3(-4.5, groundLevel, 0),
        new THREE.Vector3(-4.5, 4.2, 0),
        new THREE.Vector3(4.5, 4.2, 0),
        new THREE.Vector3(4.5, groundLevel, 0),
      ];
      const archGeo = new THREE.BufferGeometry().setFromPoints(archPts);
      const archMat = new THREE.LineBasicMaterial({
        color: 0xe61a24,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const arch = new THREE.LineSegments(archGeo, archMat);
      arch.position.z = (i - 6) * 4.5;
      tunnelGroup.add(arch);
      gantries.push(arch);
    }

    // High-Speed Racing Track Curb Lines (Red & White kerbing dashes)
    const curbCount = 40;
    const curbGroup = new THREE.Group();
    scene.add(curbGroup);
    const curbs: THREE.Mesh[] = [];

    for (let i = 0; i < curbCount; i++) {
      const isRed = i % 2 === 0;
      const curbMat = new THREE.MeshBasicMaterial({
        color: isRed ? 0xe61a24 : 0xe4e7ee,
        transparent: true,
        opacity: 0,
      });
      const curbGeo = new THREE.PlaneGeometry(0.35, 1.2);

      // Left curb
      const curbLeft = new THREE.Mesh(curbGeo, curbMat);
      curbLeft.rotation.x = -Math.PI / 2;
      curbLeft.position.set(-2.8, groundLevel + 0.004, (i - 20) * 1.5);
      curbGroup.add(curbLeft);
      curbs.push(curbLeft);

      // Right curb
      const curbRight = new THREE.Mesh(curbGeo, curbMat);
      curbRight.rotation.x = -Math.PI / 2;
      curbRight.position.set(2.8, groundLevel + 0.004, (i - 20) * 1.5);
      curbGroup.add(curbRight);
      curbs.push(curbRight);
    }

    // Hypersonic Particle Velocity Streamlines
    const speedlineCount = 180;
    const speedlineGeo = new THREE.BufferGeometry();
    const speedlinePositions = new Float32Array(speedlineCount * 3);
    const speedlineSpeeds: number[] = [];

    for (let i = 0; i < speedlineCount; i++) {
      speedlinePositions[i * 3] = (Math.random() - 0.5) * 16;
      speedlinePositions[i * 3 + 1] = Math.random() * 3.5 - 0.3;
      speedlinePositions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      speedlineSpeeds.push(Math.random() * 0.32 + 0.18);
    }
    speedlineGeo.setAttribute('position', new THREE.BufferAttribute(speedlinePositions, 3));

    const speedlineMat = new THREE.PointsMaterial({
      color: 0xff333d,
      size: 0.05,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const speedlines = new THREE.Points(speedlineGeo, speedlineMat);
    scene.add(speedlines);

    // ------------------------------------------
    // Environment 4: Engineering Holographic CAD Laser Grid
    // ------------------------------------------
    const cadGridHelper = new THREE.GridHelper(24, 32, 0x00f0ff, 0x122533);
    cadGridHelper.position.y = groundLevel + 0.005;
    (cadGridHelper.material as THREE.Material).transparent = true;
    (cadGridHelper.material as THREE.Material).opacity = 0;
    scene.add(cadGridHelper);

    // 3D CAD Holographic Callout Targets
    const calloutGroup = new THREE.Group();
    scene.add(calloutGroup);

    interface CalloutPin {
      id: string;
      name: string;
      pos: THREE.Vector3;
      marker: THREE.Mesh;
    }
    const calloutPins: CalloutPin[] = [];

    const pinCoords = [
      { id: 'suspension', name: 'PUSHROD INBOARD DAMPERS', pos: new THREE.Vector3(0, 0.42, -1.05) },
      { id: 'monocoque', name: 'T800 CARBON MONOCOQUE', pos: new THREE.Vector3(0, 0.65, 0.05) },
      { id: 'powertrain', name: '6.5L V12 HYBRID CORE', pos: new THREE.Vector3(0, 0.58, 0.95) },
      { id: 'brakes', name: '410MM C-SiC CERAMIC ROTORS', pos: new THREE.Vector3(0.85, 0.35, -1.15) },
    ];

    pinCoords.forEach((p) => {
      const pinGeo = new THREE.RingGeometry(0.08, 0.095, 32);
      const pinMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(p.pos);
      pinMesh.lookAt(p.pos.clone().add(new THREE.Vector3(1, 1, 1)));
      calloutGroup.add(pinMesh);
      calloutPins.push({ id: p.id, name: p.name, pos: p.pos, marker: pinMesh });
    });

    // ------------------------------------------
    // Environment 5: Cockpit Digital Apex HUD Projection
    // ------------------------------------------
    const hudCanvas = document.createElement('canvas');
    hudCanvas.width = 512;
    hudCanvas.height = 256;
    const hudCtx = hudCanvas.getContext('2d');
    const hudTexture = new THREE.CanvasTexture(hudCanvas);

    const hudPlaneGeo = new THREE.PlaneGeometry(0.48, 0.24);
    const hudPlaneMat = new THREE.MeshBasicMaterial({
      map: hudTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const hudPlane = new THREE.Mesh(hudPlaneGeo, hudPlaneMat);
    // Positioned directly in pilot's forward sightline ahead of the steering wheel
    hudPlane.position.set(-0.35, 0.88, -0.62);
    hudPlane.rotation.x = 0.05;
    scene.add(hudPlane);

    // ==========================================
    // 4. CAR MODEL, MATERIALS & GRANULAR MESHES
    // ==========================================
    const carRoot = new THREE.Group();
    scene.add(carRoot);

    // Advanced Materials Map
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activePaintRef.current.hex),
      metalness: 0.88,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96,
      transparent: true,
      opacity: 1.0,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111620,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.94,
      transparent: true,
      opacity: 0.35,
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

    // Emissive Headlights & Taillights
    const headlightsMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0x88ccff),
      emissiveIntensity: 0,
      metalness: 0.2,
      roughness: 0.1,
    });

    const taillightsMaterial = new THREE.MeshStandardMaterial({
      color: 0x440000,
      emissive: new THREE.Color(0xff1122),
      emissiveIntensity: 0,
      metalness: 0.2,
      roughness: 0.1,
    });

    // F1 Steering Wheel Shift LED Strip
    const steeringLedsMaterial = new THREE.MeshBasicMaterial({
      color: 0x220000,
    });

    // Monocoque X-Ray Wireframe Material for CAD mode
    const xrayChassisMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });

    const wheelNodes: THREE.Object3D[] = [];
    let steeringWheelNode: THREE.Object3D | null = null;
    let rearAeroWingNode: THREE.Object3D | null = null;
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
          const nodeName = (child.name || '').toLowerCase();

          // Collect spinning wheel groups
          if (
            nodeName === 'wheel_rr' ||
            nodeName === 'wheel_rl' ||
            nodeName === 'wheel_fl' ||
            nodeName === 'wheel_fr'
          ) {
            wheelNodes.push(child);
          }

          // Collect steering wheel
          if (nodeName === 'steering_wheel') {
            steeringWheelNode = child;
          }

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
            // 3. Headlights & Daytime Running Lights
            else if (meshName.includes('lights') && !meshName.includes('red')) {
              mesh.material = headlightsMaterial;
            } else if (meshName.includes('leds')) {
              mesh.material = headlightsMaterial;
            }
            // 4. Taillights & Brake Lamps
            else if (meshName.includes('lights_red')) {
              mesh.material = taillightsMaterial;
            }
            // 5. Steering Wheel Shift LEDs
            else if (meshName.includes('steering_red_lights')) {
              mesh.material = steeringLedsMaterial;
            }
            // 6. Forged Alloy Rims
            else if (
              meshName.includes('rim') ||
              meshName === 'wheel' ||
              matName.includes('metal_chrome') ||
              (matName.includes('metal_gray') && (meshName.includes('rim') || meshName.includes('wheel')))
            ) {
              mesh.material = alloyRimMaterial;
            }
            // 7. Brake Discs
            else if (meshName.includes('brake')) {
              mesh.material = brakeDiscMaterial;
            }
            // 8. Brake Calipers & Badges
            else if (
              meshName.includes('centre') ||
              matName.includes('ferrari_yellow') ||
              meshName.includes('caliper')
            ) {
              mesh.material = brakeCaliperMaterial;
            }
            // 9. Tires
            else if (meshName.includes('tire') || matName.includes('tires')) {
              mesh.material = tireRubberMaterial;
            }
            // 10. Carbon Fiber Aerodynamic Elements
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

        // Centering and Grounding vehicle
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());
        car.position.x = -center.x;
        car.position.z = -center.z;
        car.position.y = -box.min.y;

        carRoot.add(car);
        (window as any).__CAR__ = car;
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

    // ==========================================
    // 5. CHOREOGRAPHED SCROLL KEYFRAME TRAJECTORY
    // ==========================================
    const targetCarPos = new THREE.Vector3();
    const targetCarRot = new THREE.Euler();
    const targetCamPos = new THREE.Vector3();
    const targetCamTarget = new THREE.Vector3();
    const currentCamTarget = new THREE.Vector3(0.5, 0.2, 0);

    let targetFov = 35;
    let currentVelocity = 0;

    const calculateKeyframe = (p: number) => {
      // p: 0.0 (hero top) to 1.0 (configurator bottom)
      // Car ground elevation locked to groundLevel = -0.55
      if (p <= 0.16) {
        // ----------------------------------------------------
        // ACT 01: THE AWAKENING // ZENITH STANCE (0.00 - 0.16)
        // ----------------------------------------------------
        const t = p / 0.16;
        currentVelocity = t * 60;
        targetFov = 35;

        // Front 3/4 hero stance facing the camera
        targetCarPos.set(1.15, groundLevel, 0.15);
        targetCarRot.set(0, 2.35 + t * 0.12, 0);

        targetCamPos.set(
          THREE.MathUtils.lerp(3.6, 3.3, t),
          THREE.MathUtils.lerp(1.25, 1.15, t),
          THREE.MathUtils.lerp(4.4, 4.1, t)
        );
        targetCamTarget.set(0.4, 0.2, 0);

        headlightsMaterial.emissiveIntensity = THREE.MathUtils.lerp(0.8, 2.5, t);
        leftHeadlight.intensity = THREE.MathUtils.lerp(1.0, 5.5, t);
        rightHeadlight.intensity = THREE.MathUtils.lerp(1.0, 5.5, t);
        taillightsMaterial.emissiveIntensity = 0.5;
        taillightGlow.intensity = 0;
        exhaustFlame.intensity = 0;

        cfdMat.opacity = 0;
        speedlineMat.opacity = 0;
        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = 0));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = 0));
        (cadGridHelper.material as THREE.Material).opacity = 0;
        calloutPins.forEach((pin) => ((pin.marker.material as THREE.MeshBasicMaterial).opacity = 0));
        hudPlaneMat.opacity = 0;
        bodyMaterial.opacity = 1.0;
        glassMaterial.transmission = 0.94;
      } else if (p <= 0.36) {
        // ----------------------------------------------------
        // ACT 02: CFD WIND TUNNEL & MOMENT A MACRO (0.16 - 0.36)
        // ----------------------------------------------------
        const t = (p - 0.16) / 0.2;
        currentVelocity = THREE.MathUtils.lerp(60, 180, t);

        if (t <= 0.5) {
          // MOMENT A: Macro optical close-up on front aerodynamic splitter & headlight lens
          const subT = t / 0.5;
          targetFov = THREE.MathUtils.lerp(35, 26, subT);

          targetCarPos.set(
            THREE.MathUtils.lerp(1.15, 0.2, subT),
            groundLevel,
            THREE.MathUtils.lerp(0.15, 0.25, subT)
          );
          targetCarRot.set(0, THREE.MathUtils.lerp(2.47, 2.7, subT), 0);

          targetCamPos.set(
            THREE.MathUtils.lerp(3.3, 1.05, subT),
            THREE.MathUtils.lerp(1.15, 0.38, subT),
            THREE.MathUtils.lerp(4.1, 1.9, subT)
          );
          targetCamTarget.set(
            THREE.MathUtils.lerp(0.4, -0.15, subT),
            THREE.MathUtils.lerp(0.2, 0.22, subT),
            THREE.MathUtils.lerp(0, 0.55, subT)
          );
        } else {
          // Glide along sculpted door waistline to side aerodynamic profile
          const subT = (t - 0.5) / 0.5;
          targetFov = THREE.MathUtils.lerp(26, 32, subT);

          targetCarPos.set(
            THREE.MathUtils.lerp(0.2, -0.85, subT),
            groundLevel,
            THREE.MathUtils.lerp(0.25, 0.2, subT)
          );
          targetCarRot.set(0, THREE.MathUtils.lerp(2.7, 3.5, subT), 0);

          targetCamPos.set(
            THREE.MathUtils.lerp(1.05, 2.6, subT),
            THREE.MathUtils.lerp(0.38, 0.85, subT),
            THREE.MathUtils.lerp(1.9, 3.2, subT)
          );
          targetCamTarget.set(
            THREE.MathUtils.lerp(-0.15, -0.5, subT),
            0.22,
            THREE.MathUtils.lerp(0.55, 0, subT)
          );
        }

        cfdMat.opacity = Math.sin(t * Math.PI) * 0.9;
        speedlineMat.opacity = t * 0.2;
        headlightsMaterial.emissiveIntensity = 2.6;
        leftHeadlight.intensity = 5.5;
        rightHeadlight.intensity = 5.5;
        taillightsMaterial.emissiveIntensity = 0.6;

        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = 0));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = 0));
        (cadGridHelper.material as THREE.Material).opacity = 0;
        calloutPins.forEach((pin) => ((pin.marker.material as THREE.MeshBasicMaterial).opacity = 0));
        hudPlaneMat.opacity = 0;
        bodyMaterial.opacity = 1.0;
        glassMaterial.transmission = 0.94;
      } else if (p <= 0.58) {
        // ----------------------------------------------------
        // ACT 03: HYPERSONIC SPEED SEQUENCE & NIGHT CIRCUIT (0.36 - 0.58)
        // ----------------------------------------------------
        const t = (p - 0.36) / 0.22;
        currentVelocity = THREE.MathUtils.lerp(180, 415, t);

        // Perspective warp: widen FOV dynamically for speed sensation
        targetFov = THREE.MathUtils.lerp(35, 54, Math.sin(t * Math.PI));

        // Car aligned down the track
        targetCarPos.set(0.35, groundLevel, 0);
        targetCarRot.set(0, 0, 0);

        if (t <= 0.6) {
          // Low-slung chase camera right off wet tarmac behind rear diffuser
          const subT = t / 0.6;
          targetCamPos.set(
            THREE.MathUtils.lerp(2.6, 0.45, subT),
            THREE.MathUtils.lerp(0.85, 0.5, subT),
            THREE.MathUtils.lerp(3.2, 3.8, subT)
          );
          targetCamTarget.set(0.35, 0.35, -1.0);
        } else {
          // Sweep alongside rear haunches
          const subT = (t - 0.6) / 0.4;
          targetCamPos.set(
            THREE.MathUtils.lerp(0.45, 2.3, subT),
            THREE.MathUtils.lerp(0.5, 0.8, subT),
            THREE.MathUtils.lerp(3.8, 2.6, subT)
          );
          targetCamTarget.set(
            THREE.MathUtils.lerp(0.35, 0.2, subT),
            0.28,
            THREE.MathUtils.lerp(-1.0, 0, subT)
          );
        }

        speedlineMat.opacity = Math.min(1.0, t * 1.5);
        cfdMat.opacity = (1 - t) * 0.3;

        const archAlpha = Math.min(0.7, Math.sin(t * Math.PI) * 0.8);
        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = archAlpha));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = archAlpha * 0.85));

        taillightsMaterial.emissiveIntensity = 3.0;
        taillightGlow.intensity = 4.5;
        exhaustFlame.intensity = Math.sin(t * Math.PI * 5) * 2.5 + 3.0;

        (cadGridHelper.material as THREE.Material).opacity = 0;
        calloutPins.forEach((pin) => ((pin.marker.material as THREE.MeshBasicMaterial).opacity = 0));
        hudPlaneMat.opacity = 0;
        bodyMaterial.opacity = 1.0;
        glassMaterial.transmission = 0.94;
      } else if (p <= 0.74) {
        // ----------------------------------------------------
        // ACT 04: X-RAY CAD CHASSIS // ENGINEERING (0.58 - 0.74)
        // ----------------------------------------------------
        const t = (p - 0.58) / 0.16;
        currentVelocity = THREE.MathUtils.lerp(415, 60, t);
        targetFov = 35;

        // Elevated technical 3/4 architectural CAD isometric view
        targetCarPos.set(0, groundLevel + 0.04, 0);
        targetCarRot.set(0.08, THREE.MathUtils.lerp(0, 2.5, t), 0);

        targetCamPos.set(
          THREE.MathUtils.lerp(2.2, 2.8, t),
          THREE.MathUtils.lerp(0.75, 2.8, t),
          THREE.MathUtils.lerp(2.4, 3.4, t)
        );
        targetCamTarget.set(0, 0.15, 0);

        const cadAlpha = Math.sin(t * Math.PI);
        (cadGridHelper.material as THREE.Material).opacity = cadAlpha * 0.9;
        calloutPins.forEach((pin) => {
          (pin.marker.material as THREE.MeshBasicMaterial).opacity = cadAlpha * 0.95;
        });

        // X-Ray Body Transparency Reveal
        bodyMaterial.opacity = THREE.MathUtils.lerp(1.0, 0.42, Math.sin(t * Math.PI));

        speedlineMat.opacity = (1 - t) * 0.4;
        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = 0));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = 0));
        exhaustFlame.intensity = 0;
        taillightGlow.intensity = 0.5;
        hudPlaneMat.opacity = 0;
        glassMaterial.transmission = 0.94;
      } else if (p <= 0.88) {
        // ----------------------------------------------------
        // ACT 05: COCKPIT TRANSCENDENCE // PILOT FLIGHT DECK (0.74 - 0.88)
        // ----------------------------------------------------
        const t = (p - 0.74) / 0.14;
        currentVelocity = THREE.MathUtils.lerp(60, 0, t);
        targetFov = 42;

        // Car aligned straight forward
        targetCarPos.set(0, groundLevel, 0);
        targetCarRot.set(0, 0, 0);

        // Fly directly through windshield into driver perspective
        targetCamPos.set(
          -0.35,
          THREE.MathUtils.lerp(1.8, 0.88, t),
          THREE.MathUtils.lerp(2.2, 0.12, t)
        );
        targetCamTarget.set(
          -0.35,
          THREE.MathUtils.lerp(0.4, 0.78, t),
          THREE.MathUtils.lerp(-0.5, -0.65, t)
        );

        glassMaterial.transmission = 0.98;
        bodyMaterial.opacity = 1.0;
        hudPlaneMat.opacity = Math.sin(t * Math.PI) * 0.95;

        (cadGridHelper.material as THREE.Material).opacity = 0;
        calloutPins.forEach((pin) => ((pin.marker.material as THREE.MeshBasicMaterial).opacity = 0));
        speedlineMat.opacity = 0;
        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = 0));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = 0));
        exhaustFlame.intensity = 0;
      } else {
        // ----------------------------------------------------
        // ACT 06: ATELIER FINALE // BESPOKE RUNWAY (0.88 - 1.00)
        // ----------------------------------------------------
        const t = Math.min(1, (p - 0.88) / 0.12);
        currentVelocity = 0;
        targetFov = 35;

        // Elevated 3/4 beauty angle framing above configurator controls
        targetCarPos.set(
          THREE.MathUtils.lerp(0, 0.1, t),
          THREE.MathUtils.lerp(groundLevel, groundLevel + 0.2, t),
          THREE.MathUtils.lerp(0, -0.4, t)
        );
        targetCarRot.set(0, THREE.MathUtils.lerp(0, 2.35, t), 0);

        targetCamPos.set(
          THREE.MathUtils.lerp(-0.35, 3.2, t),
          THREE.MathUtils.lerp(0.88, 1.45, t),
          THREE.MathUtils.lerp(0.12, 4.4, t)
        );
        targetCamTarget.set(
          THREE.MathUtils.lerp(-0.35, 0.1, t),
          THREE.MathUtils.lerp(0.78, 0.35, t),
          THREE.MathUtils.lerp(-0.65, -0.4, t)
        );

        hudPlaneMat.opacity = (1 - t) * 0.4;
        bodyMaterial.opacity = 1.0;
        glassMaterial.transmission = 0.94;
        headlightsMaterial.emissiveIntensity = 2.0;
        leftHeadlight.intensity = 4.5;
        rightHeadlight.intensity = 4.5;
        taillightsMaterial.emissiveIntensity = 1.2;
        speedlineMat.opacity = 0;
        gantries.forEach((g) => ((g.material as THREE.LineBasicMaterial).opacity = 0));
        curbs.forEach((c) => ((c.material as THREE.MeshBasicMaterial).opacity = 0));
      }
    };

    // ==========================================
    // 6. MAIN ANIMATION LOOP
    // ==========================================
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      calculateKeyframe(scrollRef.current);

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos, 0.08);
      currentCamTarget.lerp(targetCamTarget, 0.08);
      camera.lookAt(currentCamTarget);

      // Smooth FOV interpolation
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08);
        camera.updateProjectionMatrix();
      }

      // Smooth car position & rotation
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

      // ------------------------------------------
      // Wheel Rolling Simulation (Proportional to simulated velocity)
      // ------------------------------------------
      if (wheelNodes.length > 0 && currentVelocity > 1) {
        const wheelRollSpeed = (currentVelocity / 100) * 0.45;
        wheelNodes.forEach((wheel) => {
          // In local coordinate space, rolling around Z axis
          wheel.rotation.z += wheelRollSpeed;
        });
      }

      // Synchronize Web Audio engine pitch with velocity
      hypercarAudio.updateEnginePitch(currentVelocity / 415);

      // ------------------------------------------
      // CFD Particle Flow Simulation (Act 02)
      // ------------------------------------------
      if (cfdMat.opacity > 0.01) {
        const cfdArr = cfdGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < cfdCount; i++) {
          const orig = cfdOriginals[i];
          cfdArr[i * 3 + 2] += orig.speed * 1.8; // Move from front to back (+Z)

          // Curving over hood aerodynamic profile
          const zRel = cfdArr[i * 3 + 2];
          if (zRel > -2.2 && zRel < 1.8) {
            cfdArr[i * 3 + 1] = Math.max(orig.y, 0.4 + Math.sin((zRel + 2.2) * 0.8) * 0.4);
          }

          if (cfdArr[i * 3 + 2] > 3.8) {
            cfdArr[i * 3 + 2] = -4.5 - Math.random() * 2;
            cfdArr[i * 3 + 1] = orig.y;
          }
        }
        cfdGeo.attributes.position.needsUpdate = true;
      }

      // ------------------------------------------
      // Hypersonic Speedlines Streaming (Act 03)
      // ------------------------------------------
      if (speedlineMat.opacity > 0.01) {
        const posArr = speedlineGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < speedlineCount; i++) {
          posArr[i * 3 + 2] += speedlineSpeeds[i] * 3.5;
          if (posArr[i * 3 + 2] > 12) {
            posArr[i * 3 + 2] = -12;
          }
        }
        speedlineGeo.attributes.position.needsUpdate = true;
      }

      // ------------------------------------------
      // High-Speed Nocturnal Gantries & Curbs Motion (Act 03)
      // ------------------------------------------
      if (currentVelocity > 120) {
        const tunnelSpeed = (currentVelocity / 100) * 0.6;
        gantries.forEach((g) => {
          g.position.z += tunnelSpeed;
          if (g.position.z > 22) {
            g.position.z -= 54;
          }
        });
        curbs.forEach((c) => {
          c.position.z += tunnelSpeed;
          if (c.position.z > 20) {
            c.position.z -= 45;
          }
        });
      }

      // ------------------------------------------
      // F1 Steering Wheel Rev Lights Animation (Act 05)
      // ------------------------------------------
      if (hudPlaneMat.opacity > 0.05) {
        // Pulse shift LEDs
        const shiftStage = (Math.sin(time * 12) + 1) / 2;
        if (shiftStage > 0.8) {
          steeringLedsMaterial.color.setHex(0x00f0ff); // Shift flash
        } else if (shiftStage > 0.5) {
          steeringLedsMaterial.color.setHex(0xe61a24); // Redline
        } else {
          steeringLedsMaterial.color.setHex(0xffaa00); // Amber
        }

        // Render Cockpit HUD Canvas
        if (hudCtx) {
          hudCtx.clearRect(0, 0, 512, 256);
          hudCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
          hudCtx.lineWidth = 2;
          hudCtx.strokeRect(10, 10, 492, 236);

          // Gear & Speed HUD Readout
          hudCtx.fillStyle = '#FFFFFF';
          hudCtx.font = 'bold 52px "Syncopate", monospace';
          hudCtx.fillText('GEAR 7', 30, 80);

          hudCtx.fillStyle = '#E61A24';
          hudCtx.font = 'bold 36px "Space Mono", monospace';
          hudCtx.fillText(`${Math.round(340 + Math.sin(time * 5) * 15)} KM/H`, 30, 135);

          hudCtx.fillStyle = '#00F0FF';
          hudCtx.font = '16px "Space Mono", monospace';
          hudCtx.fillText('10,850 RPM // HYBRID BOOST ACTIVE', 30, 175);
          hudCtx.fillText('TELEMETRY APEX: 2.4G LATERAL', 30, 210);

          // Apex Target Reticle
          hudCtx.beginPath();
          hudCtx.arc(420, 120, 45, 0, Math.PI * 2);
          hudCtx.strokeStyle = '#00F0FF';
          hudCtx.lineWidth = 1.5;
          hudCtx.stroke();

          const dotX = 420 + Math.sin(time * 3) * 18;
          const dotY = 120 + Math.cos(time * 2.5) * 14;
          hudCtx.beginPath();
          hudCtx.arc(dotX, dotY, 5, 0, Math.PI * 2);
          hudCtx.fillStyle = '#E61A24';
          hudCtx.fill();

          hudTexture.needsUpdate = true;
        }
      }

      // Rotate Floor Rings slowly
      ring.rotation.z = time * 0.03;
      innerRing.rotation.z = -time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 7. RESIZE HANDLING
    // ==========================================
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
      {/* Precision Loading Overlay */}
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
