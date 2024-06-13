import type { Mutation } from './core';
import type { DamageValue, HeroStatTypes } from './types';

export type BaseEffect = {
  attr: string;
  mutations?: Mutation[];
}

export interface DefaultEffect extends BaseEffect {
  affects: Exclude<HeroStatTypes, 'damage'>;
  value: number;
}

export interface DamageEffect extends BaseEffect {
  affects: 'damage';
  value: DamageValue;
}

export type Effect = DefaultEffect | DamageEffect;

const list: Effect[] = [];

export function addEffect(def: Effect): void {
  list.push(def);
}

export function findEffects(): Effect[] {
  return list;
}
