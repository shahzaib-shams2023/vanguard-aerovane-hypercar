import React, { useState } from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';
import { gt3Audio } from '../utils/sound';

interface CockpitDeckSectionProps {
  lampsOn: boolean;
  onToggleLamps: () => void;
}

const DRIVE_MAPS = [
  {
    id: 'dry',
    label: 'DRY SLICK',
    tc: 'TC 04 // ABS 03',
    boost: '1.65 BAR',
    note: 'Balanced torque curve calibrated for medium-compound endurance slicks.',
  },
  {
    id: 'wet',
    label: 'WET ENDURANCE',
    tc: 'TC 09 // ABS 08',
    boost: '1.42 BAR',
    note: 'Softened throttle progression and aggressive slip-angle intervention for night rain stints.',
  },
  {
    id: 'quali',
    label: 'QUALIFYING',
    tc: 'TC 02 // ABS 01',
    boost: '1.78 BAR',
    note: 'Maximum FIA BoP transient response and crisp downshift blip mapping.',
  },
];

export const CockpitDeckSection: React.FC<CockpitDeckSectionProps> = ({
  lampsOn,
  onToggleLamps,
}) => {
  const [mapId, setMapId] = useState<string>('dry');
  const activeMap = DRIVE_MAPS.find((m) => m.id === mapId) ?? DRIVE_MAPS[0];

  return (
    <section
      id="cockpit"
      data-section="cockpit"
      className="relative z-10 min-h-[100svh] flex flex-col justify-between pointer-events-none"
    >
      {/* Upper Open Viewport framing windshield & steering wheel */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-24 flex items-center justify-between">
        <span className="border border-hairline bg-tarmac/85 px-3 py-1.5 font-mono text-[10px] tracking-telemetry uppercase text-chalk">
          05 // PILOT FLIGHT CELL
        </span>
        <span className="hidden sm:inline-block border border-hairline bg-tarmac/85 px-3 py-1.5 font-mono text-[10px] tracking-editorial uppercase text-ash">
          FIA 8862 CARBON SHELL
        </span>
      </div>

      {/* Spacer keeping windshield sightline 100% open */}
      <div className="h-[36svh] sm:h-[42svh] lg:h-[46svh]" aria-hidden="true" />

      {/* Bottom Solid Console Bar */}
      <div className="bg-tarmac/95 border-t border-hairline px-4 sm:px-8 lg:px-12 py-8 lg:py-10 pointer-events-auto">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-4 space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-chalk">
              Driver{' '}
              <span className="font-serif italic font-normal text-rosso lowercase">
                ergonomics.
              </span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ash leading-relaxed">
              {activeMap.note}
            </p>
          </div>

          {/* Rotary Map Calibration */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-editorial uppercase text-ash">
              <span>MANETTINO CALIBRATION</span>
              <span className="text-modena">{activeMap.tc} // {activeMap.boost}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DRIVE_MAPS.map((m) => {
                const selected = m.id === mapId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      gt3Audio.playClick();
                      setMapId(m.id);
                    }}
                    className={`py-3 px-2 border font-mono text-[10px] tracking-wider uppercase transition-colors ${
                      selected
                        ? 'border-rosso bg-rosso text-chalk font-medium'
                        : 'border-hairline bg-gunmetal text-ash hover:text-chalk hover:border-ash'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Endurance Lamps & Engine Note */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                gt3Audio.playClick();
                onToggleLamps();
              }}
              aria-pressed={lampsOn}
              className={`w-full py-3 px-4 border font-mono text-[10px] tracking-editorial uppercase flex items-center justify-between transition-colors ${
                lampsOn
                  ? 'border-modena bg-modena/15 text-chalk'
                  : 'border-hairline bg-gunmetal text-ash hover:text-chalk'
              }`}
            >
              <span>ENDURANCE LAMPS</span>
              <Lightbulb className={`w-3.5 h-3.5 ${lampsOn ? 'text-modena' : 'text-ash'}`} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (!gt3Audio.isSoundActive()) {
                  gt3Audio.toggle();
                } else {
                  gt3Audio.playIgnition();
                }
              }}
              className="w-full py-3 px-4 border border-hairline bg-gunmetal hover:border-rosso text-chalk font-mono text-[10px] tracking-editorial uppercase flex items-center justify-between transition-colors"
            >
              <span>PULSE V8 IGNITION</span>
              <Volume2 className="w-3.5 h-3.5 text-rosso" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

