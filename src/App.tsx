import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { CinematicHud } from './components/CinematicHud';
import { PersistentCarCanvas, PAINT_OPTIONS, CarPaintOption } from './components/PersistentCarCanvas';
import { CinematicFilmStage } from './components/CinematicFilmStage';
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

  const scrollToProgress = (p: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll * p, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-vanguard-dark text-vanguard-silver font-sans relative selection:bg-vanguard-red selection:text-white">
      {/* Precision Trailing HUD Cursor */}
      <CustomCursor />

      {/* Persistent Cinematic Director Viewport & Timecode HUD */}
      <CinematicHud scrollProgress={scrollProgress} />

      {/* Central Persistent 3D Sports Car Canvas */}
      <PersistentCarCanvas
        scrollProgress={scrollProgress}
        activePaint={activePaint}
        aeroMode={aeroMode}
      />

      {/* Telemetry Navigation Header */}
      <Navbar
        scrollProgress={scrollProgress}
        onOpenReserve={() => setIsReserveOpen(true)}
        onNavigateTo={scrollToProgress}
      />

      {/* Synchronized Cinematic Film Stage (Chapters 01 to 06) */}
      <CinematicFilmStage
        scrollProgress={scrollProgress}
        activePaint={activePaint}
        onSelectPaint={setActivePaint}
        aeroMode={aeroMode}
        onToggleAeroMode={setAeroMode}
        caliperColor={caliperColor}
        onSelectCaliper={setCaliperColor}
        onOpenReserve={() => setIsReserveOpen(true)}
        onNavigateTo={scrollToProgress}
      />

      {/* Extended scroll track providing Lenis smooth inertia across all 6 cinematic acts */}
      <div className="h-[650vh] pointer-events-none" />

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

