import React from 'react';
import { AERO_ZONES } from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

interface AeroInspectionSectionProps {
  activeAeroId: string;
  onSelectAero: (zoneId: string, cameraId: string) => void;
}

export const AeroInspectionSection: React.FC<AeroInspectionSectionProps> = ({
  activeAeroId,
  onSelectAero,
}) => {
  const activeZone = AERO_ZONES.find((z) => z.id === activeAeroId) ?? AERO_ZONES[0];

  return (
    <section
      id="aero"
      data-section="aero"
      className="relative z-10 pointer-events-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[100svh]">
        {/* Left 7 Columns (Desktop) / Top 44svh (Mobile): Open 3D Aero Stage */}
        <div className="h-[44svh] lg:h-auto lg:col-span-7 flex items-end p-5 lg:p-10 pointer-events-none">
          <div className="hidden lg:block border border-hairline bg-tarmac/85 px-4 py-2 font-mono text-[10px] tracking-editorial uppercase text-chalk">
            INSPECTING: <span className="text-rosso">{activeZone.title}</span>
          </div>
        </div>

        {/* Right 5 Columns: Gunmetal Wind-Tunnel Controls */}
        <div className="lg:col-span-5 bg-gunmetal bg-atelier-grid border-t lg:border-t-0 lg:border-l border-hairline px-5 sm:px-8 lg:px-10 py-12 lg:py-20 flex flex-col justify-between pointer-events-auto">
          <div className="space-y-7">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <span className="font-mono text-[11px] tracking-telemetry uppercase text-rosso">
                03 // WIND-TUNNEL AERO
              </span>
              <span className="font-mono text-[11px] tracking-editorial uppercase text-ash">
                3.12 L/D RATIO
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-[0.95] text-chalk">
                Sculpted For{' '}
                <span className="font-serif italic font-normal text-modena lowercase">
                  downforce.
                </span>
              </h2>
              <p className="font-sans text-sm text-ash leading-relaxed">
                Select any aerodynamic surface below to pivot the 3D studio camera directly onto the 488 GT3 bodywork.
              </p>
            </div>

            {/* Interactive Zone Selector */}
            <div className="border-t border-hairline" role="tablist" aria-label="Aerodynamic zones">
              {AERO_ZONES.map((zone) => {
                const selected = zone.id === activeZone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      gt3Audio.playTurboFlutter();
                      onSelectAero(zone.id, zone.cameraId);
                    }}
                    className={`w-full text-left py-4 px-3 border-b border-hairline transition-colors flex items-center justify-between gap-4 ${
                      selected
                        ? 'bg-graphite text-chalk border-l-2 border-l-rosso'
                        : 'text-ash hover:text-chalk hover:bg-graphite/40'
                    }`}
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-[11px] text-rosso shrink-0">
                        {zone.index}
                      </span>
                      <span className="font-display text-sm sm:text-base font-semibold uppercase truncate">
                        {zone.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-modena shrink-0 tabular-nums">
                      {zone.metricValue}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Zone Telemetry Readout */}
            <div className="border border-hairline bg-tarmac p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-editorial uppercase text-ash">
                  {activeZone.metricLabel}
                </span>
                <span className="font-mono text-xs text-rosso font-medium tabular-nums">
                  {activeZone.metricValue}
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-chalk/85 leading-relaxed">
                {activeZone.summary}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-hairline">
                {activeZone.telemetry.map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-ash block">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-chalk mt-0.5 block">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 font-mono text-[10px] tracking-editorial uppercase text-ash flex justify-between">
            <span>CFD COMPUTED</span>
            <span>MARANELLO TUNNEL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

