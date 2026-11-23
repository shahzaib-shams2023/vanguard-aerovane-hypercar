import React from 'react';
import { Wind, Gauge, Layers, ShieldCheck } from 'lucide-react';

export const DesignSection: React.FC = () => {
  return (
    <section
      id="design-section"
      className="relative min-h-screen w-full flex items-center py-32 px-4 sm:px-8 lg:px-12 pointer-events-none select-none"
    >
      <div className="max-w-[1720px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Asymmetrical Aero Telemetry Card */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-12 rounded-2xl border border-vanguard-border space-y-8 pointer-events-auto shadow-carbon-panel">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase">
              <Wind className="w-3.5 h-3.5" />
              <span>CFD WIND TUNNEL OPTIMIZATION // STAGE 02</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.95]">
              Form Follows <br />
              <span className="text-vanguard-red">Airflow</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Every curve on the Aerovane V12 is calculated to manipulate high-velocity pressure differentials. Twin front vortex generators feed subterranean Venturi tunnels, generating massive negative lift without parasitic aerodynamic drag.
          </p>

          {/* Technical Aero Matrix */}
          <div className="space-y-4 pt-4 border-t border-vanguard-border font-mono text-xs">
            <div className="flex justify-between items-center py-2 border-b border-vanguard-border/50">
              <span className="text-vanguard-muted">DRAG COEFFICIENT (Cd):</span>
              <span className="text-white font-bold">0.31 (ACTIVE AERO MODE)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-vanguard-border/50">
              <span className="text-vanguard-muted">FRONT DIFFUSER TUNNELS:</span>
              <span className="text-vanguard-cyan font-bold">DUAL CARBON VENTURI</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-vanguard-border/50">
              <span className="text-vanguard-muted">ACTIVE REAR AIRBRAKE:</span>
              <span className="text-vanguard-red font-bold">0–48° HYDRAULIC DEPLOY</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-vanguard-muted">LATERAL ACCELERATION:</span>
              <span className="text-white font-bold">2.4 G (SLICK TIRES)</span>
            </div>
          </div>
        </div>

        {/* Right Space left open for the 3D Car Model */}
        <div className="lg:col-span-7 h-64 lg:h-auto" />
      </div>
    </section>
  );
};

