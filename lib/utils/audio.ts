/**
 * audio.ts — Web Audio API procedural sound synthesizer for LifeQuest.
 * Zero external audio files required. Instant, responsive, and cross-browser.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  constructor() {
    if (typeof window !== "undefined") {
      this.muted = localStorage.getItem("lifequest_sound_muted") === "true"
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  public isMuted(): boolean {
    return this.muted
  }

  public setMuted(muted: boolean) {
    this.muted = muted
    if (typeof window !== "undefined") {
      localStorage.setItem("lifequest_sound_muted", muted ? "true" : "false")
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted)
    return this.muted
  }

  /**
   * Conquer Quest — satisfying double chime with harmonic resonance
   */
  public playQuestComplete() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now + i * 0.08)

      gain.gain.setValueAtTime(0, now + i * 0.08)
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.45)
    })
  }

  /**
   * Level-Up Fanfare — triumphant fanfare with multi-voice brass synthesis
   */
  public playLevelUp() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const chord1 = [440, 554.37, 659.25] // A Major
    const chord2 = [587.33, 739.99, 880.0] // D Major
    const finalChord = [659.25, 830.61, 987.77, 1318.51] // E Major with high octave

    const playChord = (freqs: number[], start: number, duration: number, isFinal = false) => {
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = isFinal ? "triangle" : "sawtooth"
        osc.frequency.setValueAtTime(freq, now + start)

        gain.gain.setValueAtTime(0, now + start)
        gain.gain.linearRampToValueAtTime(0.12, now + start + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + start)
        osc.stop(now + start + duration)
      })
    }

    playChord(chord1, 0, 0.22)
    playChord(chord2, 0.25, 0.3)
    playChord(finalChord, 0.58, 0.8, true)
  }

  /**
   * Gold Coin Clink — bright metallic chime
   */
  public playCoin() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(1480, now)
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.08)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.26)
  }

  /**
   * Button Click — subtle tactile UI click
   */
  public playClick() {
    if (this.muted) return
    const ctx = this.getContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.06)
  }
}

export const soundEngine = new SoundEngine()
