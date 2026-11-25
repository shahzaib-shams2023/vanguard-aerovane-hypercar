import React from 'react';
import { ArrowRight, Check, Lightbulb, Move3d, RotateCcw } from 'lucide-react';
import {
  CALIPER_FINISHES,
  CAMERA_SHOTS,
  CaliperFinish,
  LIVERY_FINISHES,
  LiveryFinish,
} from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

interface AtelierStudioSectionProps {
  activeLivery: LiveryFinish;
  onSelectLivery: (livery: LiveryFinish) => void;
  activeCaliper: CaliperFinish;
  onSelectCaliper: (caliper: CaliperFinish) => void;
  aeroPackage: 'downforce' | 'vmax';
  onChangeAeroPackage: (pkg: 'downforce' | 'vmax') => void;
  lampsOn: boolean;
  onToggleLamps: () => void;
  interactiveOrbit: boolean;
  onToggleOrbit: () => void;
  activePresetId: string;
  onSelectPreset: (shotId: string) => void;
  onOpenReserve: () => void;
}

const STUDIO_PRESETS = [
  { id: 'atelier', label: '3/4 Studio' },
  { id: 'aero-splitter', label: 'Nose & Splitter' },
  { id: 'aero-wing', label: 'Rear Wing' },
  { id: 'chassis-wheel', label: 'Wheel Macro' },
  { id: 'cockpit', label: 'Cockpit' },
];

