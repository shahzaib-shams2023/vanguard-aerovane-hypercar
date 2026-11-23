import React, { useState } from 'react';
import { Layers, Shield, Wrench, Activity, Crosshair, Cpu } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

export const EngineeringSection: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<number>(0);

  const subsystems = [
    {
      id: 'monocoque',
      label: '01 // T800 DRY CARBON MONOCOQUE',
      highlight: '65,000 NM / DEG RIGIDITY',
      detail: 'Aerospace-grade T800 carbon fiber pre-preg cured at 135°C under 6.5 bar of pressure. Single-piece tub weighs only 88 kilograms, providing unmatched torsional stability.',
      specs: [
        { key: 'TUB DRY WEIGHT', val: '88 KG' },
        { key: 'TORSIONAL RIGIDITY', val: '65,000 NM/DEG' },
        { key: 'CRASH STRUCTURE', val: 'ALUMINUM HONEYCOMB' },
      ],
    },
    {
      id: 'suspension',
      label: '02 // INBOARD PUSHROD DAMPING',
      highlight: 'F1 HORIZONTAL KINEMATICS',
      detail: 'Unequal-length titanium double wishbones linked to inboard horizontally mounted Multimatic DSSV spool-valve dampers with active ride-height control.',
      specs: [
        { key: 'DAMPER SYSTEM', val: 'MULTIMATIC DSSV 4-WAY' },
        { key: 'UNSPRUNG MASS', val: '-18.5 KG REDUCTION' },
        { key: 'AERO COMPENSATION', val: 'HEAVE SPRING MATRIX' },
      ],
    },
    {
      id: 'powertrain',
      label: '03 // 6.5L V12 MID-ENGINE BLOCK',
      highlight: '11,000 RPM DRY SUMP',
      detail: '65-degree naturally aspirated alloy V12 with titanium con-rods and variable-geometry inlet tracts, mounted rigidly as a stressed chassis member.',
      specs: [
        { key: 'DISPLACEMENT', val: '6,498 CC' },
        { key: 'COMPRESSION RATIO', val: '13.8:1' },
        { key: 'VALVETRAIN', val: 'FINGER FOLLOWERS' },
      ],
    },
    {
      id: 'brakes',
      label: '04 // 410MM C-SiC ROTORS',
      highlight: '1,000°C FADE RESISTANCE',
      detail: 'Continuous-fiber carbon-silicon-carbide composite discs clamped by monobloc 6-piston front and 4-piston rear billet aluminum calipers.',
      specs: [
        { key: 'FRONT DISC DIAMETER', val: '410 MM' },
        { key: 'REAR DISC DIAMETER', val: '390 MM' },
        { key: 'MAX DECELERATION', val: '2.4 G' },
      ],
    },
  ];

  const current = subsystems[selectedSubsystem];

  return (
    <section
      id="engineering-section"
      className="relative min-h-screen w-full flex flex-col justify-between py-28 px-6 sm:px-10 lg:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Background CAD Blueprint Grid & Watermark */}
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none">
        <span className="font-display text-[20vw] font-bold text-vanguard-amber tracking-widest whitespace-nowrap">
          CAD 65k
        </span>
      </div>

      {/* Top Header */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-amber uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur pointer-events-auto">
          <Crosshair className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>CHAPTER 04 // TECTONIC CAD DISSECTION & X-RAY BLUEPRINT</span>
        </div>

        <div className="flex items-center space-x-6 font-mono text-[10px] text-vanguard-muted">
          <span>DIMENSIONS: 4,520 × 2,050 × 1,180 MM</span>
          <span className="text-vanguard-border hidden sm:inline">|</span>
          <span className="text-vanguard-amber hidden sm:inline">AUTOCLAVED PRE-PREG</span>
        </div>
      </div>

      {/* Center Interactive Blueprint Terminal */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Column: Interactive CAD Subsystems Dossier */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 pointer-events-auto shadow-carbon-panel backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-amber uppercase block">
              MOMENT D // STRUCTURAL X-RAY REVEAL
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
              Carbon <br />
              <span className="text-vanguard-amber">Monocoque</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Through the semi-transparent X-ray shell, examine the structural skeletal architecture. The central tub, pushrod suspension mounts, and stressed V12 powertrain form an indivisible geometric whole.
          </p>

          {/* Interactive Subsystem Pills */}
          <div className="space-y-3 pt-2">
            <span className="text-[9px] font-mono tracking-telemetry text-vanguard-muted uppercase block">
              CAD COMPONENT LAYER SELECTION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subsystems.map((sub, idx) => {
                const isSelected = idx === selectedSubsystem;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      hypercarAudio.playClick();
                      setSelectedSubsystem(idx);
                    }}
                    className={`p-3 rounded-xl border text-left font-mono text-[10px] transition-all duration-300 ${
                      isSelected
                        ? 'border-vanguard-amber bg-vanguard-amber/15 text-white shadow-sm font-bold'
                        : 'border-vanguard-border/70 bg-vanguard-panel/50 text-vanguard-muted hover:border-white'
                    }`}
                  >
                    <div className="text-white truncate">{sub.label.split('//')[1]}</div>
                    <div className="text-vanguard-amber text-[9px]">{sub.highlight.split(' ')[0]} {sub.highlight.split(' ')[1]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Subsystem Detailed Specs Grid */}
          <div className="p-4 rounded-2xl bg-vanguard-panel/80 border border-vanguard-border/80 space-y-3 font-mono text-xs">
            <div className="text-[11px] text-vanguard-silver font-sans leading-relaxed">
              {current.detail}
            </div>
            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-vanguard-border/50">
              {current.specs.map((sp) => (
                <div key={sp.key} className="flex justify-between items-center text-[10px]">
                  <span className="text-vanguard-muted">{sp.key}:</span>
                  <span className="text-vanguard-amber font-bold">{sp.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Space left open for 3D Car CAD view */}
        <div className="lg:col-span-7 flex flex-col justify-end items-end pointer-events-auto">
          {/* Blueprint Telemetry Badge */}
          <div className="carbon-panel p-5 rounded-2xl border border-vanguard-border/80 max-w-xs space-y-2 text-right hidden lg:block backdrop-blur">
            <div className="text-[9px] font-mono text-vanguard-amber uppercase">
              TORSIONAL RIGIDITY METRIC
            </div>
            <div className="font-display text-2xl text-white font-bold">
              65,000 <span className="text-xs text-vanguard-muted font-mono">NM/DEG</span>
            </div>
            <div className="text-[10px] font-mono text-vanguard-muted">
              Zero flex under 2.4G lateral apex loading.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex flex-wrap items-center justify-between font-mono text-xs text-vanguard-muted">
        <div className="flex items-center space-x-6">
          <span>DRY CHASSIS TUB: <strong className="text-white">88 KG</strong></span>
          <span>WEIGHT DISTRIBUTION: <strong className="text-vanguard-amber">43% FRONT / 57% REAR</strong></span>
        </div>
        <div className="text-[10px] text-vanguard-silver uppercase">
          STRUCTURAL CAD MATRIX // FULL RECONSTRUCTION
        </div>
      </div>
    </section>
  );
};
