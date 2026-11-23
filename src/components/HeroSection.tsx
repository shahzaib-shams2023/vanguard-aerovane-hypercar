import React from 'react';
import { ArrowDown, Flame, ShieldAlert, Zap, Wind } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenReserve: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenReserve }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-12 pointer-events-none select-none"
    >
      {/* Top Header / Eyebrow */}
      <div className="max-w-[1720px] mx-auto w-full pt-6">
        <div className="inline-flex items-center space-x-3 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/70 border border-vanguard-border px-3.5 py-1.5 rounded pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-vanguard-red animate-pulse" />
          <span>FIA HOMOLOGATED TRACK WEAPON // LIMITED PRODUCTION OF 35 CHASSIS</span>
        </div>
      </div>

      {/* Center Monumental Automotive Typography */}
      <div className="max-w-[1720px] mx-auto w-full my-auto py-8">
        <div className="max-w-3xl space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-white uppercase leading-[0.88]">
            AEROVANE <br />
            <span className="text-vanguard-red tracking-tight">V12</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-vanguard-muted font-light max-w-xl leading-relaxed pt-2">
            The ultimate convergence of computational fluid dynamics, an 11,000 RPM naturally aspirated V12, and quad-inverter torque-vectoring electric propulsion. Designed to distort time and tarmac.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <button
              onClick={() => {
                hypercarAudio.playAeroSurge();
                onExplore();
              }}
              data-cursor="ACCELERATE"
              className="px-8 py-3.5 rounded bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs tracking-telemetry uppercase transition-all shadow-glow-red flex items-center space-x-2"
            >
              <span>ENGAGE AERODYNAMICS</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                hypercarAudio.playClick();
                onOpenReserve();
              }}
              data-cursor="SPECIFY"
              className="px-7 py-3.5 rounded carbon-panel hover:bg-vanguard-panel border border-vanguard-border text-vanguard-silver font-mono text-xs tracking-telemetry uppercase transition-all hover:border-vanguard-red"
            >
              RESERVE CHASSIS
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="max-w-[1720px] mx-auto w-full border-t border-vanguard-border/70 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="space-y-1">
            <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
              01 // MAXIMUM OUTPUT
            </span>
            <div className="font-display text-2xl sm:text-3xl text-white font-bold">1,420 BHP</div>
            <span className="text-[10px] text-vanguard-red uppercase block">
              V12 + TRI-ELECTRIC MOTORS
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
              02 // ACCELERATION
            </span>
            <div className="font-display text-2xl sm:text-3xl text-white font-bold">2.1 SEC</div>
            <span className="text-[10px] text-vanguard-cyan uppercase block">
              0–100 KM/H LAUNCH CONTROL
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
              03 // TERMINAL VELOCITY
            </span>
            <div className="font-display text-2xl sm:text-3xl text-white font-bold">415 KM/H</div>
            <span className="text-[10px] text-vanguard-amber uppercase block">
              LOW-DRAG V-MAX MODE
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
              04 // DOWNFORCE
            </span>
            <div className="font-display text-2xl sm:text-3xl text-white font-bold">980 KG</div>
            <span className="text-[10px] text-vanguard-silver uppercase block">
              AT 280 KM/H (ACTIVE VENTURI)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

