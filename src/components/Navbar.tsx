import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Gauge, Shield, Compass, ChevronRight } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

interface NavbarProps {
  scrollProgress: number;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress, onOpenReserve }) => {
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [speedKmh, setSpeedKmh] = useState<number>(0);

  useEffect(() => {
    // Speed telemetry scales with scroll
    const simulatedSpeed = Math.round(scrollProgress * 415);
    setSpeedKmh(simulatedSpeed);
  }, [scrollProgress]);

  const handleToggleSound = () => {
    const active = hypercarAudio.toggle();
    setAudioActive(active);
  };

  const scrollTo = (id: string) => {
    hypercarAudio.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 carbon-panel border-b border-vanguard-border/80 transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center space-x-6">
          <a
            href="#hero-section"
            data-cursor="VANGUARD"
            className="flex items-center space-x-3 group"
          >
            <div className="w-8 h-8 rounded border border-vanguard-border flex items-center justify-center bg-vanguard-dark group-hover:border-vanguard-red transition-colors">
              <span className="font-display text-xs font-bold text-vanguard-red">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wider text-vanguard-silver font-bold leading-none">
                VANGUARD
              </span>
              <span className="font-mono text-[9px] tracking-telemetry text-vanguard-muted uppercase pt-0.5">
                AEROVANE V12 // 01
              </span>
            </div>
          </a>

          {/* Speed & Gear Telemetry (Desktop) */}
          <div className="hidden xl:flex items-center space-x-6 pl-6 border-l border-vanguard-border font-mono text-[10px] text-vanguard-muted">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-vanguard-red animate-pulse" />
              <span className="uppercase text-vanguard-silver font-medium">VELOCITY:</span>
              <span className="text-vanguard-red font-bold text-xs">{speedKmh} KM/H</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="uppercase text-vanguard-silver font-medium">DOWNFORCE:</span>
              <span className="text-vanguard-silver">{Math.round(scrollProgress * 980)} KG</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="uppercase text-vanguard-silver font-medium">STATUS:</span>
              <span className="text-vanguard-cyan">GROUND EFFECT ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 font-mono text-[10px] tracking-telemetry uppercase text-vanguard-muted">
          <button
            onClick={() => scrollTo('design-section')}
            data-cursor="INSPECT"
            className="hover:text-vanguard-red transition-colors"
          >
            [01 // AERO]
          </button>
          <button
            onClick={() => scrollTo('performance-section')}
            data-cursor="VELOCITY"
            className="hover:text-vanguard-red transition-colors"
          >
            [02 // POWERTRAIN]
          </button>
          <button
            onClick={() => scrollTo('engineering-section')}
            data-cursor="CHASSIS"
            className="hover:text-vanguard-red transition-colors"
          >
            [03 // CHASSIS]
          </button>
          <button
            onClick={() => scrollTo('cockpit-section')}
            data-cursor="COCKPIT"
            className="hover:text-vanguard-red transition-colors"
          >
            [04 // CABIN]
          </button>
          <button
            onClick={() => scrollTo('configurator-section')}
            data-cursor="BUILD"
            className="hover:text-vanguard-red transition-colors"
          >
            [05 // ATELIER]
          </button>
        </nav>

        {/* Right CTA & Sound Control */}
        <div className="flex items-center space-x-4">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor={audioActive ? 'MUTE V12' : 'IGNITE V12'}
            title={audioActive ? 'Mute Powertrain Audio' : 'Ignite V12 Soundscape'}
            className={`p-2 rounded border transition-all ${
              audioActive
                ? 'bg-vanguard-red text-white border-vanguard-red shadow-glow-red'
                : 'bg-vanguard-panel border-vanguard-border text-vanguard-muted hover:border-vanguard-red'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Reserve Build CTA */}
          <button
            onClick={() => {
              hypercarAudio.playClick();
              onOpenReserve();
            }}
            data-cursor="ALLOCATE"
            className="px-4 sm:px-6 py-2 rounded bg-vanguard-red hover:bg-vanguard-redGlow text-white font-mono text-[10px] tracking-telemetry uppercase transition-all shadow-glow-red active:scale-95 whitespace-nowrap"
          >
            RESERVE BUILD
          </button>
        </div>
      </div>
    </header>
  );
};

