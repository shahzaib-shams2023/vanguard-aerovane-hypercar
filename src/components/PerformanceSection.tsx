import React, { useState, useEffect } from 'react';
import { Flame, Zap, Gauge, Play, Volume2, ShieldAlert } from 'lucide-react';
import { hypercarAudio } from '../utils/sound';

export const PerformanceSection: React.FC = () => {
  const [rpmLevel, setRpmLevel] = useState<number>(9200);
  const [isSurging, setIsSurging] = useState<boolean>(false);

  const handleThrottleSurge = () => {
    hypercarAudio.playAeroSurge();
    setIsSurging(true);
    setRpmLevel(11000);
    setTimeout(() => {
      setIsSurging(false);
      setRpmLevel(9800);
    }, 800);
  };

  return (
    <section
      id="performance-section"
      className="relative min-h-screen w-full flex flex-col justify-between py-28 px-6 sm:px-10 lg:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Background Monumental Kinetic Velocity Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.045] pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[26vw] font-bold text-vanguard-red tracking-tighter whitespace-nowrap animate-pulse">
          415 KM/H
        </span>
      </div>

      {/* Top Telemetry Header */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase bg-vanguard-panel/90 border border-vanguard-border px-4 py-1.5 rounded-full backdrop-blur pointer-events-auto">
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          <span>CHAPTER 03 // HYPERSONIC NOCTURNAL RUNWAY SEQUENCE</span>
        </div>

        <div className="flex items-center space-x-6 font-mono text-[10px] text-vanguard-muted">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-vanguard-red animate-ping" />
            <span className="text-white font-bold">V-MAX LAUNCH ACTIVE</span>
          </span>
          <span className="text-vanguard-border hidden sm:inline">|</span>
          <span className="text-vanguard-amber hidden sm:inline">800V SILICON CARBIDE INVERTER</span>
        </div>
      </div>

      {/* Center Cinematic Layout */}
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto py-8">
        {/* Left space left open for 3D Car haunches, spinning wheels, & flaming exhaust */}
        <div className="lg:col-span-7 flex flex-col justify-end space-y-4 pointer-events-auto">
          {/* Live High-Speed Speedometer HUD */}
          <div className="carbon-panel p-6 sm:p-8 rounded-3xl border border-vanguard-border/90 max-w-lg backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-vanguard-border/70 pb-3">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono tracking-hyperspeed text-vanguard-muted uppercase block">
                  TERMINAL VELOCITY
                </span>
                <div className="font-display text-4xl sm:text-6xl text-white font-bold tracking-tight">
                  415 <span className="text-vanguard-red text-2xl sm:text-3xl font-mono">KM/H</span>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[9px] font-mono tracking-hyperspeed text-vanguard-muted uppercase block">
                  0–100 SPRINT
                </span>
                <div className="font-display text-2xl sm:text-3xl text-vanguard-cyan font-bold">
                  2.1 SEC
                </div>
              </div>
            </div>

            {/* Tachometer RPM Bar (11,000 RPM) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-[10px]">
                <span className="text-vanguard-muted">NATURALLY ASPIRATED V12 TACHOMETER:</span>
                <span className="text-vanguard-red font-bold">{rpmLevel} RPM</span>
              </div>
              <div className="w-full h-3 bg-vanguard-dark rounded-full overflow-hidden p-0.5 border border-vanguard-border flex gap-1">
                {Array.from({ length: 24 }).map((_, i) => {
                  const pct = i / 24;
                  const isLit = pct <= rpmLevel / 11000;
                  const isRedline = i >= 18;
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded-sm transition-all duration-150 ${
                        isLit
                          ? isRedline
                            ? 'bg-vanguard-red shadow-glow-red animate-pulse'
                            : 'bg-vanguard-cyan'
                          : 'bg-vanguard-panel/60'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Interactive Audio Throttle Trigger */}
            <button
              onClick={handleThrottleSurge}
              data-cursor="THROTTLE"
              className="w-full py-3 rounded-xl bg-vanguard-panel hover:bg-vanguard-red hover:text-white border border-vanguard-border hover:border-vanguard-red text-vanguard-silver font-mono text-xs tracking-telemetry uppercase transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Zap className="w-3.5 h-3.5 text-vanguard-amber" />
              <span>ENGAGE HYBRID ELECTRIC BOOST (+420 BHP)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Powertrain Dossier */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-10 rounded-3xl border border-vanguard-border space-y-6 pointer-events-auto shadow-carbon-panel backdrop-blur-xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-hyperspeed text-vanguard-red uppercase block">
              MOMENT C // HIGH-SPEED PERSPECTIVE WARP
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.92]">
              1,420 BHP <br />
              <span className="text-vanguard-red">Hybrid Fury</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            Mid-mounted 6.5-liter atmospheric V12 paired with tri-axial flux motors. The rear haunches house twin high-velocity titanium exhaust ports that ignite under full throttle, while active rear diffusers channel downforce directly to the asphalt.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">MAX ENGINE REV</span>
              <span className="text-lg text-white font-bold">11,000 RPM</span>
              <span className="text-[9px] text-vanguard-red block">SOLID TAPPETS</span>
            </div>

            <div className="p-3.5 rounded-xl bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">PEAK TORQUE</span>
              <span className="text-lg text-vanguard-cyan font-bold">1,350 NM</span>
              <span className="text-[9px] text-vanguard-cyan block">INSTANTANEOUS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-[1440px] mx-auto w-full border-t border-vanguard-border/70 pt-4 flex flex-wrap items-center justify-between font-mono text-xs text-vanguard-muted">
        <div className="flex items-center space-x-6">
          <span>0–200 KM/H: <strong className="text-white">5.8 SEC</strong></span>
          <span>LATERAL ACCELERATION: <strong className="text-vanguard-cyan">2.4 G (SLICK TIRES)</strong></span>
        </div>
        <div className="text-[10px] text-vanguard-silver uppercase">
          V-MAX ENGINE BENCHMARK // 400+ KM/H LOCKED
        </div>
      </div>
    </section>
  );
};
