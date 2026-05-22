"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { bell } from "./bell";

export type Preset = {
  key: string;
  label: string;
  rounds: number;
  work: number;
  rest: number;
};

export const PRESETS: Preset[] = [
  { key: "boxing", label: "Boxing", rounds: 12, work: 180, rest: 60 },
  { key: "mma", label: "MMA", rounds: 5, work: 300, rest: 60 },
  { key: "muay_thai", label: "Muay Thai", rounds: 5, work: 180, rest: 60 },
  { key: "hiit", label: "HIIT", rounds: 8, work: 30, rest: 30 },
];

export type Phase = "idle" | "work" | "rest" | "done";

export function useTimer(initialPreset = PRESETS[0]) {
  const [preset, setPreset] = useState<Preset>(initialPreset);
  const [phase, setPhase] = useState<Phase>("idle");
  const [round, setRound] = useState(1);
  const [remaining, setRemaining] = useState(initialPreset.work);
  const [running, setRunning] = useState(false);
  const lastSecond = useRef<number | null>(null);

  // reset whenever preset changes
  useEffect(() => {
    setPhase("idle");
    setRound(1);
    setRemaining(preset.work);
    setRunning(false);
  }, [preset]);

  // tick
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // phase transitions
  useEffect(() => {
    if (!running) return;
    // 10-second warning, only inside work phase, and only fire once per second
    if (phase === "work" && remaining === 10 && lastSecond.current !== 10) {
      lastSecond.current = 10;
      bell("warn");
    }
    if (remaining === 0) {
      if (phase === "work") {
        if (round >= preset.rounds) {
          setPhase("done");
          setRunning(false);
          bell("rest");
          return;
        }
        setPhase("rest");
        setRemaining(preset.rest);
        bell("rest");
        lastSecond.current = null;
        return;
      }
      if (phase === "rest") {
        setRound((r) => r + 1);
        setPhase("work");
        setRemaining(preset.work);
        bell("start");
        lastSecond.current = null;
        return;
      }
      if (phase === "idle") {
        setPhase("work");
        setRemaining(preset.work);
        bell("start");
        lastSecond.current = null;
      }
    }
  }, [remaining, phase, round, preset, running]);

  const play = useCallback(() => {
    if (phase === "done") {
      setPhase("idle");
      setRound(1);
      setRemaining(preset.work);
    }
    if (phase === "idle") {
      setPhase("work");
      setRemaining(preset.work);
      bell("start");
    }
    setRunning(true);
  }, [phase, preset.work]);

  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setPhase("idle");
    setRound(1);
    setRemaining(preset.work);
    setRunning(false);
    lastSecond.current = null;
  }, [preset.work]);

  return {
    preset,
    setPreset,
    phase,
    round,
    remaining,
    running,
    play,
    pause,
    reset,
  };
}

export function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
