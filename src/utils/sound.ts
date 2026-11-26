// Physically-informed Web Audio DSP synthesizer for the 2018 Ferrari 488 GT3 (F154CB 3.9L Flat-Plane Twin-Turbo V8)
// Combines custom cylinder-firing PeriodicWave harmonics, dual-bank detune, tanh waveshaping,
// formant exhaust filtering, pink-noise intake turbulence, turbo spool, wastegate flutter, and starter crank.

type AudioListener = (active: boolean) => void;

function createTanhCurve(drive: number): Float32Array<ArrayBuffer> {
  const samples = 2048;
  const buffer = new ArrayBuffer(samples * Float32Array.BYTES_PER_ELEMENT);
  const curve = new Float32Array(buffer);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(x * drive) / Math.tanh(drive);
  }
  return curve;
}

function createPinkNoiseBuffer(ctx: AudioContext, durationSec = 3): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Paul Kellet's refined pink-noise filter
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
    b6 = white * 0.115926;
    data[i] = Math.max(-1, Math.min(1, pink));
  }
  return buffer;
}

function createFlatPlaneV8Wave(ctx: AudioContext): PeriodicWave {
  // Harmonics shaped for 180-deg flat-plane V8: warm fundamental, strong 2nd/3rd/4th orders, rolled-off highs
  const real = new Float32Array(13);
  const imag = new Float32Array([
    0.0,   // DC
    0.95,  // 1st order (firing frequency)
    0.72,  // 2nd order (octave bite)
    0.46,  // 3rd order (metallic midrange snarl)
    0.34,  // 4th order (exhaust harmonic)
    0.20,  // 5th
    0.14,  // 6th
    0.08,  // 7th
    0.05,  // 8th
    0.03,  // 9th
    0.02,  // 10th
    0.01,  // 11th
    0.006, // 12th
  ]);
  return ctx.createPeriodicWave(real, imag, { disableNormalization: false });
}

