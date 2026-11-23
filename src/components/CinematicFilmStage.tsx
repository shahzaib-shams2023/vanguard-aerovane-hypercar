import React, { useState } from 'react';
import {
  Wind,
  Flame,
  Zap,
  Play,
  Eye,
  Layers,
  Crosshair,
  Palette,
  Check,
  ArrowRight,
} from 'lucide-react';
import { hypercarAudio } from '../utils/sound';
import { PAINT_OPTIONS, CarPaintOption } from './PersistentCarCanvas';

interface CinematicFilmStageProps {
  scrollProgress: number;
  activePaint: CarPaintOption;
  onSelectPaint: (paint: CarPaintOption) => void;
  aeroMode: 'downforce' | 'vmax';
  onToggleAeroMode: (mode: 'downforce' | 'vmax') => void;
  caliperColor: string;
  onSelectCaliper: (color: string) => void;
  onOpenReserve: () => void;
  onNavigateTo: (progress: number) => void;
}

export const CinematicFilmStage: React.FC<CinematicFilmStageProps> = ({
  scrollProgress,
  activePaint,
  onSelectPaint,
  aeroMode,
  onToggleAeroMode,
  caliperColor,
  onSelectCaliper,
  onOpenReserve,
  onNavigateTo,
}) => {
  // Helper to calculate chapter opacity and translation
  const getChapterStyle = (start: number, end: number) => {
    const fadeInStart = start - 0.04;
    const fadeOutEnd = end + 0.04;

    let opacity = 0;
    let translateY = 20;

    if (scrollProgress >= start && scrollProgress <= end) {
      opacity = 1;
      translateY = 0;
    } else if (scrollProgress > fadeInStart && scrollProgress < start) {
      const t = (scrollProgress - fadeInStart) / 0.04;
      opacity = t;
      translateY = (1 - t) * 20;
    } else if (scrollProgress > end && scrollProgress < fadeOutEnd) {
      const t = (scrollProgress - end) / 0.04;
      opacity = 1 - t;
      translateY = -t * 20;
    }

    const isVisible = opacity > 0.01;

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
      visibility: isVisible ? ('visible' as const) : ('hidden' as const),
      transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
    };
  };

  // Chapter 2 State: Aero Zones
  const [activeAeroZone, setActiveAeroZone] = useState<number>(0);
  const aeroZones = [
    {
      title: 'FRONT DUAL VENTURI TUNNELS',
      metric: '420 KG DOWNFORCE',
      desc: 'Subterranean carbon tunnels route high-velocity turbulent air around the front wheels into laminar underfloor channels, eliminating front axle lift.',
    },
    {
      title: 'ACTIVE HYDRAULIC REAR AIRBRAKE',
      metric: '0° – 48° DEPLOY',
      desc: 'Dual carbon aerofoils deploy in 120 milliseconds under braking, shifting aerodynamic pressure rearward to stabilize deceleration at 2.4 G.',
    },
    {
      title: 'VORTEX FLUID GENERATORS',
      metric: '0.31 Cd DRAG INDEX',
      desc: 'NACA duct intakes sculpt airflow over the canopy, energizing the boundary layer and feeding the mid-mounted 6.5L V12 induction plenum.',
    },
  ];

  // Chapter 3 State: Tachometer & Boost
  const [rpmLevel, setRpmLevel] = useState<number>(10200);
  const handleBoostSurge = () => {
    hypercarAudio.playAeroSurge();
    setRpmLevel(11000);
    setTimeout(() => setRpmLevel(9800), 800);
  };

  // Chapter 4 State: CAD Subsystems
  const [cadIndex, setCadIndex] = useState<number>(0);
  const cadSubsystems = [
    {
      label: 'T800 CARBON MONOCOQUE',
      highlight: '65,000 NM/DEG RIGIDITY',
      detail: 'Aerospace T800 dry carbon tub cured in high-pressure autoclaves. Weighs merely 88 kg with F1-spec intrusion cell safety.',
      specs: [
        { key: 'TUB DRY WEIGHT', val: '88 KG' },
        { key: 'TORSIONAL RIGIDITY', val: '65,000 NM / DEG' },
        { key: 'SAFETY CELL', val: 'FIA HOMOLOGATED' },
      ],
    },
    {
      label: 'INBOARD PUSHROD SUSPENSION',
      highlight: 'MULTIMATIC DSSV 4-WAY',
      detail: 'Horizontal pushrod dampers mounted inboard to reduce unsprung mass. Active heave springs counteract aerodynamic downforce at 400 km/h.',
      specs: [
        { key: 'DAMPER TYPE', val: 'SPOOL VALVE DSSV' },
        { key: 'UNSPRUNG MASS', val: '-18.5 KG REDUCTION' },
        { key: 'RIDE HEIGHT', val: 'ACTIVE AERODYNAMIC HYDRAULIC' },
      ],
    },
    {
      label: '6.5L ATMOSPHERIC V12',
      highlight: '11,000 RPM REDLINE',
      detail: 'Hand-assembled naturally aspirated V12 with titanium con-rods and individual throttle bodies. Rigidly bolted as a stressed chassis member.',
      specs: [
        { key: 'DISPLACEMENT', val: '6,498 CC' },
        { key: 'COMPRESSION', val: '13.8:1' },
        { key: 'VALVETRAIN', val: 'DLC FINGER FOLLOWERS' },
      ],
    },
    {
      label: '410MM C-SiC CERAMIC BRAKES',
      highlight: '2.4 G DECELERATION',
      detail: 'Continuous-carbon-fiber silicon-carbide composite rotors withstand 1,000°C without brake fade. Monobloc 6-piston billet calipers.',
      specs: [
        { key: 'FRONT ROTORS', val: '410 MM CARBON-CERAMIC' },
        { key: 'REAR ROTORS', val: '390 MM CARBON-CERAMIC' },
        { key: 'BRAKE DISTANCE', val: '100–0 KM/H IN 28.5 METERS' },
      ],
    },
  ];

  // Chapter 5 State: Manettino
  const [manettino, setManettino] = useState<string>('TRACK');
  const [kersMode, setKersMode] = useState<string>('OVERTAKE');

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      {/* ======================================================== */}
      {/* CHAPTER 01: ZENITH AWAKENING (0.00 to 0.16)               */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.0, 0.16)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        {/* Top Eyebrow */}
        <div className="max-w-[1440px] mx-auto w-full pt-4">
          <div className="inline-flex items-center space-x-3 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-2 rounded-full pointer-events-auto backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-vanguard-red animate-ping" />
            <span>FIA HOMOLOGATED TRACK WEAPON // 35 CHASSIS ALLOCATION</span>
          </div>
        </div>

        {/* Center Monumental Typography */}
        <div className="max-w-[1440px] mx-auto w-full my-auto py-6">
          <div className="max-w-2xl space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-cyan uppercase block">
                CHAPTER 01 // ZENITH AWAKENING
              </span>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.88] drop-shadow-2xl">
                AEROVANE <br />
                <span className="text-vanguard-red">V12</span>
              </h1>
            </div>

            <p className="font-sans text-xs sm:text-sm text-vanguard-muted font-light max-w-lg leading-relaxed pt-1">
              A 1,420 BHP hybrid track weapon. Naturally aspirated 6.5L V12 screaming to 11,000 RPM, paired with tri-axial axial-flux electric motors and active ground-effect Venturi tunnels.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3 pointer-events-auto">
              <button
                onClick={() => {
                  hypercarAudio.playIgnition();
                  onNavigateTo(0.24);
                }}
                data-cursor="IGNITION"
                className="px-8 py-3.5 rounded-full bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs tracking-telemetry uppercase transition-all duration-300 shadow-glow-red flex items-center space-x-3 hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>IGNITE V12 ENGINE</span>
              </button>

              <button
                onClick={() => {
                  hypercarAudio.playClick();
                  onOpenReserve();
                }}
                data-cursor="RESERVE"
                className="px-7 py-3.5 rounded-full carbon-panel hover:bg-vanguard-panel border border-vanguard-border text-vanguard-silver font-mono text-xs tracking-telemetry uppercase transition-all duration-300 hover:border-vanguard-red hover:text-white"
              >
                RESERVE CHASSIS
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/80 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
            <div>
              <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                01 // TOTAL OUTPUT
              </span>
              <div className="font-display text-2xl sm:text-3xl text-white font-bold">1,420 BHP</div>
              <span className="text-[10px] text-vanguard-red uppercase block">V12 + TRI-MOTORS</span>
            </div>
            <div>
              <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                02 // ACCELERATION
              </span>
              <div className="font-display text-2xl sm:text-3xl text-white font-bold">2.1 SEC</div>
              <span className="text-[10px] text-vanguard-cyan uppercase block">0–100 KM/H LAUNCH</span>
            </div>
            <div>
              <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                03 // TERMINAL VELOCITY
              </span>
              <div className="font-display text-2xl sm:text-3xl text-white font-bold">415 KM/H</div>
              <span className="text-[10px] text-vanguard-amber uppercase block">LOW-DRAG V-MAX</span>
            </div>
            <div>
              <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                04 // DOWNFORCE
              </span>
              <div className="font-display text-2xl sm:text-3xl text-white font-bold">980 KG</div>
              <span className="text-[10px] text-vanguard-silver uppercase block">AT 280 KM/H</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 02: CFD WIND TUNNEL & MOMENT A (0.18 to 0.36)     */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.18, 0.36)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur">
            <Wind className="w-3.5 h-3.5 animate-pulse" />
            <span>CFD SUPERSONIC WIND TUNNEL // 380 STREAMLINE VELOCITY VECTORS</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 font-mono text-[10px] text-vanguard-muted">
            <span>DRAG INDEX: 0.31 Cd</span>
            <span className="text-vanguard-border">|</span>
            <span className="text-vanguard-cyan">TUNNEL SPEED: 320 KM/H</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column Dossier */}
          <div className="lg:col-span-5 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 shadow-carbon-panel backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-red uppercase block">
                CHAPTER 02 // FLUID DYNAMICS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
                Sculpted By <br />
                <span className="text-vanguard-cyan">Supersonic Air</span>
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
              Negative lift is harvested directly beneath the vehicle through subterranean Venturi channels, locking the chassis to the tarmac through pure atmospheric suction.
            </p>

            {/* Interactive Aero Zones Switcher */}
            <div className="space-y-2 pt-1">
              {aeroZones.map((zone, idx) => {
                const isSelected = idx === activeAeroZone;
                return (
                  <button
                    key={zone.title}
                    onClick={() => {
                      hypercarAudio.playClick();
                      setActiveAeroZone(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 font-mono text-xs flex flex-col space-y-0.5 ${
                      isSelected
                        ? 'border-vanguard-cyan bg-vanguard-cyan/15 text-white shadow-sm'
                        : 'border-vanguard-border/60 bg-vanguard-panel/40 text-vanguard-muted hover:border-vanguard-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-white">{zone.title}</span>
                      <span className="text-[10px] text-vanguard-cyan font-bold">{zone.metric}</span>
                    </div>
                    {isSelected && (
                      <p className="text-[10px] text-vanguard-silver/80 pt-1 leading-relaxed font-sans">
                        {zone.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Callout: Moment A Macro Probe */}
          <div className="lg:col-span-7 flex flex-col justify-end items-end hidden lg:flex">
            <div className="carbon-panel p-5 rounded-2xl border border-vanguard-border/80 max-w-xs space-y-2 text-right backdrop-blur">
              <div className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-vanguard-cyan uppercase">
                <Eye className="w-3 h-3" />
                <span>MOMENT A // 26MM MACRO SPLITTER PROBE</span>
              </div>
              <div className="text-[11px] font-mono text-vanguard-silver">
                Autoclaved carbon weave & dive planes inspected under optical macro zoom.
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex justify-between font-mono text-xs text-vanguard-muted">
          <span>VENTURI DOWNFORCE: <strong className="text-vanguard-cyan">980 KG @ 280 KM/H</strong></span>
          <span className="text-[10px] text-vanguard-silver uppercase">CFD COMPUTATIONAL MATRIX</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 03: HYPERSONIC RUNWAY & MOMENT C (0.38 to 0.58)  */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.38, 0.58)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>CHAPTER 03 // HYPERSONIC NOCTURNAL RUNWAY SEQUENCE</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[10px]">
            <span className="w-2 h-2 rounded-full bg-vanguard-red animate-ping" />
            <span className="text-white font-bold">V-MAX MODE ENGAGED</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Speedometer HUD */}
          <div className="lg:col-span-6 carbon-panel p-6 sm:p-8 rounded-3xl border border-vanguard-border space-y-5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-vanguard-border/70 pb-3">
              <div>
                <span className="text-[9px] font-mono tracking-hyperspeed text-vanguard-muted uppercase block">
                  TERMINAL VELOCITY
                </span>
                <div className="font-display text-4xl sm:text-6xl text-white font-bold tracking-tight">
                  415 <span className="text-vanguard-red text-2xl font-mono">KM/H</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono tracking-hyperspeed text-vanguard-muted uppercase block">
                  0–100 SPRINT
                </span>
                <div className="font-display text-2xl sm:text-3xl text-vanguard-cyan font-bold">
                  2.1 SEC
                </div>
              </div>
            </div>

            {/* Tachometer Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-vanguard-muted">V12 TACHOMETER:</span>
                <span className="text-vanguard-red font-bold">{rpmLevel} RPM</span>
              </div>
              <div className="w-full h-3 bg-vanguard-dark rounded-full overflow-hidden p-0.5 border border-vanguard-border flex gap-1">
                {Array.from({ length: 24 }).map((_, i) => {
                  const pct = i / 24;
                  const isLit = pct <= rpmLevel / 11000;
                  const isRedline = i >= 18;
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-sm transition-all duration-150 ${
                        isLit
                          ? isRedline
                            ? 'bg-vanguard-red shadow-glow-red animate-pulse'
                            : 'bg-vanguard-cyan'
                          : 'bg-vanguard-panel/60'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Interactive Boost Button */}
            <button
              onClick={handleBoostSurge}
              data-cursor="THROTTLE"
              className="w-full py-3 rounded-xl bg-vanguard-panel hover:bg-vanguard-red hover:text-white border border-vanguard-border hover:border-vanguard-red text-vanguard-silver font-mono text-xs tracking-telemetry uppercase transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-3.5 h-3.5 text-vanguard-amber" />
              <span>ENGAGE HYBRID BOOST (+420 BHP)</span>
            </button>
          </div>

          {/* Right Powertrain Dossier */}
          <div className="lg:col-span-6 carbon-panel p-6 sm:p-8 rounded-3xl border border-vanguard-border space-y-4 shadow-carbon-panel backdrop-blur-xl">
            <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-red uppercase block">
              MOMENT C // HIGH-SPEED PERSPECTIVE WARP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase leading-[0.92]">
              1,420 BHP <br />
              <span className="text-vanguard-red">Hybrid Fury</span>
            </h2>
            <p className="font-sans text-xs text-vanguard-muted leading-relaxed">
              Wheels spinning at 400+ km/h with titanium exhaust flame core ignited. Active rear airbrake and Venturi tunnels generate immense tarmac suction.
            </p>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex justify-between font-mono text-xs text-vanguard-muted">
          <span>0–200 KM/H: <strong className="text-white">5.8 SEC</strong></span>
          <span className="text-[10px] text-vanguard-silver uppercase">TERMINAL VELOCITY PROTOCOL</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 04: CAD DISSECTION & MOMENT D (0.60 to 0.74)      */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.6, 0.74)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-amber uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur">
            <Crosshair className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>CHAPTER 04 // TECTONIC CAD DISSECTION & X-RAY BLUEPRINT</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 font-mono text-[10px] text-vanguard-muted">
            <span>DIMENSIONS: 4,520 × 2,050 × 1,180 MM</span>
            <span className="text-vanguard-border">|</span>
            <span className="text-vanguard-amber">T800 PRE-PREG</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left CAD Subsystems Selector */}
          <div className="lg:col-span-5 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 shadow-carbon-panel backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-amber uppercase block">
                MOMENT D // STRUCTURAL X-RAY REVEAL
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
                Carbon <br />
                <span className="text-vanguard-amber">Monocoque</span>
              </h2>
            </div>

            {/* Interactive Component Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cadSubsystems.map((sub, idx) => {
                const isSelected = idx === cadIndex;
                return (
                  <button
                    key={sub.label}
                    onClick={() => {
                      hypercarAudio.playClick();
                      setCadIndex(idx);
                    }}
                    className={`p-3 rounded-xl border text-left font-mono text-[10px] transition-all ${
                      isSelected
                        ? 'border-vanguard-amber bg-vanguard-amber/15 text-white font-bold'
                        : 'border-vanguard-border/70 bg-vanguard-panel/50 text-vanguard-muted hover:border-white'
                    }`}
                  >
                    <div className="text-white truncate">{sub.label.split('//')[0]}</div>
                    <div className="text-vanguard-amber text-[9px]">{sub.highlight}</div>
                  </button>
                );
              })}
            </div>

            {/* Specs Detail */}
            <div className="p-4 rounded-2xl bg-vanguard-panel/80 border border-vanguard-border/80 space-y-2 font-mono text-xs">
              <div className="text-[11px] text-vanguard-silver font-sans leading-relaxed">
                {cadSubsystems[cadIndex].detail}
              </div>
              <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-vanguard-border/50">
                {cadSubsystems[cadIndex].specs.map((sp) => (
                  <div key={sp.key} className="flex justify-between items-center text-[10px]">
                    <span className="text-vanguard-muted">{sp.key}:</span>
                    <span className="text-vanguard-amber font-bold">{sp.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Blueprint Badge */}
          <div className="lg:col-span-7 flex flex-col justify-end items-end hidden lg:flex">
            <div className="carbon-panel p-5 rounded-2xl border border-vanguard-border/80 max-w-xs space-y-2 text-right backdrop-blur">
              <div className="text-[9px] font-mono text-vanguard-amber uppercase">
                TORSIONAL RIGIDITY
              </div>
              <div className="font-display text-2xl text-white font-bold">
                65,000 <span className="text-xs text-vanguard-muted font-mono">NM/DEG</span>
              </div>
              <div className="text-[10px] font-mono text-vanguard-muted">
                Zero torsional flex under 2.4G apex loading.
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex justify-between font-mono text-xs text-vanguard-muted">
          <span>DRY TUB MASS: <strong className="text-white">88 KG</strong></span>
          <span className="text-[10px] text-vanguard-silver uppercase">CAD RECONSTRUCTION MATRIX</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 05: COCKPIT FLIGHT-DECK & MOMENT B (0.76 to 0.88) */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.76, 0.88)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur">
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            <span>CHAPTER 05 // COCKPIT TRANSCENDENCE & PILOT FLIGHT-DECK</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 font-mono text-[10px] text-vanguard-muted">
            <span>SIGHTLINE: APEX HUD</span>
            <span className="text-vanguard-border">|</span>
            <span className="text-vanguard-cyan">ZERO DISTRACTION PROTOCOL</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
          {/* Left Moment B Callout */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="carbon-panel p-5 rounded-2xl border border-vanguard-cyan/40 max-w-sm space-y-2 backdrop-blur-xl">
              <div className="inline-flex items-center space-x-2 text-[9px] font-mono text-vanguard-cyan uppercase">
                <span className="w-2 h-2 rounded-full bg-vanguard-cyan animate-ping" />
                <span>MOMENT B // 42MM CANOPY DIVE</span>
              </div>
              <div className="font-display text-base text-white font-bold">
                Pilot Sensory Immersion
              </div>
              <p className="font-sans text-xs text-vanguard-muted leading-relaxed">
                Gliding smoothly through the windscreen into the driver eye-point. The F1 OLED steering wheel and holographic HUD align in the central sightline.
              </p>
            </div>
          </div>

          {/* Center Space Open for Steering Wheel & 3D HUD */}
          <div className="lg:col-span-2 hidden lg:block" />

          {/* Right Manettino Console */}
          <div className="lg:col-span-5 carbon-panel p-6 sm:p-8 rounded-3xl border border-vanguard-border space-y-4 shadow-carbon-panel backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-cyan uppercase block">
                ROTARY TELEMETRY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase leading-[0.92]">
                Flight-Deck <br />
                <span className="text-vanguard-cyan">Ergonomics</span>
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1.5">
                <span className="text-[9px] text-vanguard-muted uppercase block">CHASSIS DYNAMICS:</span>
                <div className="grid grid-cols-3 gap-2">
                  {['STREET', 'TRACK', 'QUALIFYING'].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        hypercarAudio.playClick();
                        setManettino(m);
                      }}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        manettino === m
                          ? 'border-vanguard-cyan bg-vanguard-cyan/20 text-white font-bold'
                          : 'border-vanguard-border text-vanguard-muted hover:border-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] text-vanguard-muted uppercase block">KERS BOOST:</span>
                <div className="grid grid-cols-3 gap-2">
                  {['ECO', 'BALANCED', 'OVERTAKE'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        hypercarAudio.playAeroSurge();
                        setKersMode(b);
                      }}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        kersMode === b
                          ? 'border-vanguard-red bg-vanguard-red/20 text-white font-bold'
                          : 'border-vanguard-border text-vanguard-muted hover:border-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex justify-between font-mono text-xs text-vanguard-muted">
          <span>COCKPIT CANOPY: <strong className="text-white">F1 INTEGRATED HUD</strong></span>
          <span className="text-[10px] text-vanguard-silver uppercase">PILOT TRANSCENDENCE PROTOCOL</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER 06: ATELIER COMMENCEMENT (0.90 to 1.00)           */}
      {/* ======================================================== */}
      <div
        style={getChapterStyle(0.9, 1.0)}
        className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto w-full text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/80 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur">
            <Palette className="w-3.5 h-3.5" />
            <span>CHAPTER 06 // VANGUARD ATELIER & BESPOKE CHASSIS SPECIFICATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
            Architect Your <br />
            <span className="text-vanguard-red">Velocity</span>
          </h2>
        </div>

        {/* Bottom Interactive Atelier Control Panel */}
        <div className="max-w-4xl mx-auto w-full carbon-panel p-6 sm:p-8 rounded-3xl border border-vanguard-border shadow-carbon-panel space-y-6 pointer-events-auto backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Paint Selector */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                01 // EXTERIOR LACQUER
              </span>
              <div className="font-display text-xs text-white font-bold">{activePaint.name}</div>
              <div className="flex items-center space-x-2.5 pt-1">
                {PAINT_OPTIONS.map((paint) => {
                  const isSelected = paint.id === activePaint.id;
                  return (
                    <button
                      key={paint.id}
                      onClick={() => {
                        hypercarAudio.playClick();
                        onSelectPaint(paint);
                      }}
                      data-cursor={paint.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                        isSelected
                          ? 'border-white scale-110 shadow-glow-red ring-2 ring-vanguard-red'
                          : 'border-vanguard-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: paint.color }}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white absolute inset-0 m-auto drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Aero Mode */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                02 // AERO PROFILE
              </span>
              <div className="font-display text-xs text-white font-bold">
                {aeroMode === 'downforce' ? 'HIGH DOWNFORCE (TRACK)' : 'LOW DRAG (V-MAX)'}
              </div>
              <div className="flex rounded bg-vanguard-panel p-1 border border-vanguard-border">
                <button
                  onClick={() => {
                    hypercarAudio.playAeroSurge();
                    onToggleAeroMode('downforce');
                  }}
                  className={`flex-1 py-1 px-2 rounded text-[9px] font-mono uppercase transition-all ${
                    aeroMode === 'downforce' ? 'bg-vanguard-red text-white' : 'text-vanguard-muted'
                  }`}
                >
                  980 KG AERO
                </button>
                <button
                  onClick={() => {
                    hypercarAudio.playAeroSurge();
                    onToggleAeroMode('vmax');
                  }}
                  className={`flex-1 py-1 px-2 rounded text-[9px] font-mono uppercase transition-all ${
                    aeroMode === 'vmax' ? 'bg-vanguard-cyan text-vanguard-dark font-bold' : 'text-vanguard-muted'
                  }`}
                >
                  415 KM/H V-MAX
                </button>
              </div>
            </div>

            {/* Caliper Accent */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
                03 // BRAKE CALIPER
              </span>
              <div className="font-display text-xs text-white font-bold">{caliperColor}</div>
              <div className="flex items-center space-x-2 pt-1 font-mono text-[10px]">
                {['ROSSO CORSA', 'GIALLO ACID', 'TITANIUM'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      hypercarAudio.playClick();
                      onSelectCaliper(c);
                    }}
                    className={`px-2 py-1 rounded border text-[9px] transition-all ${
                      caliperColor === c
                        ? 'border-vanguard-red text-white bg-vanguard-red/20'
                        : 'border-vanguard-border text-vanguard-muted'
                    }`}
                  >
                    {c.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-vanguard-border/60 pt-4 gap-4">
            <div className="text-[10px] font-mono text-vanguard-muted">
              STARTING AT €3,400,000 EXCL. TAXES • <span className="text-vanguard-red">BUILD NO. 008/035</span>
            </div>
            <button
              onClick={() => {
                hypercarAudio.playClick();
                onOpenReserve();
              }}
              data-cursor="ALLOCATION"
              className="px-6 py-2.5 rounded-xl bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs uppercase tracking-telemetry transition-all flex items-center space-x-2 shadow-glow-red"
            >
              <span>RESERVE CHASSIS ALLOCATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
