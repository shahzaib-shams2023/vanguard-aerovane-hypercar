// Procedural Web Audio API synthesizer for F154CB 3.9L Twin-Turbo V8 & mechanical telemetry
class Gt3AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted = true;
  private oscPrimary: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;

  private ensureContext(): void {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playIgnition();
      this.startIdleDrone();
    } else {
      this.stopIdleDrone();
    }
    return !this.isMuted;
  }

  public isSoundActive(): boolean {
    return !this.isMuted;
  }

  private startIdleDrone(): void {
    if (!this.ctx || this.oscPrimary) return;
    try {
      const now = this.ctx.currentTime;
      this.oscPrimary = this.ctx.createOscillator();
      this.oscHarmonic = this.ctx.createOscillator();
      this.masterGain = this.ctx.createGain();

      // Flat-plane V8 firing character (fundamental + octave harmonic)
      this.oscPrimary.type = 'sawtooth';
      this.oscPrimary.frequency.setValueAtTime(62, now);

      this.oscHarmonic.type = 'triangle';
      this.oscHarmonic.frequency.setValueAtTime(124, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, now);

      this.masterGain.gain.setValueAtTime(0.018, now);

      this.oscPrimary.connect(filter);
      this.oscHarmonic.connect(filter);
      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.oscPrimary.start();
      this.oscHarmonic.start();
    } catch {
      // Ignore Web Audio autoplay blocks cleanly
    }
  }

  private stopIdleDrone(): void {
    try {
      this.oscPrimary?.stop();
      this.oscPrimary?.disconnect();
      this.oscHarmonic?.stop();
      this.oscHarmonic?.disconnect();
      this.masterGain?.disconnect();
    } catch {
      // Safe cleanup
    }
    this.oscPrimary = null;
    this.oscHarmonic = null;
    this.masterGain = null;
  }

  public updateRpm(normalizedLoad: number): void {
    if (this.isMuted || !this.ctx || !this.oscPrimary || !this.oscHarmonic) return;
    try {
      const clamped = Math.max(0, Math.min(1, normalizedLoad));
      const baseHz = 62 + clamped * 168;
      this.oscPrimary.frequency.setTargetAtTime(baseHz, this.ctx.currentTime, 0.08);
      this.oscHarmonic.frequency.setTargetAtTime(baseHz * 2, this.ctx.currentTime, 0.08);
    } catch {
      // Ignore
    }
  }

  public playIgnition(): void {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(48, now);
      osc.frequency.exponentialRampToValueAtTime(165, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(72, now + 1.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Ignore
    }
  }

  public playTurboFlutter(): void {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.42);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
    } catch {
      // Ignore
    }
  }

  public playClick(): void {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }
}

export const gt3Audio = new Gt3AudioEngine();
