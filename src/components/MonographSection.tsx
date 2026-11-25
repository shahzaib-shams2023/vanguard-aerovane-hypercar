import React from 'react';
import { HOMOLOGATION_SPECS } from '../data/gt3Spec';

export const MonographSection: React.FC = () => {
  return (
    <section
      id="monograph"
      data-section="monograph"
      className="relative z-10 pointer-events-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[100svh]">
        {/* Mobile/Tablet Open 3D Window at Top */}
        <div className="lg:hidden h-[44svh] w-full pointer-events-none" aria-hidden="true" />

        {/* Left 6 Columns: Solid Alabaster Editorial Sheet */}
        <div className="lg:col-span-6 bg-alabaster bg-alabaster-grid text-ink px-5 sm:px-10 lg:px-14 py-14 lg:py-24 flex flex-col justify-between border-y lg:border-y-0 lg:border-r border-stone pointer-events-auto">
          <div className="max-w-xl space-y-8">
            <div className="flex items-center justify-between border-b border-stone pb-4">
              <span className="font-mono text-[11px] tracking-telemetry uppercase text-rosso font-medium">
                02 // HOMOLOGATION MONOGRAPH
              </span>
              <span className="font-mono text-[11px] tracking-editorial uppercase text-inkMuted">
                SPEC 2018.GT3
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[0.95] text-ink">
                Pure Mechanical{' '}
                <span className="font-serif italic font-normal text-rosso lowercase">
                  equilibrium.
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-inkMuted leading-relaxed">
                Replacing the naturally aspirated 458 Italia GT3, the 2018 488 GT3 brought twin-turbocharged mid-rear architecture into endurance competition—shaving center-of-gravity height while widening front and rear track for relentless cornering poise.
              </p>
            </div>

            {/* Technical Homologation Ledger */}
            <div className="border-t border-stone">
              {HOMOLOGATION_SPECS.map((row) => (
                <div
                  key={row.code}
                  className="py-3.5 border-b border-stone flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-editorial text-rosso uppercase w-24 shrink-0">
                      {row.code}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-wider text-inkMuted">
                      {row.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-medium text-ink sm:text-right tabular-nums">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 flex items-center justify-between font-mono text-[10px] tracking-editorial uppercase text-inkMuted">
            <span>ALUMINUM SPACEFRAME + FIA CAGE</span>
            <span>BALANCE OF PERFORMANCE</span>
          </div>
        </div>

        {/* Right 6 Columns (Desktop): Open Transparent 3D Stage */}
        <div
          className="hidden lg:flex lg:col-span-6 items-end justify-end p-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="border border-hairline bg-tarmac/85 px-4 py-2 font-mono text-[10px] tracking-editorial uppercase text-ash">
            SPLITTER &amp; LOUVER PROFILE // LIVE 3D
          </div>
        </div>
      </div>
    </section>
  );
};

