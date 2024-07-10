import type { AffinityType, AttackType, AttributeMutation, AttributeType, DamageNegation, DamageType, Guard, Resistance, ScalingBase, StatusEffectType } from '$lib/core/types';

export enum ItemCategory {
  NONE = 0,
  ARMS = 1,
  BODY = 2,
  HAIR = 4,
  HEAD = 5,
  LEGS = 6,
  WEAPON = 7
}

export type ItemData = {
  name: string;
  type: string;
  category: ItemCategory;
  group: string;
  poise?: number;
  weight?: number;
  armor?: number;
  tier?: number;
  attackSpeed?: number;
  description?: string;
  requirements?: ItemRequirements;
  resistance?: Resistance;
  damageNegation?: DamageNegation;
  guard?: Guard;
  affinity?: AffinityType;
  iconUrl?: string;
  effects?: string[];
  modifiers?: Record<ModifierType, ItemModifierData>;
  config?: ItemConfig;
  affinities?: Partial<Record<AffinityType, ItemConfig>>;
  defaults?: string | ItemPreset;
  upgrades?: ItemUpgrade[];
  attackInfo?: ItemAttackInfo;
}

export type ItemAttackInfo = {
  damage?: DamageType[];
  crit?: number;
}

export type ItemUpgrade = {
  iconUrl?: string;
  modifiers?: Record<ModifierType, ItemModifierData>;
}

export type ItemPreset = {
  base?: string;
  maxTiers?: number;
  config?: ItemConfig;
  affinities?: Record<AffinityType, ItemConfig>;
}
 
export type ItemModifierData = Record<string, ItemModifierConfig>;
export type ItemModifierConfig = { name?: string; modify: ItemModifierValue };
export type ItemModifierValue = Record<string, number>;

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}

export type ModifierType = 'flat' | 'percentual';

export type ItemRequirements = { 
  attributes?: Partial<Record<AttributeType, number>> 
}

export type ItemConfig = {
  attack?: Partial<Record<AttackType, number>>;
  guard?: Guard;
  scaling?: ScalingBase;
  schema?: string;
  mutations?: AttributeMutation[] | number | Partial<Record<AttackType, string>>;
  cast?: 'sorceries' | 'incantations';
  apply?: number[];
  attackCorrectId?: string;
}