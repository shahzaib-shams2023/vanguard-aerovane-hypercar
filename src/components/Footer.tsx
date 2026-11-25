import React from 'react';
import { ArrowUp } from 'lucide-react';
import { CIRCUIT_PALMARES } from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="relative z-10 bg-tarmac border-t border-hairline px-4 sm:px-8 lg:px-12 py-16 text-chalk">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Endurance Palmarès Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 border-b border-hairline pb-12">
          {CIRCUIT_PALMARES.map((item) => (
            <div key={item.event} className="space-y-1.5">
              <span className="font-mono text-[10px] tracking-editorial uppercase text-rosso block">
                {item.year}
              </span>
              <div className="font-display text-lg font-bold uppercase text-chalk">
                {item.event}
              </div>
              <p className="font-mono text-[11px] text-ash">{item.stat}</p>
            </div>
          ))}

          <div className="flex sm:justify-end items-start">
            <button
              type="button"
              onClick={() => {
                gt3Audio.playClick();
                onBackToTop();
              }}
              aria-label="Scroll back to top"
              className="px-4 py-3 border border-hairline bg-gunmetal hover:border-rosso text-chalk font-mono text-[10px] tracking-editorial uppercase flex items-center gap-2 transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-rosso" />
            </button>
          </div>
        </div>

        {/* Colophon & Model Provenance */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="space-y-2">
            <div className="font-display text-base font-bold uppercase tracking-wider text-chalk">
              VANGUARD // 2018 FERRARI 488 GT3 MONOGRAPH
            </div>
            <p className="font-sans text-xs text-ash max-w-xl leading-relaxed">
              Interactive WebGL monograph built around the 2018 Ferrari 488 GT3 real-time geometry. 3D model by amogusstrikesback2 (Sketchfab), licensed under CC-BY-4.0.
            </p>
          </div>

          <div className="font-mono text-[10px] tracking-editorial uppercase text-ash flex flex-wrap gap-x-6 gap-y-2">
            <span>SYNE + INSTRUMENT SERIF</span>
            <span>THREE.JS + ROOMENVIRONMENT</span>
            <span className="text-rosso">© 2026 VANGUARD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
