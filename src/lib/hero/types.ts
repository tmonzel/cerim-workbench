import type { DynamicAttack, DynamicAttributes, DynamicDamageNegation, DynamicDefense, DynamicGuard, DynamicResistance, DynamicStats } from '$lib/core';
import type { AttributeEffect, AttributeType } from '$lib/core/types';
import type { EquipState } from './state';

export type SlotState = Record<keyof EquipState, string | null>;

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  equip: EquipState;
  effects: string[];
  stats: DynamicStats;
  attributes: DynamicAttributes;
  attack: DynamicAttack;
  resistance: DynamicResistance;
  defense: DynamicDefense;
  damageNegation: DynamicDamageNegation;
  guard: DynamicGuard;
}

export type HeroStateModifier = {
  modify(hero: HeroState): void;
}

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  effects: AttributeEffect[]
}

export type AttributeState = Record<AttributeType, number>;