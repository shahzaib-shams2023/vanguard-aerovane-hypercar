import React from 'react';
import { Compass, Eye, ShieldCheck, Cpu } from 'lucide-react';

export const CockpitSection: React.FC = () => {
  return (
    <section
      id="cockpit-section"
      className="relative min-h-screen w-full flex items-center justify-end py-32 px-4 sm:px-8 lg:px-12 pointer-events-none select-none"
    >
      <div className="max-w-[1720px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left space for 3D Car Cockpit view */}
        <div className="lg:col-span-7 h-64 lg:h-auto" />

        {/* Right Column: Cabin & Ergonomics Dossier */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-12 rounded-2xl border border-vanguard-border space-y-8 pointer-events-auto shadow-carbon-panel">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase">
              <Eye className="w-3.5 h-3.5" />
              <span>DRIVER ENCLOSURE // ZERO-DISTRACTION COCKPIT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.95]">
              Flight-Deck <br />
              <span className="text-vanguard-red">Ergonomics</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Every millimeter is tuned around driver sensory immersion. The steering wheel houses rotary manettino dials for differential lock, aerodynamic angle-of-attack, and electric boost deployment without taking hands off the 9-and-3 grip.
          </p>

          {/* Cabin Features Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-vanguard-border font-mono text-xs">
            <div className="p-3.5 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">STEERING WHEEL</span>
              <span className="text-white font-bold block">F1 Integrated OLED</span>
              <span className="text-[9px] text-vanguard-cyan block">TACTILE MANETTINO</span>
            </div>

            <div className="p-3.5 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">SEATING MONOCOQUE</span>
              <span className="text-white font-bold block">Fixed Carbon Shell</span>
              <span className="text-[9px] text-vanguard-red block">ADJUSTABLE PEDAL BOX</span>
            </div>

            <div className="p-3.5 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">MATERIAL FINISH</span>
              <span className="text-white font-bold block">Ultralight Alcantara</span>
              <span className="text-[9px] text-vanguard-muted block">NON-REFLECTIVE MATTE</span>
            </div>

            <div className="p-3.5 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">TELEMETRY DISPLAY</span>
              <span className="text-white font-bold block">Head-Up Hologram</span>
              <span className="text-[9px] text-vanguard-amber block">AUGMENTED APEX HUD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

