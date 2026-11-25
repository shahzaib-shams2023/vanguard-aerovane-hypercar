import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AERO_ZONES,
  CALIPER_FINISHES,
  CaliperFinish,
  LIVERY_FINISHES,
  LiveryFinish,
} from './data/gt3Spec';
import { Ferrari488Stage } from './components/Ferrari488Stage';
import { Navbar } from './components/Navbar';
import { HeroStage } from './components/HeroStage';
import { MonographSection } from './components/MonographSection';
import { AeroInspectionSection } from './components/AeroInspectionSection';
import { ChassisMacroSection } from './components/ChassisMacroSection';
import { CockpitDeckSection } from './components/CockpitDeckSection';
import { AtelierStudioSection } from './components/AtelierStudioSection';
import { ReserveDrawer } from './components/ReserveDrawer';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const lenisRef = useRef<Lenis | null>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [activeAeroId, setActiveAeroId] = useState<string>(AERO_ZONES[0].id);
  const [aeroCameraId, setAeroCameraId] = useState<string>(AERO_ZONES[0].cameraId);
  const [atelierPresetId, setAtelierPresetId] = useState<string>('atelier');
  const [interactiveOrbit, setInteractiveOrbit] = useState<boolean>(false);

  const [activeLivery, setActiveLivery] = useState<LiveryFinish>(LIVERY_FINISHES[0]);
  const [activeCaliper, setActiveCaliper] = useState<CaliperFinish>(CALIPER_FINISHES[0]);
  const [aeroPackage, setAeroPackage] = useState<'downforce' | 'vmax'>('downforce');
  const [lampsOn, setLampsOn] = useState<boolean>(false);
  const [wheelSpeed, setWheelSpeed] = useState<number>(0);
  const [isReserveOpen, setIsReserveOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Sync Lenis + GSAP ScrollTrigger + prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onMotionChange);

    let lenis: Lenis | null = null;
    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (!mediaQuery.matches) {
      lenis = new Lenis({
        lerp: 0.095,
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      sections.forEach((sec) => {
        const id = sec.dataset.section || 'hero';
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 52%',
          end: 'bottom 48%',
          onEnter: () => setActiveSectionId(id),
          onEnterBack: () => setActiveSectionId(id),
        });
      });
    });

    return () => {
      ctx.revert();
      mediaQuery.removeEventListener('change', onMotionChange);
      if (lenis) {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Automatically release interactive 360 orbit when user scrolls away from Atelier
  useEffect(() => {
    if (activeSectionId !== 'atelier' && interactiveOrbit) {
      setInteractiveOrbit(false);
    }
  }, [activeSectionId, interactiveOrbit]);

  // Compute the authoritative 3D camera shot for the active section
  const resolvedShotId = (() => {
    switch (activeSectionId) {
      case 'hero':
        return 'hero';
      case 'monograph':
        return 'monograph';
      case 'aero':
        return aeroCameraId;
      case 'chassis':
        return 'chassis-wheel';
      case 'cockpit':
        return 'cockpit';
      case 'atelier':
        return atelierPresetId;
      default:
        return 'hero';
    }
  })();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  return (
    <div className="min-h-screen bg-tarmac text-chalk relative">
      {/* Persistent Real-Time 2018 Ferrari 488 GT3 WebGL Stage */}
      <Ferrari488Stage
        activeShotId={resolvedShotId}
        activeLivery={activeLivery}
        activeCaliper={activeCaliper}
        lampsOn={lampsOn}
        wheelSpinSpeed={activeSectionId === 'chassis' ? wheelSpeed : 0}
        interactiveOrbit={activeSectionId === 'atelier' && interactiveOrbit}
        reducedMotion={reducedMotion}
      />

      {/* Top Architectural Navigation */}
      <Navbar
        activeSectionId={activeSectionId}
        onNavigate={scrollToSection}
        onOpenReserve={() => setIsReserveOpen(true)}
      />

      {/* Semantic Document Chapters */}
      <main>
        <HeroStage
          onExplore={() => scrollToSection('monograph')}
          onOpenReserve={() => setIsReserveOpen(true)}
        />

        <MonographSection />

        <AeroInspectionSection
          activeAeroId={activeAeroId}
          onSelectAero={(zoneId, cameraId) => {
            setActiveAeroId(zoneId);
            setAeroCameraId(cameraId);
          }}
        />

        <ChassisMacroSection
          activeCaliper={activeCaliper}
          onSelectCaliper={setActiveCaliper}
          wheelSpeed={wheelSpeed}
          onChangeWheelSpeed={setWheelSpeed}
        />

        <CockpitDeckSection
          lampsOn={lampsOn}
          onToggleLamps={() => setLampsOn((prev) => !prev)}
        />

        <AtelierStudioSection
          activeLivery={activeLivery}
          onSelectLivery={setActiveLivery}
          activeCaliper={activeCaliper}
          onSelectCaliper={setActiveCaliper}
          aeroPackage={aeroPackage}
          onChangeAeroPackage={setAeroPackage}
          lampsOn={lampsOn}
          onToggleLamps={() => setLampsOn((prev) => !prev)}
          interactiveOrbit={interactiveOrbit}
          onToggleOrbit={() => setInteractiveOrbit((prev) => !prev)}
          activePresetId={atelierPresetId}
          onSelectPreset={(shotId) => {
            setInteractiveOrbit(false);
            setAtelierPresetId(shotId);
          }}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </main>

      <Footer onBackToTop={() => scrollToSection('hero')} />

      <ReserveDrawer
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        selectedLivery={activeLivery}
        aeroPackage={aeroPackage}
        selectedCaliper={activeCaliper}
      />
    </div>
  );
}

export default App;
