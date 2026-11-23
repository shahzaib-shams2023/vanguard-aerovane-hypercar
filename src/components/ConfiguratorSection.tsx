import React from 'react';
import { PAINT_OPTIONS, CarPaintOption } from './PersistentCarCanvas';
import { Palette, Sparkles, Shield, ArrowRight, Check } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

interface ConfiguratorSectionProps {
  activePaint: CarPaintOption;
  onSelectPaint: (paint: CarPaintOption) => void;
  aeroMode: 'downforce' | 'vmax';
  onToggleAeroMode: (mode: 'downforce' | 'vmax') => void;
  caliperColor: string;
  onSelectCaliper: (color: string) => void;
  onOpenReserve: () => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({
  activePaint,
  onSelectPaint,
  aeroMode,
  onToggleAeroMode,
  caliperColor,
  onSelectCaliper,
  onOpenReserve,
}) => {
  return (
    <section
      id="configurator-section"
      className="relative min-h-screen w-full flex flex-col justify-between py-32 px-4 sm:px-8 lg:px-12 select-none"
    >
      {/* Top Section Header */}
      <div className="max-w-[1440px] mx-auto w-full text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/70 border border-vanguard-border px-3.5 py-1.5 rounded">
          <Palette className="w-3.5 h-3.5" />
          <span>VANGUARD ATELIER // BESPOKE CHASSIS SPECIFICATION</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase leading-[0.95]">
          Architect Your <br />
          <span className="text-vanguard-red">Velocity</span>
        </h2>
      </div>

      {/* Middle Space for 3D Car Model */}
      <div className="h-64 sm:h-80" />

      {/* Bottom Interactive Atelier Control Panel */}
      <div className="max-w-4xl mx-auto w-full carbon-panel p-6 sm:p-10 rounded-3xl border border-vanguard-border shadow-carbon-panel space-y-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Paint Selector */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
              01 // EXTERIOR LACQUER
            </span>
            <div className="font-display text-sm text-white font-bold">
              {activePaint.name}
            </div>
            <div className="flex items-center space-x-3 pt-1">
              {PAINT_OPTIONS.map((paint) => {
                const isSelected = paint.id === activePaint.id;
                return (
                  <button
                    key={paint.id}
                    onClick={() => {
                      hypercarAudio.playClick();
                      onSelectPaint(paint);
                    }}
                    data-cursor={paint.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative ${
                      isSelected
                        ? 'border-white scale-110 shadow-glow-red ring-2 ring-vanguard-red'
                        : 'border-vanguard-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: paint.color }}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Aero Mode */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
              02 // AERODYNAMIC PROFILE
            </span>
            <div className="font-display text-sm text-white font-bold">
              {aeroMode === 'downforce' ? 'HIGH DOWNFORCE (TRACK)' : 'LOW DRAG (V-MAX)'}
            </div>
            <div className="flex rounded bg-vanguard-panel p-1 border border-vanguard-border">
              <button
                onClick={() => {
                  hypercarAudio.playAeroSurge();
                  onToggleAeroMode('downforce');
                }}
                className={`flex-1 py-1.5 px-3 rounded text-[10px] font-mono uppercase transition-all ${
                  aeroMode === 'downforce'
                    ? 'bg-vanguard-red text-white shadow-sm'
                    : 'text-vanguard-muted hover:text-white'
                }`}
              >
                980 KG AERO
              </button>
              <button
                onClick={() => {
                  hypercarAudio.playAeroSurge();
                  onToggleAeroMode('vmax');
                }}
                className={`flex-1 py-1.5 px-3 rounded text-[10px] font-mono uppercase transition-all ${
                  aeroMode === 'vmax'
                    ? 'bg-vanguard-cyan text-vanguard-dark font-bold shadow-sm'
                    : 'text-vanguard-muted hover:text-white'
                }`}
              >
                415 KM/H V-MAX
              </button>
            </div>
          </div>

          {/* Caliper Finish */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
              03 // BRAKE CALIPER ACCENT
            </span>
            <div className="font-display text-sm text-white font-bold">
              {caliperColor}
            </div>
            <div className="flex items-center space-x-2 pt-1 font-mono text-[10px]">
              {['ROSSO CORSA', 'GIALLO ACID', 'TITANIUM'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    hypercarAudio.playClick();
                    onSelectCaliper(c);
                  }}
                  className={`px-2.5 py-1 rounded border transition-all ${
                    caliperColor === c
                      ? 'border-vanguard-red text-white bg-vanguard-red/20'
                      : 'border-vanguard-border text-vanguard-muted hover:border-white'
                  }`}
                >
                  {c.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Bar */}
        <div className="pt-6 border-t border-vanguard-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-vanguard-muted text-center sm:text-left">
            <span>STARTING AT €3,400,000 EXCL. TAXES</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="text-vanguard-red">CHASSIS BUILD NO. 008/035</span>
          </div>

          <button
            onClick={() => {
              hypercarAudio.playClick();
              onOpenReserve();
            }}
            data-cursor="RESERVE"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs tracking-telemetry uppercase transition-all shadow-glow-red flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>RESERVE CHASSIS ALLOCATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

