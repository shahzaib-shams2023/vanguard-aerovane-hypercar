import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { gt3Audio } from '../utils/sound';

interface HeroStageProps {
  onExplore: () => void;
  onOpenReserve: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ onExplore, onOpenReserve }) => {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative z-10 min-h-[100svh] flex flex-col justify-end lg:justify-between pt-20 pb-8 lg:pt-28 lg:pb-10 px-4 sm:px-8 lg:px-12 pointer-events-none"
    >
      {/* Mobile/Tablet bottom scrim so text over tarmac stays legible without hiding car above */}
      <div
        aria-hidden="true"
        className="lg:hidden absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-tarmac via-tarmac/95 to-transparent -z-10"
      />

      {/* Desktop subtle left radial vignette */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-tarmac/92 via-tarmac/55 to-transparent -z-10"
      />

      {/* Top Editorial Index Line (Desktop) */}
      <div className="max-w-[1440px] w-full mx-auto hidden lg:flex items-center justify-between border-b border-hairline/80 pb-4">
        <span className="font-mono text-[11px] tracking-telemetry uppercase text-ash">
          MARANELLO COMPETIZIONE // CHASSIS ARCHIVE 2018
        </span>
        <span className="font-mono text-[11px] tracking-telemetry uppercase text-rosso">
          FIA GROUP GT3 HOMOLOGATED
        </span>
      </div>

      {/* Main Lockup */}
      <div className="max-w-[1440px] w-full mx-auto my-0 lg:my-auto pt-44 sm:pt-56 lg:pt-0">
        <div className="max-w-xl space-y-5 lg:space-y-6 pointer-events-auto">
          <div className="space-y-1.5">
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-chalk/90 tracking-normal">
              2018 Ferrari
            </p>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tightest uppercase leading-[0.88] text-chalk">
              488 <span className="text-rosso">GT3</span>
            </h1>
          </div>

          <p className="font-sans text-sm sm:text-base text-chalk/80 max-w-md leading-relaxed">
            Twin-turbocharged 3.9-liter V8 endurance geometry sculpted inside the Maranello wind tunnel. Built to FIA GT3 regulations with full carbon-kevlar aero bodywork.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                gt3Audio.playClick();
                onExplore();
              }}
              className="px-6 py-3.5 bg-chalk hover:bg-alabaster text-ink font-mono text-xs tracking-[0.18em] uppercase font-medium flex items-center gap-2.5 transition-colors"
            >
              <span>Enter Monograph</span>
              <ArrowDownRight className="w-4 h-4 text-rosso" />
            </button>

            <button
              type="button"
              onClick={() => {
                gt3Audio.playClick();
                onOpenReserve();
              }}
              className="px-6 py-3.5 border border-hairline bg-gunmetal/90 hover:border-rosso text-chalk font-mono text-xs tracking-[0.18em] uppercase transition-colors"
            >
              Specify Allocation
            </button>
          </div>
        </div>
      </div>

      {/* Architectural Baseline Telemetry Strip */}
      <div className="max-w-[1440px] w-full mx-auto pt-8 lg:pt-0 pointer-events-auto">
        <div className="border-t border-hairline pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
              01 // ARCHITECTURE
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-chalk mt-0.5 block">
              F154CB V8
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
              02 // HOMOLOGATED
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-chalk mt-0.5 block tabular-nums">
              600 PS
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
              03 // DRY MASS
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-chalk mt-0.5 block tabular-nums">
              1,260 KG
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
              04 // DOWNFORCE
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-rosso mt-0.5 block tabular-nums">
              980 KG
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

