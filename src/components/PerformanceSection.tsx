import React from 'react';
import { Flame, Zap, Gauge, Cpu } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  return (
    <section
      id="performance-section"
      className="relative min-h-screen w-full flex items-center justify-end py-32 px-4 sm:px-8 lg:px-12 pointer-events-none select-none"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Space left open for 3D Car Rear Haunches */}
        <div className="lg:col-span-7 h-64 lg:h-auto" />

        {/* Right Column: Performance & Powertrain Dossier */}
        <div className="lg:col-span-5 carbon-panel p-8 sm:p-12 rounded-2xl border border-vanguard-border space-y-8 pointer-events-auto shadow-carbon-panel">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-telemetry text-vanguard-red uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>HYBRID POWERTRAIN // 11,000 RPM SYMPHONY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase leading-[0.95]">
              1,420 BHP <br />
              <span className="text-vanguard-red">Hybrid Fury</span>
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-vanguard-muted leading-relaxed font-light">
            A mid-mounted 6.5-liter atmospheric V12 revs freely to 11,000 RPM, paired with tri-axial axial-flux electric motors powered by an 800V silicon-carbide inverter battery pack. Instantaneous torque fill eliminates shift lag.
          </p>

          {/* Powertrain Telemetry Gauges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-vanguard-border font-mono">
            <div className="p-4 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">ENGINE DISPLACEMENT</span>
              <span className="text-xl text-white font-bold">6.5 L V12</span>
              <span className="text-[9px] text-vanguard-red uppercase block">NATURALLY ASPIRATED</span>
            </div>

            <div className="p-4 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">ELECTRIC BOOST</span>
              <span className="text-xl text-vanguard-cyan font-bold">420 BHP</span>
              <span className="text-[9px] text-vanguard-cyan uppercase block">TRI-AXIAL FLUX MOTORS</span>
            </div>

            <div className="p-4 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">TORQUE VECTORING</span>
              <span className="text-xl text-white font-bold">1,350 NM</span>
              <span className="text-[9px] text-vanguard-amber uppercase block">ALL-WHEEL DRIVE</span>
            </div>

            <div className="p-4 rounded bg-vanguard-panel border border-vanguard-border space-y-1">
              <span className="text-[9px] text-vanguard-muted uppercase block">0–200 KM/H SPRINT</span>
              <span className="text-xl text-white font-bold">5.8 SEC</span>
              <span className="text-[9px] text-vanguard-red uppercase block">TELEMETRY BENCHMARK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

