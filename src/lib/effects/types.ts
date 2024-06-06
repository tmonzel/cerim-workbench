import type { Mutation } from '$lib/core';
import type { DamageValue } from '$lib/types';

export type EffectDef = {
  attr: string;
  affects: 'stamina' | 'health' | 'armor' | 'weight' | 'poise';
  mutations?: Mutation[];
  value: number | DamageValue;
}

export type DamageEffectDef = {
  attr: string;
  affects: 'damage';
  mutations?: Mutation[];
  value: DamageValue;
}
