// Tiny Web Audio bell — no audio files, fully synthesized.
// Three tones: round start (high), warning (mid), rest (low).

type Tone = "start" | "warn" | "rest";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

const PRESETS: Record<Tone, { freq: number; duration: number; count: number }> = {
  start: { freq: 880, duration: 0.5, count: 2 }, // two clear bell hits
  warn: { freq: 660, duration: 0.18, count: 3 }, // three quick beeps
  rest: { freq: 440, duration: 0.55, count: 1 }, // single low bell
};

export function bell(tone: Tone) {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") audio.resume();
  const { freq, duration, count } = PRESETS[tone];
  const now = audio.currentTime;
  for (let i = 0; i < count; i++) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audio.destination);
    const start = now + i * (duration + 0.12);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }
}
