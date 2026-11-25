import React from 'react';
import { CALIPER_FINISHES, CaliperFinish } from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

interface ChassisMacroSectionProps {
  activeCaliper: CaliperFinish;
  onSelectCaliper: (caliper: CaliperFinish) => void;
  wheelSpeed: number;
  onChangeWheelSpeed: (speed: number) => void;
}

const SPEED_PRESETS = [
  { label: 'PARKED', speed: 0, kmh: '0 KM/H' },
  { label: 'PIT LANE', speed: 0.7, kmh: '80 KM/H' },
  { label: 'PARABOLICA', speed: 2.0, kmh: '255 KM/H' },
];

export const ChassisMacroSection: React.FC<ChassisMacroSectionProps> = ({
  activeCaliper,
  onSelectCaliper,
  wheelSpeed,
  onChangeWheelSpeed,
}) => {
  return (
    <section
      id="chassis"
      data-section="chassis"
      className="relative z-10 pointer-events-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[100svh]">
        {/* Mobile Top 3D Window */}
        <div className="lg:hidden h-[44svh] w-full pointer-events-none" aria-hidden="true" />

        {/* Left 5 Columns: Gunmetal Chassis & Braking Hardware Sheet */}
        <div className="lg:col-span-5 bg-gunmetal bg-atelier-grid border-y lg:border-y-0 lg:border-r border-hairline px-5 sm:px-8 lg:px-10 py-12 lg:py-20 flex flex-col justify-between pointer-events-auto">
          <div className="space-y-7">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <span className="font-mono text-[11px] tracking-telemetry uppercase text-rosso">
                04 // ROLLING CHASSIS
              </span>
              <span className="font-mono text-[11px] tracking-editorial uppercase text-ash">
                BREMBO GT3
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-[0.95] text-chalk">
                Forged Grip &amp;{' '}
                <span className="font-serif italic font-normal text-rosso lowercase">
                  stopping power.
                </span>
              </h2>
              <p className="font-sans text-sm text-ash leading-relaxed">
                Center-lock forged alloy wheels wrap 390 mm ventilated steel rotors per FIA GT3 regulations—clamped by 6-piston monobloc calipers and Michelin slicks built for 24-hour endurance.
              </p>
            </div>

            {/* Wheel Rotation Test */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-editorial uppercase text-ash">
                <span>AXLE VELOCITY SIMULATION</span>
                <span className="text-chalk tabular-nums">
                  {SPEED_PRESETS.find((p) => p.speed === wheelSpeed)?.kmh ?? '0 KM/H'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SPEED_PRESETS.map((preset) => {
                  const active = wheelSpeed === preset.speed;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        gt3Audio.playClick();
                        onChangeWheelSpeed(preset.speed);
                      }}
                      className={`py-3 px-2 border font-mono text-[10px] tracking-wider uppercase transition-colors ${
                        active
                          ? 'border-rosso bg-rosso text-chalk font-medium'
                          : 'border-hairline bg-tarmac text-ash hover:text-chalk hover:border-ash'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Caliper Finish Control */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-editorial uppercase text-ash">
                <span>CALIPER ANODIZATION</span>
                <span className="text-chalk">{activeCaliper.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {CALIPER_FINISHES.map((caliper) => {
                  const active = caliper.id === activeCaliper.id;
                  return (
                    <button
                      key={caliper.id}
                      type="button"
                      onClick={() => {
                        gt3Audio.playClick();
                        onSelectCaliper(caliper);
                      }}
                      className={`p-3 border text-left transition-colors flex items-center gap-2.5 ${
                        active
                          ? 'border-chalk bg-graphite text-chalk'
                          : 'border-hairline bg-tarmac text-ash hover:border-ash'
                      }`}
                    >
                      <span
                        className="w-3 h-3 shrink-0 border border-white/20"
                        style={{ backgroundColor: caliper.hex }}
                      />
                      <span className="font-mono text-[10px] uppercase truncate">
                        {caliper.id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hardware Specs */}
            <div className="border-t border-hairline pt-4 grid grid-cols-2 gap-4 font-mono">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-ash block">
                  FRONT ROTOR
                </span>
                <span className="text-xs sm:text-sm text-chalk mt-0.5 block">
                  390 × 34 MM IRON
                </span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase text-ash block">
                  COMPOUND
                </span>
                <span className="text-xs sm:text-sm text-chalk mt-0.5 block">
                  MICHELIN PILOT SPORT GT
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 font-mono text-[10px] tracking-editorial uppercase text-ash flex justify-between">
            <span>DOUBLE WISHBONE</span>
            <span>SACHS 4-WAY DAMPERS</span>
          </div>
        </div>

        {/* Right 7 Columns (Desktop): Open 3D Wheel & Caliper Macro */}
        <div
          className="hidden lg:flex lg:col-span-7 items-end justify-end p-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="border border-hairline bg-tarmac/85 px-4 py-2 font-mono text-[10px] tracking-editorial uppercase text-ash">
            WHEEL_FL // STATIONARY CALIPER PIVOT
          </div>
        </div>
      </div>
    </section>
  );
};

