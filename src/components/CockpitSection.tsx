import React, { useState } from 'react';
import { Compass, Eye, ShieldCheck, Cpu, Radio, Disc } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

export const CockpitSection: React.FC = () => {
  const [manettinoMode, setManettinoMode] = useState<string>('TRACK');
  const [boostMode, setBoostMode] = useState<string>('OVERTAKE');

  return (
    <section
      id="cockpit-section"
      className="relative min-h-screen w-full flex flex-col justify-between py-28 px-6 sm:px-10 lg:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Background Pilot Reticle Watermark */}
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none">
        <span className="font-display text-[22vw] font-bold text-vanguard-cyan tracking-widest whitespace-nowrap">
          PILOT HUD
        </span>
      </div>

      {/* Top Header */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-cyan uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur pointer-events-auto">
          <Eye className="w-3.5 h-3.5 animate-pulse" />
          <span>CHAPTER 05 // COCKPIT TRANSCENDENCE & PILOT FLIGHT-DECK</span>
        </div>

        <div className="flex items-center space-x-6 font-mono text-[10px] text-vanguard-muted">
          <span>SIGHTLINE: AUGMENTED APEX HUD</span>
          <span className="text-vanguard-border hidden sm:inline">|</span>
          <span className="text-vanguard-cyan hidden sm:inline">ZERO-DISTRACTION ERGONOMICS</span>
        </div>
      </div>

      {/* Center Flight-Deck Narrative & Tactical Manettino Console */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Space left open for 3D steering wheel & HUD hologram */}
        <div className="lg:col-span-6 flex flex-col justify-end space-y-4 pointer-events-auto">
          {/* Moment B Interior Callout */}
          <div className="carbon-panel p-6 rounded-2xl border border-vanguard-cyan/40 max-w-md space-y-2 backdrop-blur-xl">
            <div className="inline-flex items-center space-x-2 text-[9px] font-mono text-vanguard-cyan uppercase">
              <span className="w-2 h-2 rounded-full bg-vanguard-cyan animate-ping" />
              <span>MOMENT B // 42MM INTERIOR CANOPY BOROSCOPE</span>
            </div>
            <div className="font-display text-lg text-white font-bold">
              Driver Sensory Immersion
            </div>
            <p className="font-sans text-xs text-vanguard-muted leading-relaxed">
              Gliding through the anti-reflective laminated windscreen directly to the pilot eye-point. The integrated OLED steering wheel and holographic HUD align seamlessly in the driver’s central sightline.
            </p>
          </div>
        </div>

        {/* Right Column: Tactile Manettino Console */}
        <div className="lg:col-span-6 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 pointer-events-auto shadow-carbon-panel backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-cyan uppercase block">
              TACTILE ROTARY TELEMETRY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
              Flight-Deck <br />
              <span className="text-vanguard-cyan">Ergonomics</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Every critical dynamic function is adjustable without lifting a finger from the 9-and-3 grip. Rotary manettinos govern differential slip angles, aerodynamic downforce deployment, and instant electric boost.
          </p>

          {/* Interactive Manettino Selectors */}
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-telemetry text-vanguard-muted uppercase block">
                ROTARY 01 // CHASSIS DYNAMICS MANETTINO
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {['STREET', 'TRACK', 'QUALIFYING'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      hypercarAudio.playClick();
                      setManettinoMode(m);
                    }}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      manettinoMode === m
                        ? 'border-vanguard-cyan bg-vanguard-cyan/20 text-white font-bold shadow-sm'
                        : 'border-vanguard-border text-vanguard-muted hover:border-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-telemetry text-vanguard-muted uppercase block">
                ROTARY 02 // TRI-ELECTRIC MOTOR KERS BOOST
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {['ECO REGEN', 'BALANCED', 'OVERTAKE'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      hypercarAudio.playAeroSurge();
                      setBoostMode(b);
                    }}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      boostMode === b
                        ? 'border-vanguard-red bg-vanguard-red/20 text-white font-bold shadow-sm'
                        : 'border-vanguard-border text-vanguard-muted hover:border-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex flex-wrap items-center justify-between font-mono text-xs text-vanguard-muted">
        <div className="flex items-center space-x-6">
          <span>SEATING: <strong className="text-white">FIXED CARBON MONOCOQUE SHELL</strong></span>
          <span>PEDAL BOX: <strong className="text-vanguard-cyan">BILLET ADJUSTABLE</strong></span>
        </div>
        <div className="text-[10px] text-vanguard-silver uppercase">
          F1 ERGONOMICS // ZERO DISTRACTION PROTOCOL
        </div>
      </div>
    </section>
  );
};
