import React, { useEffect, useRef, useState } from 'react';
import { Check, Send, Shield, X } from 'lucide-react';
import { CaliperFinish, LiveryFinish } from '../data/gt3Spec';
import { gt3Audio } from '../utils/sound';

interface ReserveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLivery: LiveryFinish;
  aeroPackage: 'downforce' | 'vmax';
  selectedCaliper: CaliperFinish;
}

export const ReserveDrawer: React.FC<ReserveDrawerProps> = ({
  isOpen,
  onClose,
  selectedLivery,
  aeroPackage,
  selectedCaliper,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [region, setRegion] = useState<string>('monaco');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
      prevFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gt3Audio.playIgnition();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-drawer-title"
    >
      <div
        className="flex-1"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="w-full max-w-lg bg-gunmetal border-l border-hairline h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between focus:outline-none"
      >
        <div className="flex items-start justify-between border-b border-hairline pb-6 gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-telemetry uppercase text-rosso">
              <Shield className="w-3.5 h-3.5" />
              <span>COMPETIZIONE CLIENTI</span>
            </div>
            <h3
              id="reserve-drawer-title"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-chalk"
            >
              Chassis Allocation
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              gt3Audio.playClick();
              onClose();
            }}
            aria-label="Close chassis allocation drawer"
            className="w-10 h-10 border border-hairline bg-tarmac hover:border-rosso text-ash hover:text-chalk flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 my-auto space-y-6">
            <div className="w-12 h-12 border border-rosso bg-rosso/15 flex items-center justify-center text-rosso">
              <Check className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-telemetry uppercase text-rosso block">
                DOSSIER REGISTERED // 488-GT3-2018
              </span>
              <h4 className="font-display text-2xl font-bold uppercase text-chalk">
                Specification Logged
              </h4>
              <p className="font-sans text-sm text-ash leading-relaxed">
                Thank you, {name || 'Collector'}. Our Maranello client liaison will coordinate private track-day logistics and homologation documentation for your configured 488 GT3.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-hairline bg-tarmac hover:border-rosso text-chalk font-mono text-xs tracking-editorial uppercase transition-colors"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-5 flex-1">
            {/* Specification Manifest */}
            <div className="border border-hairline bg-tarmac p-4 space-y-2.5 font-mono text-xs">
              <span className="text-[10px] tracking-editorial uppercase text-ash block border-b border-hairline pb-2">
                CONFIGURED 488 GT3 MANIFEST
              </span>
              <div className="flex justify-between gap-4">
                <span className="text-ash">LACQUER</span>
                <span className="text-rosso font-medium text-right">{selectedLivery.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ash">AERO SETUP</span>
                <span className="text-chalk text-right">
                  {aeroPackage === 'downforce' ? 'ENDURANCE 980 KG' : 'LOW-DRAG SPRINT'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ash">CALIPERS</span>
                <span className="text-chalk text-right">{selectedCaliper.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="patron-name"
                className="font-mono text-[10px] tracking-editorial uppercase text-ash block"
              >
                Patron / Racing Team *
              </label>
              <input
                id="patron-name"
                type="text"
                required
                placeholder="Scuderia Private Client"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-tarmac border border-hairline text-chalk font-mono text-xs focus:outline-none focus:border-rosso"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="patron-email"
                className="font-mono text-[10px] tracking-editorial uppercase text-ash block"
              >
                Confidential Email *
              </label>
              <input
                id="patron-email"
                type="email"
                required
                placeholder="office@team-client.eu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-tarmac border border-hairline text-chalk font-mono text-xs focus:outline-none focus:border-rosso"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="patron-region"
                className="font-mono text-[10px] tracking-editorial uppercase text-ash block"
              >
                Series / Track Jurisdiction
              </label>
              <select
                id="patron-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-tarmac border border-hairline text-chalk font-mono text-xs focus:outline-none focus:border-rosso"
              >
                <option value="monaco">Europe — GT World Challenge / Spa Spec</option>
                <option value="uk">United Kingdom — British GT / Silverstone</option>
                <option value="usa">North America — IMSA GTD / Daytona</option>
                <option value="uae">Middle East — Yas Marina Endurance</option>
                <option value="japan">Asia-Pacific — Suzuka / Bathurst 12H</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-rosso hover:bg-rossoBright text-chalk font-mono text-xs tracking-[0.18em] uppercase transition-colors flex items-center justify-center gap-2.5"
            >
              <span>Transmit Allocation Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="border-t border-hairline pt-4 font-mono text-[10px] tracking-editorial uppercase text-ash flex justify-between">
          <span>VANGUARD COMPETIZIONE</span>
          <span>FIA GT3 ARCHIVE</span>
        </div>
      </div>
    </div>
  );
};
