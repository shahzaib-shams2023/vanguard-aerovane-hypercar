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
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 px-6 sm:px-10 lg:px-12 pointer-events-none select-none"
    >
      {/* Top Header / Eyebrow */}
      <div className="max-w-[1440px] mx-auto w-full pt-4">
        <div className="inline-flex items-center space-x-3 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/80 border border-vanguard-border px-3.5 py-1.5 rounded pointer-events-auto shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-vanguard-red animate-pulse" />
          <span>FIA HOMOLOGATED TRACK WEAPON // 35 CHASSIS ALLOCATION</span>
        </div>
      </div>

      {/* Center Monumental Automotive Typography */}
      <div className="max-w-[1440px] mx-auto w-full my-auto py-6">
        <div className="max-w-xl space-y-4">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white uppercase leading-[0.92]">
            AEROVANE <br />
            <span className="text-vanguard-red">V12</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted font-light max-w-lg leading-relaxed pt-1">
            A 1,420 BHP hybrid track weapon. Naturally aspirated 6.5L V12 paired with tri-axial axial-flux electric motors. Active ground-effect aerodynamics generating 980 kg of downforce.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 pointer-events-auto">
            <button
              onClick={() => {
                hypercarAudio.playAeroSurge();
                onExplore();
              }}
              data-cursor="ACCELERATE"
              className="px-7 py-3 rounded bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs tracking-telemetry uppercase transition-all shadow-glow-red flex items-center space-x-2 hover:-translate-y-0.5 active:translate-y-0"
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
              className="px-6 py-3 rounded carbon-panel hover:bg-vanguard-panel border border-vanguard-border text-vanguard-silver font-mono text-xs tracking-telemetry uppercase transition-all hover:border-vanguard-red hover:-translate-y-0.5 active:translate-y-0"
            >
              RESERVE CHASSIS
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-6">
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

