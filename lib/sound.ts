'use client';

/**
 * ⚡ Real Anime Sound Engine
 * ============================================================
 * Plays the authentic uploaded anime audio assets from `/sounds/`:
 *  - intro.mpeg               -> Glitch intro theme / loading phase audio
 *  - Lightning Flicker.mpeg   -> Electric crackle / lightning flickering SFX
 *  - Chidori Electric.mpeg    -> Chidori charge & high-voltage lightning bursts
 *  - Sharingan Activation.mpeg-> Dōjutsu ocular chime & power-up SFX
 *  - Thunder Strike.mpeg      -> Heavy seismic thunder strike SFX
 *
 * All sounds strictly respect the global SFX mute toggle.
 */

type SoundKey =
  | 'intro'
  | 'lightningFlicker'
  | 'chidoriCharge'
  | 'chidoriElectric'
  | 'electricZap'
  | 'thunder'
  | 'sharinganActivate'
  | 'smokePoof'
  | 'uiClick'
  | 'kunaiSlash'
  | 'handSeal'
  | 'kamuiWarp';

interface SoundConfig {
  sources: string[];
  volume: number;
}

const SOUND_MANIFEST: Record<SoundKey, SoundConfig> = {
  intro: {
    sources: ['/sounds/intro.mpeg'],
    volume: 0.75,
  },
  lightningFlicker: {
    sources: [
      '/sounds/Lightning Flicker.mpeg',
      '/sounds/lightning-flicker.mpeg',
      '/sounds/Lightning%20Flicker.mpeg',
    ],
    volume: 0.65,
  },
  chidoriCharge: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
      '/sounds/Chidori%20Electric.mpeg',
    ],
    volume: 0.7,
  },
  chidoriElectric: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
      '/sounds/Chidori%20Electric.mpeg',
    ],
    volume: 0.75,
  },
  electricZap: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
      '/sounds/Chidori%20Electric.mpeg',
    ],
    volume: 0.7,
  },
  thunder: {
    sources: [
      '/sounds/Thunder Strike.mpeg',
      '/sounds/thunder-strike.mpeg',
      '/sounds/Thunder%20Strike.mpeg',
    ],
    volume: 0.85,
  },
  sharinganActivate: {
    sources: [
      '/sounds/Sharingan Activation.mpeg',
      '/sounds/sharingan-activation.mpeg',
      '/sounds/Sharingan%20Activation.mpeg',
    ],
    volume: 0.8,
  },
  smokePoof: {
    sources: [
      '/sounds/Thunder Strike.mpeg',
      '/sounds/thunder-strike.mpeg',
    ],
    volume: 0.35,
  },
  uiClick: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
    ],
    volume: 0.2,
  },
  kunaiSlash: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
    ],
    volume: 0.5,
  },
  handSeal: {
    sources: [
      '/sounds/Chidori Electric.mpeg',
      '/sounds/chidori-electric.mpeg',
    ],
    volume: 0.3,
  },
  kamuiWarp: {
    sources: [
      '/sounds/Sharingan Activation.mpeg',
      '/sounds/sharingan-activation.mpeg',
    ],
    volume: 0.65,
  },
};

