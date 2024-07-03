import type { AffinityType, AttackType, AttributeMutation, AttributeType, DamageType, Defense, Guard, Resistance, ScalingBase, StatusEffectType } from '$lib/core/types';

export type ItemDef = {
  name: string;
  type: string;
  caption: string;
  group: string;
  tags: string[];
  poise?: number;
  weight?: number;
  armor?: number;
  maxTiers?: number;
  tier?: number;
  attackSpeed?: number;
  description?: string;
  requirements?: ItemRequirements;
  resistance?: Resistance;
  defense?: Defense;
  guard?: Guard;
  affinity?: AffinityType;
  iconUrl?: string;
  effects?: string[];
  modifiers?: Record<ModifierType, ItemModifierDef>;
  config?: ItemConfig;
  affinities?: Record<AffinityType, ItemConfig>;
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
  modifiers?: Record<ModifierType, ItemModifierDef>;
}

export type ItemPreset = {
  maxTiers?: number;
  affinities?: Record<AffinityType, ItemConfig>;
}
 
export type ItemModifierDef = Record<string, ItemModifierConfig>;
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
  mutations?: AttributeMutation[] | string;
  cast?: 'sorceries' | 'incantations';
  apply?: Partial<Record<StatusEffectType, number[]>>;
}