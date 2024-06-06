import type { Mutation } from '$lib/core';
import type { DamageValue, HeroStatTypes } from '$lib/types';

export type EffectDef = {
  attr: string;
  affects: Exclude<HeroStatTypes, 'damage'>;
  mutations?: Mutation[];
  value: number;
}

export type DamageEffectDef = {
  attr: string;
  affects: 'damage';
  mutations?: Mutation[];
  value: DamageValue;
}
