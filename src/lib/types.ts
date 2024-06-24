import type { EffectDef } from './effects';
import type { ItemConfig, ItemDef } from './items/types';
import type { AttributeType, DynamicDamage, DynamicNumber } from './core';
import type { DynamicResistance } from './core/DynamicResistance';
import type { DynamicAttribute } from './core/DynamicAttribute';

export type DataSchema = {
  maxLevel: number;

  attributePointsPerLevel: number;

  effects?: EffectDef[];
  configurations?: Record<string, ItemConfig>;

  models?: Record<string, ItemDef>;
  modifiers?: Record<string, ModifierDef>;

  items?: ItemDef[];
}

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}

export type DamageValue = { [0]: number; [1]: number; [2]: number } | number;
export type ResistanceValue = { [0]: number; [1]: number; };
export type AttributeValue = {
  [0]: number;
  [1]: AttributeType;
}

export enum DamageType {
  PHYSICAL = 0,
  FIRE = 1,
  COLD = 2,
  LIGHTNING = 3,
  POISON = 4
}

export type HeroStats = {
  damage: DynamicDamage;
  health: DynamicNumber;
  stamina: DynamicNumber;
  armor: DynamicNumber;
  weight: DynamicNumber;
  equipLoad: DynamicNumber;
  attackSpeed: DynamicNumber;
  resistance: DynamicResistance;
  attributes: DynamicAttribute;
}

export type HeroStatTypes = keyof HeroStats;
export type ModifierScope = 'item' | 'hero';
export type ModifierType = 'flat' | 'percentual';

export type NumberModifierDef = {
  type: ModifierType;
  affects: Exclude<HeroStatTypes, 'damage' | 'resistance'>;
  name: string;
  scope?: ModifierScope;
  values: number[];
}

export type DamageModifierDef = {
  type: 'flat';
  affects: 'damage';
  name: string;
  scope?: ModifierScope;
  values: DamageValue[];
}

export type ResistanceModifierDef = {
  type: 'flat';
  affects: 'resistance';
  name: string;
  scope?: ModifierScope;
  values: ResistanceValue[] | (ResistanceValue[])[];
}

export type ComplexResistanceValue = ResistanceValue | ResistanceValue[];
export type ComplexAttributeValue = AttributeValue | AttributeValue[];
export type RawStatValue = number | ComplexResistanceValue | DamageValue | ComplexAttributeValue;

export type ModifierDef = NumberModifierDef | DamageModifierDef | ResistanceModifierDef;