import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { PersistentCarCanvas, PAINT_OPTIONS, CarPaintOption } from './components/PersistentCarCanvas';
import { HeroSection } from './components/HeroSection';
import { DesignSection } from './components/DesignSection';
import { PerformanceSection } from './components/PerformanceSection';
import { EngineeringSection } from './components/EngineeringSection';
import { CockpitSection } from './components/CockpitSection';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { Footer } from './components/Footer';
import { ReserveDrawer } from './components/ReserveDrawer';

export function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activePaint, setActivePaint] = useState<CarPaintOption>(PAINT_OPTIONS[0]);
  const [aeroMode, setAeroMode] = useState<'downforce' | 'vmax'>('downforce');
  const [caliperColor, setCaliperColor] = useState<string>('ROSSO CORSA');
  const [isReserveOpen, setIsReserveOpen] = useState<boolean>(false);

  useEffect(() => {
    // Lenis Smooth Inertia Scrolling
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        setScrollProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-vanguard-dark text-vanguard-silver font-sans relative selection:bg-vanguard-red selection:text-white">
      {/* Precision Trailing HUD Cursor */}
      <CustomCursor />

      {/* Central Persistent 3D Sports Car Canvas */}
      <PersistentCarCanvas
        scrollProgress={scrollProgress}
        activePaint={activePaint}
      />

      {/* Telemetry Navigation Header */}
      <Navbar
        scrollProgress={scrollProgress}
        onOpenReserve={() => setIsReserveOpen(true)}
      />

      {/* DOM Narrative Content (Layered over the 3D Sports Car Canvas) */}
      <main id="main-content" className="relative z-10">
        {/* Section 01: Hero Zenith Stance */}
        <HeroSection
          onExplore={() => scrollToSection('design-section')}
          onOpenReserve={() => setIsReserveOpen(true)}
        />

        {/* Section 02: Computational Fluid Dynamics (Design) */}
        <DesignSection />

        {/* Section 03: Hybrid Powertrain & Velocity (Performance) */}
        <PerformanceSection />

        {/* Section 04: Monocoque Chassis Architecture (Engineering) */}
        <EngineeringSection />

        {/* Section 05: Driver Enclosure & Ergonomics (Cockpit) */}
        <CockpitSection />

        {/* Section 06: Runway Finale & Atelier Configurator */}
        <ConfiguratorSection
          activePaint={activePaint}
          onSelectPaint={setActivePaint}
          aeroMode={aeroMode}
          onToggleAeroMode={setAeroMode}
          caliperColor={caliperColor}
          onSelectCaliper={setCaliperColor}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </main>

      {/* Track Telemetry Colophon */}
      <Footer />

      {/* Chassis Allocation Drawer */}
      <ReserveDrawer
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        selectedPaint={activePaint}
        aeroMode={aeroMode}
        caliperColor={caliperColor}
      />
    </div>
  );
}

export default App;

