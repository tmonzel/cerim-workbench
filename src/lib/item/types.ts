import type { AffinityType, AttackType, AttributeMutation, AttributeType, DamageNegation, DamageType, Guard, Resistance, ScalingBase } from '$lib/core/types';


export type ItemData = {
  name: string;
  type: string;
  category: ItemCategory;
  group: string;
  rarity: ItemRarity;
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

export enum ItemCategory {
  WEAPON = 1,
  HELMET = 2,
  ARMOR = 3,
  LEGS = 4,
  ARMS = 5,
  RUNE = 6,
  TALISMAN = 7
}

export enum ItemRarity {
  DEFAULT = 0,
  COMMON = 1,
  RARE = 2,
  LEGENDARY = 3
}

export type ItemAttackInfo = {
  damage: DamageType[];
  crit: number;
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