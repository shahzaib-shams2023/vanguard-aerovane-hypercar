export interface LiveryFinish {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  swatchHex: string;
  targetRgb: [number, number, number] | null; // null keeps factory baked texture untouched
  metalness: number;
  roughness: number;
  clearcoat: number;
}

export interface CaliperFinish {
  id: string;
  name: string;
  hex: string;
}

export interface CameraShot {
  id: string;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  desktopOffsetX: number; // fraction of viewport width (- shifts car right, + shifts car left)
  mobileOffsetY: number;  // fraction of viewport height (+ shifts car up)
}

export interface AeroZoneSpec {
  id: string;
  index: string;
  title: string;
  cameraId: string;
  metricLabel: string;
  metricValue: string;
  summary: string;
  telemetry: { label: string; value: string }[];
}

export const LIVERY_FINISHES: LiveryFinish[] = [
  {
    id: 'rosso-corsa',
    code: 'FER-322',
    name: 'Rosso Scuderia Corsa',
    subtitle: 'Factory 2018 FIA GT3 Homologation Lacquer',
    swatchHex: '#C81D11',
    targetRgb: null,
    metalness: 0.24,
    roughness: 0.22,
    clearcoat: 1.0,
  },
  {
    id: 'giallo-modena',
    code: 'FER-4305',
    name: 'Giallo Modena',
    subtitle: 'Triple-Layer Racing Yellow',
    swatchHex: '#E5A918',
    targetRgb: [229, 169, 24],
    metalness: 0.28,
    roughness: 0.2,
    clearcoat: 1.0,
  },
  {
    id: 'nero-stellato',
    code: 'FER-1250',
    name: 'Nero Stellato',
    subtitle: 'Deep Metallic Endurance Obsidian',
    swatchHex: '#18191D',
    targetRgb: [28, 30, 35],
    metalness: 0.45,
    roughness: 0.24,
    clearcoat: 1.0,
  },
  {
    id: 'grigio-titanio',
    code: 'FER-3238',
    name: 'Grigio Titanio Metallizzato',
    subtitle: 'Wind-Tunnel Bare Alloy Silver',
    swatchHex: '#8E949E',
    targetRgb: [152, 158, 168],
    metalness: 0.52,
    roughness: 0.22,
    clearcoat: 1.0,
  },
  {
    id: 'bianco-fuji',
    code: 'FER-2960',
    name: 'Bianco Fuji',
    subtitle: 'Pearlescent Atelier Chalk White',
    swatchHex: '#EAE7DF',
    targetRgb: [230, 227, 219],
    metalness: 0.16,
    roughness: 0.18,
    clearcoat: 1.0,
  },
];

export const CALIPER_FINISHES: CaliperFinish[] = [
  { id: 'rosso', name: 'Rosso Scuderia', hex: '#C81D11' },
  { id: 'giallo', name: 'Giallo Modena', hex: '#E5A918' },
  { id: 'titanium', name: 'Anodized Titanium', hex: '#767B84' },
];

export const CAMERA_SHOTS: Record<string, CameraShot> = {
  hero: {
    id: 'hero',
    label: '3/4 Paddock Front',
    position: [-3.95, 1.24, -4.95],
    target: [0.0, 0.48, -0.1],
    fov: 32,
    desktopOffsetX: -0.22,
    mobileOffsetY: 0.2,
  },
  monograph: {
    id: 'monograph',
    label: 'Splitter & Nose',
    position: [-2.65, 0.96, -3.75],
    target: [-0.05, 0.45, -0.65],
    fov: 30,
    desktopOffsetX: -0.22,
    mobileOffsetY: 0.22,
  },
  'aero-splitter': {
    id: 'aero-splitter',
    label: 'Front Dive Planes',
    position: [-2.05, 0.6, -3.35],
    target: [-0.2, 0.34, -1.75],
    fov: 28,
    desktopOffsetX: 0.21,
    mobileOffsetY: 0.22,
  },
  'aero-louvers': {
    id: 'aero-louvers',
    label: 'Fender Louvers & Flank',
    position: [-3.85, 1.08, -1.15],
    target: [-0.2, 0.52, -0.25],
    fov: 28,
    desktopOffsetX: 0.21,
    mobileOffsetY: 0.22,
  },
  'aero-wing': {
    id: 'aero-wing',
    label: 'Swan-Neck GT3 Wing',
    position: [-2.75, 1.35, 3.55],
    target: [0.0, 0.78, 1.55],
    fov: 30,
    desktopOffsetX: 0.21,
    mobileOffsetY: 0.22,
  },
  'aero-diffuser': {
    id: 'aero-diffuser',
    label: 'Venturi Rear Diffuser',
    position: [2.15, 0.62, 3.65],
    target: [0.0, 0.35, 1.85],
    fov: 30,
    desktopOffsetX: 0.21,
    mobileOffsetY: 0.22,
  },
  'chassis-wheel': {
    id: 'chassis-wheel',
    label: 'Front Wheel & Caliper',
    position: [-2.65, 0.54, -1.58],
    target: [-0.85, 0.35, -1.22],
    fov: 26,
    desktopOffsetX: -0.21,
    mobileOffsetY: 0.22,
  },
  cockpit: {
    id: 'cockpit',
    label: 'Driver Sightline',
    position: [-1.52, 1.06, -0.28],
    target: [-0.12, 0.76, -0.22],
    fov: 33,
    desktopOffsetX: 0.0,
    mobileOffsetY: 0.16,
  },
  atelier: {
    id: 'atelier',
    label: '360 Studio Orbit',
    position: [-3.95, 1.28, -4.45],
    target: [0.0, 0.48, 0.0],
    fov: 33,
    desktopOffsetX: 0.0,
    mobileOffsetY: 0.18,
  },
};