export const AtelierStudioSection: React.FC<AtelierStudioSectionProps> = ({
  activeLivery,
  onSelectLivery,
  activeCaliper,
  onSelectCaliper,
  aeroPackage,
  onChangeAeroPackage,
  lampsOn,
  onToggleLamps,
  interactiveOrbit,
  onToggleOrbit,
  activePresetId,
  onSelectPreset,
  onOpenReserve,
}) => {
  return (
    <section
      id="atelier"
      data-section="atelier"
      className="relative z-10 min-h-[100svh] flex flex-col justify-between pointer-events-none"
    >
      {/* Top Studio Header & Camera Controls */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="pointer-events-auto flex items-center gap-2.5">
          <span className="border border-hairline bg-tarmac/90 px-3 py-1.5 font-mono text-[10px] tracking-telemetry uppercase text-rosso whitespace-nowrap">
            06 // ATELIER
          </span>
          <button
            type="button"
            onClick={() => {
              gt3Audio.playClick();
              onToggleOrbit();
            }}
            aria-pressed={interactiveOrbit}
            className={`px-3 py-1.5 border font-mono text-[10px] tracking-editorial uppercase flex items-center gap-2 whitespace-nowrap transition-colors ${
              interactiveOrbit
                ? 'border-rosso bg-rosso text-chalk'
                : 'border-hairline bg-tarmac/90 text-chalk hover:border-rosso'
            }`}
          >
            {interactiveOrbit ? <RotateCcw className="w-3 h-3" /> : <Move3d className="w-3 h-3 text-rosso" />}
            <span>{interactiveOrbit ? 'EXIT 360 ORBIT' : 'DRAG 360 ORBIT'}</span>
          </button>
        </div>

        {/* Camera Preset Tabs */}
        <div className="pointer-events-auto flex items-center gap-1 bg-tarmac/90 border border-hairline p-1 overflow-x-auto max-w-full">
          {STUDIO_PRESETS.map((preset) => {
            const isSelected = !interactiveOrbit && activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  gt3Audio.playClick();
                  onSelectPreset(preset.id);
                }}
                className={`px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-chalk text-ink font-medium'
                    : 'text-ash hover:text-chalk'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Open Orbital Inspection Stage */}
      <div className="h-[36svh] sm:h-[42svh] lg:h-[44svh] flex items-center justify-center">
        {interactiveOrbit && (
          <div className="pointer-events-none border border-hairline bg-tarmac/75 px-3 py-1 font-mono text-[10px] tracking-editorial uppercase text-ash">
            DRAG TO ORBIT 360° AROUND {CAMERA_SHOTS[activePresetId]?.label ?? '488 GT3'}
          </div>
        )}
      </div>

      {/* Solid Architectural Configurator Dock */}
      <div className="bg-gunmetal border-t border-hairline px-4 sm:px-8 lg:px-12 py-8 lg:py-10 pointer-events-auto">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-hairline pb-6">
            {/* 01 Exterior Livery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-editorial uppercase text-ash">
                <span>01 // EXTERIOR LACQUER</span>
                <span className="text-rosso">{activeLivery.code}</span>
              </div>
              <div className="font-display text-base font-bold text-chalk">
                {activeLivery.name}
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                {LIVERY_FINISHES.map((liv) => {
                  const isSelected = liv.id === activeLivery.id;
                  return (
                    <button
                      key={liv.id}
                      type="button"
                      aria-label={`Select ${liv.name}`}
                      title={liv.name}
                      onClick={() => {
                        gt3Audio.playClick();
                        onSelectLivery(liv);
                      }}
                      className={`w-8 h-8 border transition-transform relative flex items-center justify-center ${
                        isSelected
                          ? 'border-chalk scale-105 ring-1 ring-rosso ring-offset-2 ring-offset-gunmetal'
                          : 'border-hairline hover:scale-105'
                      }`}
                      style={{ backgroundColor: liv.swatchHex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            liv.id === 'bianco-fuji' || liv.id === 'giallo-modena'
                              ? 'text-ink'
                              : 'text-chalk'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 02 Caliper Finish */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
                02 // CALIPER FINISH
              </span>
              <div className="font-display text-base font-bold text-chalk">
                {activeCaliper.name}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {CALIPER_FINISHES.map((cal) => {
                  const isSelected = cal.id === activeCaliper.id;
                  return (
                    <button
                      key={cal.id}
                      type="button"
                      onClick={() => {
                        gt3Audio.playClick();
                        onSelectCaliper(cal);
                      }}
                      className={`py-2 px-2 border font-mono text-[10px] uppercase transition-colors ${
                        isSelected
                          ? 'border-rosso bg-rosso/15 text-chalk'
                          : 'border-hairline bg-tarmac text-ash hover:text-chalk'
                      }`}
                    >
                      {cal.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 03 Aero Calibration & Lamps */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
                03 // AERO &amp; ENDURANCE SPEC
              </span>
              <div className="font-display text-base font-bold text-chalk">
                {aeroPackage === 'downforce' ? 'Endurance High Downforce' : 'Low-Drag Sprint BoP'}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    gt3Audio.playTurboFlutter();
                    onChangeAeroPackage('downforce');
                  }}
                  className={`flex-1 py-2 px-2 border font-mono text-[10px] uppercase transition-colors ${
                    aeroPackage === 'downforce'
                      ? 'border-chalk bg-chalk text-ink font-medium'
                      : 'border-hairline bg-tarmac text-ash hover:text-chalk'
                  }`}
                >
                  980 KG AERO
                </button>
                <button
                  type="button"
                  onClick={() => {
                    gt3Audio.playTurboFlutter();
                    onChangeAeroPackage('vmax');
                  }}
                  className={`flex-1 py-2 px-2 border font-mono text-[10px] uppercase transition-colors ${
                    aeroPackage === 'vmax'
                      ? 'border-chalk bg-chalk text-ink font-medium'
                      : 'border-hairline bg-tarmac text-ash hover:text-chalk'
                  }`}
                >
                  LOW DRAG
                </button>
                <button
                  type="button"
                  onClick={() => {
                    gt3Audio.playClick();
                    onToggleLamps();
                  }}
                  aria-label="Toggle headlights"
                  aria-pressed={lampsOn}
                  title="Toggle Endurance Lamps"
                  className={`px-3 py-2 border transition-colors ${
                    lampsOn
                      ? 'border-modena bg-modena/20 text-modena'
                      : 'border-hairline bg-tarmac text-ash hover:text-chalk'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 04 Allocation Summary */}
            <div className="flex flex-col justify-between space-y-3">
              <div>
                <span className="font-mono text-[10px] tracking-editorial uppercase text-ash block">
                  04 // CLIENTE CORSE PROGRAM
                </span>
                <p className="font-mono text-xs text-chalk mt-1">
                  CHASSIS ALLOCATION // 2018 SPEC
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  gt3Audio.playClick();
                  onOpenReserve();
                }}
                className="w-full py-3.5 px-5 bg-rosso hover:bg-rossoBright text-chalk font-mono text-xs tracking-[0.18em] uppercase transition-colors flex items-center justify-between"
              >
                <span>Reserve Chassis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] tracking-editorial uppercase text-ash">
            <span>LIVERY: {activeLivery.subtitle}</span>
            <span>HOMOLOGATION: FIA GROUP GT3 // F154CB</span>
          </div>
        </div>
      </div>
    </section>
  );
};