class Gt3AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted = true;
  private listeners = new Set<AudioListener>();

  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private engineWave: PeriodicWave | null = null;

  // Continuous engine graph nodes
  private oscSub: OscillatorNode | null = null;
  private oscBankA: OscillatorNode | null = null;
  private oscBankB: OscillatorNode | null = null;
  private idleLopeOsc: OscillatorNode | null = null;
  private idleLopeGain: GainNode | null = null;

  private exhaustShaper: WaveShaperNode | null = null;
  private exhaustFormant: BiquadFilterNode | null = null;
  private turbineLowpass: BiquadFilterNode | null = null;
  private engineMixGain: GainNode | null = null;

  private intakeNoiseSrc: AudioBufferSourceNode | null = null;
  private intakeFilter: BiquadFilterNode | null = null;
  private intakeGain: GainNode | null = null;

  private turboOsc: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;

  private currentLoad = 0.08;
  private flareUntil = 0;

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(!this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const active = !this.isMuted;
    this.listeners.forEach((cb) => cb(active));
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    if (!this.masterGain) {
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -16;
      compressor.knee.value = 18;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.18;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.42;

      this.masterGain.connect(compressor);
      compressor.connect(this.ctx.destination);
    }
    if (!this.noiseBuffer) {
      this.noiseBuffer = createPinkNoiseBuffer(this.ctx, 3);
    }
    if (!this.engineWave) {
      this.engineWave = createFlatPlaneV8Wave(this.ctx);
    }
    return this.ctx;
  }

  public toggle(): boolean {
    const ctx = this.ensureContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startEngineGraph(ctx);
      this.playIgnition();
    } else {
      this.stopEngineGraph(ctx);
    }
    this.notify();
    return !this.isMuted;
  }

  public isSoundActive(): boolean {
    return !this.isMuted;
  }

  private startEngineGraph(ctx: AudioContext): void {
    if (this.oscBankA || !this.masterGain || !this.engineWave || !this.noiseBuffer) return;
    try {
      const now = ctx.currentTime;

      // Engine output envelope (fades in smoothly after starter catch)
      this.engineMixGain = ctx.createGain();
      this.engineMixGain.gain.setValueAtTime(0.0001, now);
      this.engineMixGain.gain.linearRampToValueAtTime(0.28, now + 0.35);

      // Sub-harmonic chest weight (half-order crank thrum)
      this.oscSub = ctx.createOscillator();
      this.oscSub.type = 'triangle';
      const subGain = ctx.createGain();
      subGain.gain.value = 0.42;

      // Dual-bank flat-plane V8 oscillators (slight detune for twin-header shimmer)
      this.oscBankA = ctx.createOscillator();
      this.oscBankA.setPeriodicWave(this.engineWave);
      const bankAGain = ctx.createGain();
      bankAGain.gain.value = 0.55;

      this.oscBankB = ctx.createOscillator();
      this.oscBankB.setPeriodicWave(this.engineWave);
      const bankBGain = ctx.createGain();
      bankBGain.gain.value = 0.52;

      // Subtle camshaft idle lope (~3.4 Hz organic breathing)
      this.idleLopeOsc = ctx.createOscillator();
      this.idleLopeOsc.type = 'sine';
      this.idleLopeOsc.frequency.value = 3.4;
      this.idleLopeGain = ctx.createGain();
      this.idleLopeGain.gain.value = 2.6;
      this.idleLopeOsc.connect(this.idleLopeGain);
      this.idleLopeGain.connect(this.oscBankA.frequency);
      this.idleLopeGain.connect(this.oscBankB.frequency);

      // Exhaust saturation + resonant header body + turbine high-cut
      this.exhaustShaper = ctx.createWaveShaper();
      this.exhaustShaper.curve = createTanhCurve(2.4);
      this.exhaustShaper.oversample = '4x';

      const chestShelf = ctx.createBiquadFilter();
      chestShelf.type = 'lowshelf';
      chestShelf.frequency.value = 125;
      chestShelf.gain.value = 7.5;

      this.exhaustFormant = ctx.createBiquadFilter();
      this.exhaustFormant.type = 'peaking';
      this.exhaustFormant.frequency.value = 460;
      this.exhaustFormant.Q.value = 1.6;
      this.exhaustFormant.gain.value = 5.5;

      this.turbineLowpass = ctx.createBiquadFilter();
      this.turbineLowpass.type = 'lowpass';
      this.turbineLowpass.frequency.value = 620;
      this.turbineLowpass.Q.value = 0.85;

      this.oscSub.connect(subGain);
      this.oscBankA.connect(bankAGain);
      this.oscBankB.connect(bankBGain);

      subGain.connect(this.exhaustShaper);
      bankAGain.connect(this.exhaustShaper);
      bankBGain.connect(this.exhaustShaper);

      this.exhaustShaper.connect(chestShelf);
      chestShelf.connect(this.exhaustFormant);
      this.exhaustFormant.connect(this.turbineLowpass);
      this.turbineLowpass.connect(this.engineMixGain);
      this.engineMixGain.connect(this.masterGain);

      // Air intake & exhaust turbulence pink-noise layer
      this.intakeNoiseSrc = ctx.createBufferSource();
      this.intakeNoiseSrc.buffer = this.noiseBuffer;
      this.intakeNoiseSrc.loop = true;

      this.intakeFilter = ctx.createBiquadFilter();
      this.intakeFilter.type = 'bandpass';
      this.intakeFilter.frequency.value = 340;
      this.intakeFilter.Q.value = 1.2;

      this.intakeGain = ctx.createGain();
      this.intakeGain.gain.value = 0.14;

      this.intakeNoiseSrc.connect(this.intakeFilter);
      this.intakeFilter.connect(this.intakeGain);
      this.intakeGain.connect(this.masterGain);

      // Subtle twin-turbo spool whistle (quiet until RPM climbs)
      this.turboOsc = ctx.createOscillator();
      this.turboOsc.type = 'sine';
      this.turboOsc.frequency.value = 1850;
      this.turboGain = ctx.createGain();
      this.turboGain.gain.value = 0.0;
      this.turboOsc.connect(this.turboGain);
      this.turboGain.connect(this.masterGain);

      this.applyRpmParameters(ctx, this.currentLoad);

      this.oscSub.start(now);
      this.oscBankA.start(now);
      this.oscBankB.start(now);
      this.idleLopeOsc.start(now);
      this.intakeNoiseSrc.start(now);
      this.turboOsc.start(now);
    } catch {
      // Ignore autoplay restriction errors
    }
  }

  private stopEngineGraph(ctx: AudioContext): void {
    const now = ctx.currentTime;
    try {
      this.engineMixGain?.gain.setTargetAtTime(0.0001, now, 0.04);
      this.intakeGain?.gain.setTargetAtTime(0.0001, now, 0.04);
      this.turboGain?.gain.setTargetAtTime(0.0001, now, 0.04);
    } catch {
      // Safe ramp
    }

    const nodes = [
      this.oscSub,
      this.oscBankA,
      this.oscBankB,
      this.idleLopeOsc,
      this.intakeNoiseSrc,
      this.turboOsc,
    ];
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n?.stop();
          n?.disconnect();
        } catch {
          // Ignore already stopped
        }
      });
    }, 120);

    this.oscSub = null;
    this.oscBankA = null;
    this.oscBankB = null;
    this.idleLopeOsc = null;
    this.idleLopeGain = null;
    this.exhaustShaper = null;
    this.exhaustFormant = null;
    this.turbineLowpass = null;
    this.engineMixGain = null;
    this.intakeNoiseSrc = null;
    this.intakeFilter = null;
    this.intakeGain = null;
    this.turboOsc = null;
    this.turboGain = null;
  }

  private applyRpmParameters(ctx: AudioContext, load: number): void {
    if (!this.oscBankA || !this.oscBankB || !this.oscSub) return;
    const now = ctx.currentTime;
    if (now < this.flareUntil) return; // Let ignition flare finish naturally

    const clamped = Math.max(0, Math.min(1, load));
    // Map normalized load [0..1] to 1,650 RPM idle -> 6,900 RPM FIA GT3 peak
    const rpm = 1650 + clamped * 5250;
    // Flat-plane V8 firing frequency = (RPM / 60) * 4 = RPM / 15
    const firingHz = rpm / 15;

    this.oscBankA.frequency.setTargetAtTime(firingHz, now, 0.09);
    this.oscBankB.frequency.setTargetAtTime(firingHz * 1.0045, now, 0.09);
    this.oscSub.frequency.setTargetAtTime(firingHz * 0.5, now, 0.09);

    // Idle lope fades out once under load
    this.idleLopeGain?.gain.setTargetAtTime(Math.max(0.2, (1 - clamped * 2.5) * 2.8), now, 0.12);

    // Open turbine lowpass & raise exhaust formant with RPM
    this.exhaustFormant?.frequency.setTargetAtTime(420 + clamped * 1100, now, 0.1);
    this.turbineLowpass?.frequency.setTargetAtTime(560 + clamped * 2350, now, 0.1);

    // Intake airflow rush
    this.intakeFilter?.frequency.setTargetAtTime(300 + clamped * 1800, now, 0.1);
    this.intakeGain?.gain.setTargetAtTime(0.11 + clamped * 0.24, now, 0.1);

    // Subtle twin-turbo spool above 2,800 RPM
    if (clamped > 0.22) {
      const spool = (clamped - 0.22) / 0.78;
      this.turboOsc?.frequency.setTargetAtTime(1950 + spool * 2300, now, 0.12);
      this.turboGain?.gain.setTargetAtTime(spool * 0.022, now, 0.12);
    } else {
      this.turboGain?.gain.setTargetAtTime(0.0, now, 0.12);
    }
  }

  public updateRpm(normalizedLoad: number): void {
    this.currentLoad = normalizedLoad;
    if (this.isMuted || !this.ctx) return;
    try {
      this.applyRpmParameters(this.ctx, normalizedLoad);
    } catch {
      // Ignore
    }
  }

  // GT3 Race Starter Crank -> Throttle Flare -> Settle to 1,650 RPM Idle
  public playIgnition(): void {
    if (this.isMuted || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    try {
      const ctx = this.ctx;
      const now = ctx.currentTime;
      this.flareUntil = now + 1.15;

      // 1. Starter motor solenoid & crank cadence (0 - 0.26s)
      const crankOsc = ctx.createOscillator();
      const crankGain = ctx.createGain();
      crankOsc.type = 'triangle';
      crankOsc.frequency.setValueAtTime(195, now);
      crankOsc.frequency.linearRampToValueAtTime(240, now + 0.24);
      crankGain.gain.setValueAtTime(0.06, now);
      crankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      crankOsc.connect(crankGain);
      crankGain.connect(this.masterGain);
      crankOsc.start(now);
      crankOsc.stop(now + 0.28);

      // 2. Exhaust bark noise burst on fire-up (0.22s - 0.65s)
      const barkSrc = ctx.createBufferSource();
      barkSrc.buffer = this.noiseBuffer;
      const barkFilter = ctx.createBiquadFilter();
      barkFilter.type = 'bandpass';
      barkFilter.frequency.setValueAtTime(280, now + 0.2);
      barkFilter.frequency.exponentialRampToValueAtTime(980, now + 0.36);
      barkFilter.frequency.exponentialRampToValueAtTime(340, now + 0.9);
      barkFilter.Q.value = 1.1;

      const barkGain = ctx.createGain();
      barkGain.gain.setValueAtTime(0.0001, now);
      barkGain.gain.linearRampToValueAtTime(0.32, now + 0.26);
      barkGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      barkSrc.connect(barkFilter);
      barkFilter.connect(barkGain);
      barkGain.connect(this.masterGain);
      barkSrc.start(now);
      barkSrc.stop(now + 1.05);

      // 3. Flare main V8 oscillators up to ~3,900 RPM (260 Hz) then drop to idle (110 Hz)
      if (this.oscBankA && this.oscBankB && this.oscSub) {
        const idleHz = (1650 + this.currentLoad * 5250) / 15;
        const flareHz = 265;

        this.oscBankA.frequency.cancelScheduledValues(now);
        this.oscBankB.frequency.cancelScheduledValues(now);
        this.oscSub.frequency.cancelScheduledValues(now);

        this.oscBankA.frequency.setValueAtTime(55, now);
        this.oscBankA.frequency.exponentialRampToValueAtTime(flareHz, now + 0.32);
        this.oscBankA.frequency.exponentialRampToValueAtTime(idleHz, now + 1.1);

        this.oscBankB.frequency.setValueAtTime(55.3, now);
        this.oscBankB.frequency.exponentialRampToValueAtTime(flareHz * 1.0045, now + 0.32);
        this.oscBankB.frequency.exponentialRampToValueAtTime(idleHz * 1.0045, now + 1.1);

        this.oscSub.frequency.setValueAtTime(27.5, now);
        this.oscSub.frequency.exponentialRampToValueAtTime(flareHz * 0.5, now + 0.32);
        this.oscSub.frequency.exponentialRampToValueAtTime(idleHz * 0.5, now + 1.1);

        this.turbineLowpass?.frequency.setValueAtTime(400, now);
        this.turbineLowpass?.frequency.exponentialRampToValueAtTime(2100, now + 0.34);
        this.turbineLowpass?.frequency.exponentialRampToValueAtTime(620, now + 1.1);
      }
    } catch {
      // Ignore
    }
  }

  // Pneumatic Compressor Surge / Wastegate Flutter ("Stu-tu-tu")
  public playTurboFlutter(): void {
    if (this.isMuted || !this.ctx || !this.masterGain || !this.noiseBuffer) return;
    try {
      const ctx = this.ctx;
      const now = ctx.currentTime;

      const flutterSrc = ctx.createBufferSource();
      flutterSrc.buffer = this.noiseBuffer;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2400, now);
      bp.frequency.exponentialRampToValueAtTime(1050, now + 0.42);
      bp.Q.value = 3.2;

      const gate = ctx.createGain();
      gate.gain.setValueAtTime(0.0001, now);

      // 5 rapid compressor blade surge pulses (28 ms spacing, decaying amplitude)
      const pulseOffsets = [0, 0.055, 0.115, 0.185, 0.265];
      pulseOffsets.forEach((offset, idx) => {
        const amp = 0.16 * Math.pow(0.68, idx);
        gate.gain.setValueAtTime(0.002, now + offset);
        gate.gain.linearRampToValueAtTime(amp, now + offset + 0.012);
        gate.gain.exponentialRampToValueAtTime(0.002, now + offset + 0.048);
      });

      flutterSrc.connect(bp);
      bp.connect(gate);
      gate.connect(this.masterGain);

      flutterSrc.start(now);
      flutterSrc.stop(now + 0.45);
    } catch {
      // Ignore
    }
  }

  // Tactile Carbon-Console Mechanical Switch Relay Click
  public playClick(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const ctx = this.ctx;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.018);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Ignore
    }
  }
}

export const gt3Audio = new Gt3AudioEngine();
