import React from 'react';
import { Camera, Film, Activity, Compass, Wind } from 'lucide-react';

interface CinematicHudProps {
  scrollProgress: number;
}

export const CinematicHud: React.FC<CinematicHudProps> = ({ scrollProgress }) => {
  // Determine current cinematic scene
  let sceneIndex = 1;
  let sceneName = 'AWAKENING // ZENITH STANCE';
  let lensSpec = '35MM T1.5 // CINEMATOGRAPHY';

  if (scrollProgress > 0.88) {
    sceneIndex = 6;
    sceneName = 'ATELIER // BESPOKE COMMENCEMENT';
    lensSpec = '35MM T2.0 // STUDIO RIG';
  } else if (scrollProgress > 0.74) {
    sceneIndex = 5;
    sceneName = 'COCKPIT // PILOT FLIGHT DECK';
    lensSpec = '42MM T1.8 // INTERIOR BOROSCOPE';
  } else if (scrollProgress > 0.58) {
    sceneIndex = 4;
    sceneName = 'DISSECTION // T800 MONOCOQUE CAD';
    lensSpec = '50MM T2.8 // ISOMETRIC SCANNER';
  } else if (scrollProgress > 0.36) {
    sceneIndex = 3;
    sceneName = 'HYPERSONIC // NIGHT CIRCUIT RUNWAY';
    lensSpec = '54MM T1.3 // HIGH-SPEED TRACKER';
  } else if (scrollProgress > 0.16) {
    sceneIndex = 2;
    sceneName = 'WIND TUNNEL // CFD SUPERSONIC AERO';
    lensSpec = '26MM T1.4 // MACRO SPLITTER PROBE';
  }

  // Calculate dynamic film timecode
  const totalFrames = Math.round(scrollProgress * 1440);
  const minutes = String(Math.floor(totalFrames / 1800)).padStart(2, '0');
  const seconds = String(Math.floor((totalFrames % 1800) / 30)).padStart(2, '0');
  const frames = String(totalFrames % 30).padStart(2, '0');
  const timecode = `00:${minutes}:${seconds}:${frames}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* Top Cinematic Scene Metadata */}
      <div className="absolute top-16 left-6 sm:left-12 flex items-center space-x-3 text-[10px] font-mono text-vanguard-muted/80 tracking-telemetry uppercase">
        <span className="flex items-center space-x-1.5 text-vanguard-red">
          <span className="w-1.5 h-1.5 rounded-full bg-vanguard-red animate-pulse" />
          <span>REC</span>
        </span>
        <span className="text-vanguard-border">|</span>
        <span className="text-vanguard-silver font-medium">{timecode}</span>
        <span className="text-vanguard-border hidden md:inline">|</span>
        <span className="text-vanguard-silver hidden md:inline">{lensSpec}</span>
      </div>

      {/* Top Right Scene Indicator */}
      <div className="absolute top-16 right-6 sm:right-12 flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-muted/80 uppercase">
        <span className="text-vanguard-red font-bold">ACT 0{sceneIndex}</span>
        <span className="text-vanguard-border">/</span>
        <span className="text-vanguard-silver hidden sm:inline">{sceneName}</span>
      </div>

      {/* Left Vertical Chapter Indicator Line */}
      <div className="hidden lg:flex flex-col items-center absolute left-6 top-1/2 -translate-y-1/2 space-y-3 font-mono text-[9px] text-vanguard-muted/60">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const isActive = num === sceneIndex;
          return (
            <div key={num} className="flex items-center space-x-2 group">
              <span
                className={`w-1 transition-all duration-300 rounded-full ${
                  isActive ? 'h-6 bg-vanguard-red' : 'h-1.5 bg-vanguard-border'
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  isActive ? 'text-vanguard-red font-bold' : 'opacity-40'
                }`}
              >
                0{num}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Horizontal Film Progress Rail */}
      <div className="absolute bottom-3 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-[9px] font-mono text-vanguard-muted/70">
        <div className="flex items-center space-x-3">
          <span className="text-vanguard-red uppercase font-bold tracking-telemetry">
            SCROLL CHOREOGRAPHY:
          </span>
          <span className="text-vanguard-silver">{Math.round(scrollProgress * 100)}%</span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="flex-1 mx-6 h-0.5 bg-vanguard-border/50 rounded-full overflow-hidden hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-vanguard-red via-vanguard-cyan to-vanguard-red transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline text-vanguard-muted">INTERACTIVE 3D PERSISTENT ENGINE</span>
          <span className="text-vanguard-cyan">FPS: 60 LOCKED</span>
        </div>
      </div>
    </div>
  );
};