export const AERO_ZONES: AeroZoneSpec[] = [
  {
    id: 'splitter',
    index: '01',
    title: 'Front Splitter & Dive Planes',
    cameraId: 'aero-splitter',
    metricLabel: 'FRONT AXLE LOAD',
    metricValue: '41% BIAS',
    summary:
      'Extended carbon-kevlar front splitter paired with twin flicks stabilizes nose pitch under heavy trail-braking into slow chicanes.',
    telemetry: [
      { label: 'GROUND CLEARANCE', value: '58 MM' },
      { label: 'VORTEX CHANNELS', value: 'DUAL DIFFUSER' },
      { label: 'MATERIAL', value: 'AUTOCLAVE CARBON' },
    ],
  },
  {
    id: 'louvers',
    index: '02',
    title: 'Fender Louvers & S-Duct Extraction',
    cameraId: 'aero-louvers',
    metricLabel: 'ARCH PRESSURE RELIEF',
    metricValue: '-28% LIFT',
    summary:
      'Slatted front fender louvers evacuate high-pressure wheel-arch turbulence while scalloped side intakes feed twin intercoolers.',
    telemetry: [
      { label: 'FRONT TRACK', value: '1,695 MM' },
      { label: 'RADIATOR FLOW', value: 'REVERSE-TILT' },
      { label: 'DRAG PENALTY', value: 'MINIMIZED' },
    ],
  },
  {
    id: 'wing',
    index: '03',
    title: 'Swan-Neck Rear Aerofoil',
    cameraId: 'aero-wing',
    metricLabel: 'PEAK DOWNFORCE',
    metricValue: '980 KG',
    summary:
      'Top-mounted swan-neck uprights preserve uninterrupted underside laminar airflow across the full-width carbon single-element wing.',
    telemetry: [
      { label: 'SPAN WIDTH', value: '1,990 MM' },
      { label: 'ANGLE RANGE', value: '0° – 12° TRACK' },
      { label: 'MOUNTING', value: 'SWAN-NECK' },
    ],
  },
  {
    id: 'diffuser',
    index: '04',
    title: 'Underfloor Venturi & Diffuser',
    cameraId: 'aero-diffuser',
    metricLabel: 'AERO EFFICIENCY',
    metricValue: '3.12 L/D',
    summary:
      'Flat carbon undertray accelerates sub-chassis airflow into four vertical rear strakes, sealing the rear axle at 270+ km/h.',
    telemetry: [
      { label: 'STRAKE COUNT', value: '4 VERTICAL FINS' },
      { label: 'EXHAUST ROUTING', value: 'TWIN INCONEL' },
      { label: 'BALANCE SHIFT', value: 'NEUTRAL HIGH-SPEED' },
    ],
  },
];

export const HOMOLOGATION_SPECS = [
  { code: 'ENGINE', label: 'Powertrain', value: 'F154CB 3,902 cc 90° Twin-Turbo V8' },
  { code: 'OUTPUT', label: 'FIA BoP Power', value: '600 PS @ 7,000 RPM / 700 Nm' },
  { code: 'GEARBOX', label: 'Transmission', value: '6-Speed Sequential Transverse Paddle' },
  { code: 'MASS', label: 'Dry Weight', value: '1,260 kg (FIA GT3 Homologated)' },
  { code: 'CHASSIS', label: 'Architecture', value: '2018 Aluminum Spaceframe + FIA Roll Cage' },
  { code: 'DIMENSIONS', label: 'L × W × WB', value: '4,633 × 2,045 × 2,650 mm' },
];

export const CIRCUIT_PALMARES = [
  { event: '24H OF SPA', stat: 'PRO-AM & OVERALL PODIUMS', year: '2018–2020' },
  { event: 'BATHURST 12H', stat: 'GT3 ENDURANCE CONTENDER', year: 'CLASS A' },
  { event: 'DAYTONA 24H', stat: 'GTD CLASS CONTENDER', year: 'IMSA SPEC' },
  { event: 'NURBURGRING 24H', stat: 'SP9 HOMOLOGATION', year: 'NORDSCHLEIFE' },
];

