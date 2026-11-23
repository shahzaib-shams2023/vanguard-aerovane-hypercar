import React from 'react';
import { ArrowUp, ShieldCheck, Gauge, Trophy } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToZenith = () => {
    hypercarAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-vanguard-dark border-t border-vanguard-border pt-20 pb-12 px-4 sm:px-8 lg:px-12 text-vanguard-silver font-mono relative z-10">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Top Lap Records & Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-vanguard-border">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-telemetry text-vanguard-red uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>CIRCUIT BENCHMARK</span>
            </div>
            <div className="font-display text-2xl text-white font-bold">1:16.82</div>
            <p className="text-[10px] text-vanguard-muted uppercase">FIORANO FACTORY TEST TRACK</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-telemetry text-vanguard-cyan uppercase">
              <Gauge className="w-3.5 h-3.5" />
              <span>NORDSCHLEIFE TELEMETRY</span>
            </div>
            <div className="font-display text-2xl text-white font-bold">6:28.40</div>
            <p className="text-[10px] text-vanguard-muted uppercase">NÜRBURGRING SIMULATED TARGET</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-telemetry text-vanguard-amber uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CHASSIS PRODUCTION</span>
            </div>
            <div className="font-display text-2xl text-white font-bold">35 UNITS</div>
            <p className="text-[10px] text-vanguard-muted uppercase">STRICT WORLDWIDE ALLOCATION</p>
          </div>

          <div className="flex lg:justify-end items-start">
            <button
              onClick={scrollToZenith}
              data-cursor="ZENITH"
              className="p-3.5 rounded bg-vanguard-panel border border-vanguard-border text-vanguard-muted hover:text-white hover:border-vanguard-red transition-all shadow-sm"
              title="Return to Apex"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Identity & Colophon */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-xs text-vanguard-muted">
          <div className="space-y-1">
            <span className="font-display text-lg text-white font-bold tracking-wider">
              VANGUARD HYPERCAR S.p.A.
            </span>
            <p className="text-[11px] font-sans text-vanguard-muted">
              Special Vehicle Operations // Wind Tunnel Aerodynamics Facility • Silverstone NN12 8TN, UK
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[10px] tracking-telemetry text-vanguard-muted uppercase">
            <span>TYPESET IN SYNCOPATE & PLUS JAKARTA SANS</span>
            <span>THREE.JS REAL-TIME GLTF ENGINE</span>
            <span className="text-vanguard-red">© 2026 VANGUARD. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

