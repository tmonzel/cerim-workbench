import type { Effect } from './effects';
import type { ItemBaseDef, ItemDef } from './items/types';
import type { ModifierDef } from './modifiers';

export type DataSchema = {
  maxLevel: number;

  attributePointsPerLevel: number;
  masteryPointsPerLevel: number;

  effects?: Effect[];
  attributes?: { [name: string]: AttributeDef };

  models?: { [id: string]: ItemBaseDef };
  modifiers?: { [name: string]: ModifierDef };

  items?: ItemDef[];
}

export type Attribute = {
  label: string;
  value: number;
}

export type AttributeDef = {
  name: string;
  default: number;
}

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}

export type DamageValue = { [0]: number; [1]: number; [2]: number };
export type ResistanceValue = { [0]: number; [1]: number; };

export enum DamageType {
  PHYSICAL = 0,
  FIRE = 1,
  COLD = 2,
  LIGHTNING = 3,
  POISON = 4
}

export type HeroStatTypes = 'focus' | 'stamina' | 'armor' | 'weight' | 'poise' | 'equipLoad' | 'damage' | 'health' | 'attackSpeed' | 'resistance';