class RealAudioSoundManager {
  private enabled: boolean = true;
  private lastFlickerTime: number = 0;
  private lastScrollSfxTime: number = 0;
  private audioPool: Map<string, HTMLAudioElement[]> = new Map();
  private failedSources: Set<string> = new Set();
  private introAudio: HTMLAudioElement | null = null;
  private scrollFlickerAudio: HTMLAudioElement | null = null;
  private scrollStopTimer: NodeJS.Timeout | null = null;
  private backgroundThunderAudio: HTMLAudioElement | null = null;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playSharinganWithThunder();
      this.startBackgroundThunder();
    } else {
      this.stopIntro();
      this.stopScrollFlicker();
      this.stopBackgroundThunder();
    }
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.stopIntro();
      this.stopScrollFlicker();
      this.stopBackgroundThunder();
    }
  }

  /**
   * Internal helper: plays an audio element with multi-instance pooling
   */
  private play(key: SoundKey, customVolume?: number): HTMLAudioElement | null {
    if (!this.enabled || typeof window === 'undefined') return null;

    const conf = SOUND_MANIFEST[key];
    if (!conf) return null;

    const validSrc = conf.sources.find((s) => !this.failedSources.has(s));
    if (!validSrc) return null;

    try {
      let pool = this.audioPool.get(validSrc);
      if (!pool) {
        pool = [];
        this.audioPool.set(validSrc, pool);
      }

      // Voice pooling: find idle or oldest audio instance (max 5 per sound)
      let audio = pool.find((a) => a.paused || a.ended);
      if (!audio) {
        if (pool.length < 5) {
          audio = new Audio(validSrc);
          audio.preload = 'auto';
          audio.addEventListener('error', () => {
            this.failedSources.add(validSrc);
          });
          pool.push(audio);
        } else {
          audio = pool[0];
          audio.pause();
          audio.currentTime = 0;
        }
      } else {
        audio.currentTime = 0;
      }

      audio.volume = customVolume !== undefined ? customVolume : conf.volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled: Autoplay policy will start on first user tap/interaction
        });
      }
      return audio;
    } catch {
      return null;
    }
  }

  // ─── Special Intro Audio (Loopable / Cross-fade support) ──────────────────

  /**
   * Play the intro glitch sound
   */
  public playIntro() {
    if (!this.enabled || typeof window === 'undefined') return;

    if (!this.introAudio) {
      const src = SOUND_MANIFEST.intro.sources[0];
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = SOUND_MANIFEST.intro.volume;
      audio.loop = false;
      this.introAudio = audio;
    }

    this.introAudio.currentTime = 0;
    const p = this.introAudio.play();
    if (p !== undefined) {
      p.catch(() => {
        // If browser blocks autoplay, start on next user interaction
        const startOnInteract = () => {
          if (this.introAudio && this.enabled) {
            this.introAudio.play().catch(() => {});
          }
          window.removeEventListener('pointerdown', startOnInteract);
          window.removeEventListener('keydown', startOnInteract);
        };
        window.addEventListener('pointerdown', startOnInteract, { once: true });
        window.addEventListener('keydown', startOnInteract, { once: true });
      });
    }
  }

  /**
   * Smoothly fade out and stop intro sound when portfolio opens
   */
  public stopIntro() {
    if (!this.introAudio) return;
    const audio = this.introAudio;
    const fadeStep = 0.08;
    const interval = setInterval(() => {
      if (audio.volume > fadeStep) {
        audio.volume = Math.max(0, audio.volume - fadeStep);
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = SOUND_MANIFEST.intro.volume;
        clearInterval(interval);
      }
    }, 40);
  }

  // ─── Sound Triggers (Exact API preserved) ──────────────────────────────────

  // ─── Scroll-Activated Flicker (Controlled Loop with Instant Cutoff) ────────

  /**
   * Starts playing the electrical flicker sound while actively scrolling.
   */
  public startScrollFlicker() {
    if (!this.enabled || typeof window === 'undefined') return;

    if (!this.scrollFlickerAudio) {
      const src = SOUND_MANIFEST.lightningFlicker.sources[0];
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = SOUND_MANIFEST.lightningFlicker.volume;
      this.scrollFlickerAudio = audio;
    }

    if (this.scrollFlickerAudio.paused) {
      this.scrollFlickerAudio.play().catch(() => {});
    }

    // Reset safety cutoff timer (stops sound after 120ms if no subsequent scroll events)
    if (this.scrollStopTimer) clearTimeout(this.scrollStopTimer);
    this.scrollStopTimer = setTimeout(() => {
      this.stopScrollFlicker();
    }, 120);
  }

  /**
   * Forcefully and instantly stops the flicker sound when scrolling halts.
   */
  public stopScrollFlicker() {
    if (this.scrollStopTimer) {
      clearTimeout(this.scrollStopTimer);
      this.scrollStopTimer = null;
    }
    if (this.scrollFlickerAudio && !this.scrollFlickerAudio.paused) {
      this.scrollFlickerAudio.pause();
      this.scrollFlickerAudio.currentTime = 0;
    }
  }

  // ─── Continuous Background Thunder (Starts on scroll, keeps playing) ──────

  /**
   * Starts atmospheric thunder playing continuously in the background while browsing/scrolling.
   * Does NOT stop when the user stops scrolling.
   */
  public startBackgroundThunder() {
    if (!this.enabled || typeof window === 'undefined') return;

    if (!this.backgroundThunderAudio) {
      const src = SOUND_MANIFEST.thunder.sources[0];
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = 0.65;
      this.backgroundThunderAudio = audio;
    }

    if (this.backgroundThunderAudio.paused) {
      this.backgroundThunderAudio.play().catch(() => {});
    }
  }

  /**
   * Stops background thunder when muted via SFX toggle.
   */
  public stopBackgroundThunder() {
    if (this.backgroundThunderAudio && !this.backgroundThunderAudio.paused) {
      this.backgroundThunderAudio.pause();
    }
  }

  public playLightningFlicker() {
    this.startScrollFlicker();
  }

  public playScrollFlicker() {
    this.startScrollFlicker();
  }

  public playChidoriCharge() {
    this.play('chidoriCharge');
  }

  public playChidoriElectric() {
    this.play('chidoriElectric');
  }

  public playElectricZap() {
    this.play('electricZap');
  }

  public playThunder() {
    this.play('thunder');
  }

  public playSharinganActivate() {
    this.play('sharinganActivate');
  }

  public playSharinganWithThunder() {
    if (!this.enabled) return;
    this.playSharinganActivate();
    setTimeout(() => {
      this.playThunder();
    }, 140);
    setTimeout(() => {
      this.playChidoriElectric();
    }, 280);
  }

  public playSmokeTeleport() {
    this.play('smokePoof');
  }

  public playUIClick() {
    this.play('uiClick');
  }

  public playKunaiSlash() {
    this.play('kunaiSlash');
  }

  public playHandSeal() {
    this.play('handSeal');
  }

  public playKamuiWarp() {
    this.play('kamuiWarp');
  }
}

export const soundManager = new RealAudioSoundManager();
