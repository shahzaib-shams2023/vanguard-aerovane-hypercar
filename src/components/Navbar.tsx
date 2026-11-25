import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { gt3Audio } from '../utils/sound';

export interface NavItem {
  id: string;
  index: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', index: '01', label: 'Stage' },
  { id: 'monograph', index: '02', label: 'Monograph' },
  { id: 'aero', index: '03', label: 'Aerodynamics' },
  { id: 'chassis', index: '04', label: 'Chassis' },
  { id: 'cockpit', index: '05', label: 'Cockpit' },
  { id: 'atelier', index: '06', label: 'Atelier' },
];

interface NavbarProps {
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSectionId,
  onNavigate,
  onOpenReserve,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const next = gt3Audio.toggle();
    setSoundOn(next);
  };

  const handleNavClick = (id: string) => {
    gt3Audio.playClick();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-tarmac/90 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <span className="w-7 h-7 border border-hairline bg-gunmetal flex items-center justify-center font-display text-xs font-bold text-rosso group-hover:border-rosso transition-colors">
            V
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-chalk">
              VANGUARD
            </span>
            <span className="font-mono text-[9px] tracking-editorial uppercase text-ash mt-0.5">
              488 GT3 // 2018
            </span>
          </div>
        </a>

        {/* Desktop Index Navigation */}
        <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-[11px] tracking-[0.16em] uppercase transition-colors flex items-center gap-1.5 py-1 border-b ${
                  isActive
                    ? 'text-chalk border-rosso'
                    : 'text-ash border-transparent hover:text-chalk'
                }`}
              >
                <span className="text-rosso/90">{item.index}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label={soundOn ? 'Mute V8 engine audio' : 'Enable V8 engine audio'}
            title={soundOn ? 'Mute V8 Audio' : 'Ignite V8 Audio'}
            className={`h-9 px-3 border flex items-center gap-2 font-mono text-[10px] tracking-editorial uppercase transition-colors ${
              soundOn
                ? 'border-rosso bg-rosso/15 text-chalk'
                : 'border-hairline bg-gunmetal text-ash hover:text-chalk hover:border-ash'
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-rosso" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundOn ? 'AUDIO ON' : 'AUDIO'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              gt3Audio.playClick();
              onOpenReserve();
            }}
            className="h-9 px-4 sm:px-5 bg-rosso hover:bg-rossoBright text-chalk font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase transition-colors whitespace-nowrap"
          >
            Allocate
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden h-9 w-9 border border-hairline bg-gunmetal flex items-center justify-center text-chalk hover:border-rosso transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile sections"
          className="lg:hidden border-t border-hairline bg-gunmetal px-4 py-4 grid grid-cols-2 gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`p-3 border text-left font-mono text-xs tracking-editorial uppercase flex items-center justify-between ${
                  isActive
                    ? 'border-rosso bg-rosso/10 text-chalk'
                    : 'border-hairline bg-tarmac text-ash'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-rosso">{item.index}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
