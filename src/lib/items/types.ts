import type { AffectedStat, AffinityType, AttackBase, AttackDamageType, AttributeType, DamageNegation, FlatDamage, FlatResistance, Guard, NumberRange, Resistance, ScalingBase } from '$lib/core';
import type { FlatAttribute } from '$lib/core/values/FlatAttribute';
import type { AttributeMutation, ModifierScope, ModifierType, RawStatValue } from '$lib/types';

export type ItemType = 'weapon' | 'armor' | 'talisman';

export type ItemDef = {
  name: string;
  type: ItemType;
  caption: string;
  group: string;
  tags: string[];
  poise?: number;
  weight: number;
  armor?: number;
  tiers?: number;
  tier?: number;
  attackSpeed?: number;
  description?: string;
  requirements: ItemRequirements;
  resistance?: Resistance,
  damageNegation?: DamageNegation;
  affinity?: AffinityType;
  iconUrl?: string;
  effects?: string[];
  affixes?: Partial<ItemAffixDef>[];
  config: ItemConfig | string;
  upgrades?: Record<AffinityType, ItemUpgrade>;
}

export type ItemConfig = {
  attack?: Record<AttackDamageType, NumberRange>;
  scaling?: Record<AttributeType, NumberRange>;
  mutations?: AttributeMutation[];
}

export type ItemRequirements = { 
  attributes?: Partial<Record<AttributeType, number>> 
}

export type ItemUpgrade = {
  attack?: AttackBase;
  guard?: Guard;
  scaling?: ScalingBase;
}

export type PercentualModification = {
  type: 'percentual';
  name: string;
  tier: number;
  stat: AffectedStat;
  scope?: ModifierScope;
  value: number;
}

export type FlatModification = {
  type: 'flat';
  name: string;
  tier: number;
  stat: AffectedStat;
  scope?: ModifierScope;
  value: number | FlatDamage | FlatResistance | FlatAttribute;
}

export type ItemModification = FlatModification | PercentualModification;
 
export type ItemAffixDef = {
  type: ModifierType;
  name: string;
  affects: AffectedStat;
  modifier: string;
  tier: number;
  scope: ModifierScope;
  value: RawStatValue;
}