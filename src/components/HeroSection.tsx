import React from 'react';
import { ArrowDown, Flame, Zap, Wind, Play } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenReserve: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenReserve }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Background Monumental Spatial Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none -z-10 select-none overflow-hidden">
        <span className="font-display text-[22vw] font-bold text-white tracking-widest whitespace-nowrap">
          VANGUARD
        </span>
      </div>

      {/* Top Header / Status Eyebrow */}
      <div className="max-w-[1440px] mx-auto w-full pt-6">
        <div className="inline-flex items-center space-x-3 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-2 rounded-full pointer-events-auto backdrop-blur shadow-sm">
          <span className="w-2 h-2 rounded-full bg-vanguard-red animate-ping" />
          <span>FIA HOMOLOGATED TRACK WEAPON // STRICT 35 CHASSIS ALLOCATION</span>
        </div>
      </div>

      {/* Center Monumental Typography & Narrative Brief */}
      <div className="max-w-[1440px] mx-auto w-full my-auto py-8">
        <div className="max-w-2xl space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-hyperspeed text-vanguard-cyan uppercase block font-medium">
              CHAPTER 01 // ZENITH AWAKENING
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.88] drop-shadow-2xl">
              AEROVANE <br />
              <span className="text-vanguard-red">V12</span>
            </h1>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted font-light max-w-lg leading-relaxed pt-1">
            A 1,420 BHP atmospheric symphony. Hand-crafted naturally aspirated 6.5L V12 screaming to 11,000 RPM, augmented by tri-axial axial-flux electric motors and active ground-effect Venturi tunnels.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <button
              onClick={() => {
                hypercarAudio.playIgnition();
                onExplore();
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
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/80 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="space-y-1">
            <span className="text-[9px] tracking-telemetry text-vanguard-muted uppercase block">
              01 // TOTAL OUTPUT
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
