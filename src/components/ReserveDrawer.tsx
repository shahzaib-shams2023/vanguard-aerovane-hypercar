import React, { useState } from 'react';
import { X, Check, Shield, Send, Sparkles } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';
import { CarPaintOption } from './PersistentCarCanvas';

interface ReserveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPaint: CarPaintOption;
  aeroMode: string;
  caliperColor: string;
}

export const ReserveDrawer: React.FC<ReserveDrawerProps> = ({
  isOpen,
  onClose,
  selectedPaint,
  aeroMode,
  caliperColor,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [region, setRegion] = useState<string>('monaco');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hypercarAudio.playIgnition();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-xl bg-vanguard-surface h-full shadow-2xl border-l border-vanguard-border flex flex-col justify-between overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-vanguard-border pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>PRIVATE CHASSIS ALLOCATION REQUEST</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white uppercase">
              Atelier Vanguard
            </h3>
          </div>
          <button
            onClick={() => {
              hypercarAudio.playClick();
              onClose();
            }}
            data-cursor="CLOSE"
            className="p-3 rounded bg-vanguard-panel hover:bg-vanguard-red text-vanguard-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="py-16 text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-vanguard-red/20 border border-vanguard-red flex items-center justify-center mx-auto text-vanguard-red">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-telemetry text-vanguard-red block">
                ALLOCATION ENCRYPTED // REF: VGD-V12-008
              </span>
              <h4 className="font-display text-2xl text-white uppercase">
                Dossier Received
              </h4>
              <p className="font-sans text-xs sm:text-sm text-vanguard-muted max-w-md mx-auto leading-relaxed">
                Thank you, {name || 'esteemed collector'}. The Vanguard Private Client team will contact your representative within 24 hours to arrange wind-tunnel telemetry and factory track testing.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded bg-vanguard-panel border border-vanguard-border text-white font-mono text-xs tracking-telemetry uppercase hover:border-vanguard-red transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-8 space-y-6 flex-1">
            {/* Selected Spec Summary */}
            <div className="p-4 rounded-xl bg-vanguard-panel border border-vanguard-border space-y-2 font-mono text-xs">
              <span className="text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
                CURRENT SPECIFICATION MANIFEST
              </span>
              <div className="flex justify-between text-vanguard-silver">
                <span>LIVERY LACQUER:</span>
                <span className="text-vanguard-red font-bold">{selectedPaint.name}</span>
              </div>
              <div className="flex justify-between text-vanguard-silver">
                <span>AERO CALIBRATION:</span>
                <span className="text-white font-bold">{aeroMode.toUpperCase()} MODE</span>
              </div>
              <div className="flex justify-between text-vanguard-silver">
                <span>BRAKE CALIPERS:</span>
                <span className="text-white font-bold">{caliperColor}</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
                COLLECTOR / PATRON NAME *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Michael Andretti / Scuderia Client"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded bg-vanguard-panel border border-vanguard-border text-white font-mono text-xs focus:outline-none focus:border-vanguard-red"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
                CONFIDENTIAL EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                placeholder="client@privateoffice.mc"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-vanguard-panel border border-vanguard-border text-white font-mono text-xs focus:outline-none focus:border-vanguard-red"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-telemetry text-vanguard-muted uppercase block">
                PRIMARY HOMOLOGATION REGION
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 rounded bg-vanguard-panel border border-vanguard-border text-white font-mono text-xs focus:outline-none focus:border-vanguard-red"
              >
                <option value="monaco">Monaco / Western Europe (EU Spec)</option>
                <option value="uk">United Kingdom (Silverstone Track Spec)</option>
                <option value="usa">United States (DOT & Track Exemption)</option>
                <option value="uae">United Arab Emirates / Gulf Coast Spec</option>
                <option value="japan">Japan / Fuji Speedway Spec</option>
              </select>
            </div>

            <button
              type="submit"
              data-cursor="TRANSMIT"
              className="w-full py-4 rounded bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-xs tracking-telemetry uppercase transition-all shadow-glow-red flex items-center justify-center space-x-2 mt-4"
            >
              <span>TRANSMIT CHASSIS RESERVATION</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="border-t border-vanguard-border pt-4 text-[10px] font-mono text-vanguard-muted flex justify-between items-center">
          <span>VANGUARD SPECIAL VEHICLES DIVISION</span>
          <span>STRICT CLIENT SECRECY</span>
        </div>
      </div>
    </div>
  );
};

