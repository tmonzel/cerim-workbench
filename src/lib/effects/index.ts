import { StatEffect } from './StatEffect';
import type { EffectDef } from './types';
export * from './types';

const list: StatEffect[] = [];

export function addEffect(def: EffectDef): void {
  list.push(new StatEffect(def));
}

export function findEffects(): StatEffect[] {
  return list;
}
