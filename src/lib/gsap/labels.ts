/**
 * GSAP Timeline Labels
 * 
 * Centralized label definitions for the homepage master timeline.
 * These labels are used by both the timeline coordinator and MCP testing.
 */

export const TL = {
  heroStart: "heroStart",
  planAppear: "planAppear",
  planBoxAppear: "planBoxAppear", 
  dock: "dock",
  agent: "agent",
  prompt: "prompt",
  script: "script",
  code: "code",
  matrixOn: "matrixOn",
  videoStart: "videoStart",
} as const;

export type TimelineLabels = typeof TL[keyof typeof TL];

/**
 * Timeline label order for validation
 */
export const LABEL_SEQUENCE = [
  TL.heroStart,
  'heroFadeEnd',
  TL.planAppear,
  TL.planBoxAppear,
  TL.dock,
  TL.agent,
  TL.prompt,
  'typing',
  TL.script,
  TL.code,
  TL.matrixOn,
  'matrixOff',
  TL.videoStart,
  'boxesFade',
  'videoFade',
];

/**
 * Expected durations for each label (in seconds)
 * Used for timeline validation and testing
 */
export const LABEL_DURATIONS = {
  [TL.heroStart]: 3,
  heroFadeEnd: 0.5,
  [TL.planAppear]: 0.6,
  [TL.planBoxAppear]: 0.6,
  [TL.dock]: 0.5,
  [TL.agent]: 0.4,
  [TL.prompt]: 0.4,
  typing: 2.5,
  [TL.script]: 6.5,
  [TL.code]: 3.0,
  [TL.matrixOn]: 3.0,
  matrixOff: 0.3,
  [TL.videoStart]: 3.0,
  boxesFade: 0.6,
  videoFade: 0.6,
};

/**
 * Get all labels as an array
 */
export function getAllLabels(): string[] {
  return [...LABEL_SEQUENCE];
}
