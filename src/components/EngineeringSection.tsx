import React from 'react';
import { Layers, Shield, Wrench, Activity } from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  return (
    <section
      id="engineering-section"
      className="relative min-h-screen w-full flex items-center py-32 px-4 sm:px-8 lg:px-12 pointer-events-none select-none"
    >
      <div className="max-w-[1720px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Monocoque Blueprint Telemetry */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-12 rounded-2xl border border-vanguard-border space-y-8 pointer-events-auto shadow-carbon-panel">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-amber uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>TECTONIC STRUCTURAL INTEGRITY // CAD BLUEPRINT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.95]">
              Carbon <br />
              <span className="text-vanguard-red">Monocoque</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Constructed from aerospace-grade T800 dry carbon-fiber cured in high-pressure autoclaves. The entire tub weighs merely 88 kilograms while providing torsional rigidity exceeding 65,000 Newton-meters per degree of twist.
          </p>

          {/* Blueprint Engineering Specs */}
          <div className="space-y-3 pt-4 border-t border-vanguard-border font-mono text-xs">
            <div className="p-3 rounded bg-vanguard-panel border border-vanguard-border flex justify-between items-center">
              <span className="text-vanguard-muted">TUB DRY WEIGHT:</span>
              <span className="text-white font-bold">88 KG</span>
            </div>
            <div className="p-3 rounded bg-vanguard-panel border border-vanguard-border flex justify-between items-center">
              <span className="text-vanguard-muted">TORSIONAL RIGIDITY:</span>
              <span className="text-vanguard-amber font-bold">65,000 NM / DEG</span>
            </div>
            <div className="p-3 rounded bg-vanguard-panel border border-vanguard-border flex justify-between items-center">
              <span className="text-vanguard-muted">SUSPENSION ARCHITECTURE:</span>
              <span className="text-white font-bold">PUSHROD INBOARD DAMPERS</span>
            </div>
            <div className="p-3 rounded bg-vanguard-panel border border-vanguard-border flex justify-between items-center">
              <span className="text-vanguard-muted">BRAKING ROTORS:</span>
              <span className="text-vanguard-red font-bold">410MM C-SiC CARBON CERAMIC</span>
            </div>
          </div>
        </div>

        {/* Right space open for 3D Car overhead view */}
        <div className="lg:col-span-7 h-64 lg:h-auto" />
      </div>
    </section>
  );
};

