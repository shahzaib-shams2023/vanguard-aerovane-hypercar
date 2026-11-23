import React, { useState } from 'react';
import { Wind, Gauge, Layers, Eye, ChevronRight, Activity } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

export const DesignSection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<number>(0);

  const aeroZones = [
    {
      title: 'FRONT DUAL VENTURI TUNNELS',
      metric: '420 KG DOWNFORCE',
      desc: 'Subterranean carbon tunnels route high-velocity turbulent air around the front wheel wells into laminar underfloor channels, eliminating aerodynamic front axle lift.',
    },
    {
      title: 'ACTIVE HYDRAULIC REAR AIRBRAKE',
      metric: '0° – 48° DEPLOY',
      desc: 'Dual carbon aerofoils deploy in 120 milliseconds under high-speed braking, shifting the center of aerodynamic pressure rearward to stabilize deceleration at 2.4 G.',
    },
    {
      title: 'VORTEX FLUID GENERATORS',
      metric: '0.31 Cd DRAG INDEX',
      desc: 'NACA duct intakes sculpt airflow over the cockpit canopy, energizing the boundary layer and feeding the mid-mounted 6.5L V12 induction plenum.',
    },
  ];

  return (
    <section
      id="design-section"
      className="relative min-h-screen w-full flex flex-col justify-between py-28 px-6 sm:px-10 lg:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Background Kinetic Typography Watermark */}
      <div className="absolute top-1/3 -right-12 opacity-[0.03] pointer-events-none select-none">
        <span className="font-display text-[18vw] font-bold text-vanguard-cyan tracking-tighter whitespace-nowrap">
          AERO 0.31
        </span>
      </div>

      {/* Top Telemetry Header */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur pointer-events-auto">
          <Wind className="w-3.5 h-3.5 animate-pulse" />
          <span>CFD SUPERSONIC WIND TUNNEL // 380 STREAMLINE VELOCITY VECTORS</span>
        </div>

        <div className="hidden sm:flex items-center space-x-6 font-mono text-[10px] text-vanguard-muted">
          <span>ATMOSPHERIC DENSITY: 1.225 KG/M³</span>
          <span className="text-vanguard-border">|</span>
          <span className="text-vanguard-cyan">TUNNEL SPEED: 320 KM/H</span>
        </div>
      </div>

      {/* Center Narrative Layout */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Column: Aero Command Dossier */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 pointer-events-auto shadow-carbon-panel backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-red uppercase block">
              CHAPTER 02 // FLUID DYNAMICS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
              Sculpted By <br />
              <span className="text-vanguard-cyan">Supersonic Air</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Every millimeter of carbon fiber has been sculpted by fluid dynamic pressure equations. Negative lift is harvested directly beneath the vehicle, locking the chassis to the tarmac through pure atmospheric suction.
          </p>

          {/* Interactive Aero Zones Switcher */}
          <div className="space-y-3 pt-2">
            <span className="text-[9px] font-mono tracking-telemetry text-vanguard-muted uppercase block">
              INTERACTIVE AERO TELEMETRY // SELECT COMPONENT
            </span>
            <div className="space-y-2">
              {aeroZones.map((zone, idx) => {
                const isSelected = idx === activeZone;
                return (
                  <button
                    key={zone.title}
                    onClick={() => {
                      hypercarAudio.playClick();
                      setActiveZone(idx);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 font-mono text-xs flex flex-col space-y-1 ${
                      isSelected
                        ? 'border-vanguard-cyan bg-vanguard-cyan/10 text-white shadow-sm'
                        : 'border-vanguard-border/60 bg-vanguard-panel/40 text-vanguard-muted hover:border-vanguard-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] tracking-wider text-white">
                        {zone.title}
                      </span>
                      <span className="text-[10px] text-vanguard-cyan font-bold">
                        {zone.metric}
                      </span>
                    </div>
                    {isSelected && (
                      <p className="text-[11px] text-vanguard-silver/80 pt-1 leading-normal font-sans">
                        {zone.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Space left open for 3D Car & Macro Splitter Inspection */}
        <div className="lg:col-span-7 flex flex-col justify-end items-end pointer-events-auto">
          {/* Macro Inspection HUD Callout */}
          <div className="carbon-panel p-4 rounded-xl border border-vanguard-border/80 max-w-xs space-y-2 text-right hidden lg:block backdrop-blur">
            <div className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-vanguard-cyan uppercase">
              <Eye className="w-3 h-3" />
              <span>MOMENT A // 26MM MACRO SPLITTER PROBE</span>
            </div>
            <div className="text-[11px] font-mono text-vanguard-silver">
              Autoclaved T800 weave orientation visible under optical zoom.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex flex-wrap items-center justify-between font-mono text-xs text-vanguard-muted">
        <div className="flex items-center space-x-6">
          <span>DRAG COEFFICIENT: <strong className="text-white">0.31 Cd</strong></span>
          <span>GROUND SUCTION: <strong className="text-vanguard-cyan">980 KG @ 280 KM/H</strong></span>
        </div>
        <div className="text-[10px] text-vanguard-silver uppercase">
          AERO DYNAMICS ENGINE // CONTINUOUS SCROLL FLUIDITY
        </div>
      </div>
    </section>
  );
};
