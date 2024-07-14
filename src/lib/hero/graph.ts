import type { GraphMutation } from '$lib/core/types';

export const defenseMutations: GraphMutation[] = [
  { breakpoint: 1, grow: 40 },
  { breakpoint: 150, grow: 100 },
  { breakpoint: 170, grow: 120 },
  { breakpoint: 240, grow: 135 },
  { breakpoint: 792, grow: 155 }
];

export const resistanceMutations: GraphMutation[] = [
  { breakpoint: 1, grow: 75 },
  { breakpoint: 150, grow: 105 },
  { breakpoint: 190, grow: 145 },
  { breakpoint: 240, grow: 160 },
  { breakpoint: 792, grow: 180 }
];