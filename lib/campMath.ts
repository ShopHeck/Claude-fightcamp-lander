// Pure functions used by the Build-Your-Camp calculator.
// No hooks, no DOM access — easy to unit test.

export type Discipline =
  | "boxing"
  | "mma"
  | "muay_thai"
  | "kickboxing"
  | "bjj"
  | "wrestling";

export type Phase = "base" | "build" | "peak" | "taper";

export type CampPlan = {
  weeks: number;
  sessions: number;
  sparringBlocks: number;
  cutLbs: number;
  weeklyLbs: number;
  cutPace: "safe" | "aggressive" | "extreme" | "build";
  phases: { name: Phase; weeks: number; weight: number; load: string }[];
  weeklyWeights: { week: number; weight: number }[];
};

const SESSIONS_PER_WEEK: Record<Discipline, number> = {
  boxing: 6,
  mma: 7,
  muay_thai: 6,
  kickboxing: 6,
  bjj: 6,
  wrestling: 7,
};

// % of camp dedicated to each phase
const PHASE_SPLIT: Record<Phase, number> = {
  base: 0.4,
  build: 0.3,
  peak: 0.2,
  taper: 0.1,
};

const PHASE_LOAD: Record<Phase, string> = {
  base: "Moderate",
  build: "High",
  peak: "Very High",
  taper: "Light",
};

export function diffInDays(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / 86_400_000));
}

export function buildCamp(input: {
  discipline: Discipline;
  currentWeight: number;
  targetWeight: number;
  fightDate: Date;
  today?: Date;
}): CampPlan {
  const today = input.today ?? new Date();
  const days = diffInDays(today, input.fightDate);
  const weeks = Math.max(1, Math.round(days / 7));
  const cutLbs = Math.max(0, input.currentWeight - input.targetWeight);
  const weeklyLbs = weeks > 0 ? cutLbs / weeks : 0;
  const sessionsPerWeek = SESSIONS_PER_WEEK[input.discipline] ?? 6;
  const sessions = sessionsPerWeek * weeks;
  const sparringBlocks = Math.max(1, Math.round(weeks * 0.5));

  const cutPace: CampPlan["cutPace"] =
    cutLbs <= 0
      ? "build"
      : weeklyLbs < 1
        ? "safe"
        : weeklyLbs <= 2
          ? "aggressive"
          : "extreme";

  // Distribute weeks across phases
  const phaseOrder: Phase[] = ["base", "build", "peak", "taper"];
  const phaseWeeks = phaseOrder.map((p) =>
    Math.max(1, Math.round(weeks * PHASE_SPLIT[p]))
  );
  // adjust rounding to total exactly `weeks`
  while (phaseWeeks.reduce((a, b) => a + b, 0) > weeks) {
    const biggestIdx = phaseWeeks.indexOf(Math.max(...phaseWeeks));
    phaseWeeks[biggestIdx] -= 1;
  }
  while (phaseWeeks.reduce((a, b) => a + b, 0) < weeks) {
    const smallestIdx = phaseWeeks.indexOf(Math.min(...phaseWeeks));
    phaseWeeks[smallestIdx] += 1;
  }

  // Weight at end of each phase
  let acc = 0;
  const phases = phaseOrder.map((name, i) => {
    acc += phaseWeeks[i];
    const progressed = weeks > 0 ? acc / weeks : 0;
    const weight = +(input.currentWeight - cutLbs * progressed).toFixed(1);
    return { name, weeks: phaseWeeks[i], weight, load: PHASE_LOAD[name] };
  });

  // Week-by-week weight (linear cut)
  const weeklyWeights = Array.from({ length: weeks + 1 }, (_, i) => ({
    week: i,
    weight: +(input.currentWeight - weeklyLbs * i).toFixed(1),
  }));

  return {
    weeks,
    sessions,
    sparringBlocks,
    cutLbs: +cutLbs.toFixed(1),
    weeklyLbs: +weeklyLbs.toFixed(2),
    cutPace,
    phases,
    weeklyWeights,
  };
}
