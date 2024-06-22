import type { AffinityType, AttackBase, AttackDamageType, AttributeType, FlatDamage, FlatResistance, Guard, NumberRange, ScalingBase } from '$lib/core';
import type { FlatAttribute } from '$lib/core/values/FlatAttribute';
import type { EffectDef } from '$lib/effects';
import type { HeroStatTypes, ModifierScope, ModifierType, RawStatValue } from '$lib/types';

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
  requiredLevel: number;
  affinity?: AffinityType;
  scaling?: EffectDef[];
  iconUrl?: string;
  effects?: string[];
  base?: string;
  quality?: number;
  affixes?: Partial<ItemAffixDef>[];
  config: ItemConfig;
  upgrades?: Record<AffinityType, ItemUpgrade>;
}

export type ItemConfig = {
  attack?: Record<AttackDamageType, NumberRange>;
  scaling?: Record<AttributeType, NumberRange>;
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
  stat: HeroStatTypes;
  scope?: ModifierScope;
  value: number;
}

export type FlatModification = {
  type: 'flat';
  name: string;
  tier: number;
  stat: HeroStatTypes;
  scope?: ModifierScope;
  value: number | FlatDamage | FlatResistance | FlatAttribute;
}

export type ItemModification = FlatModification | PercentualModification;
 
export type ItemAffixDef = {
  type: ModifierType;
  name: string;
  affects: HeroStatTypes;
  modifier: string;
  tier: number;
  scope: ModifierScope;
  value: RawStatValue;
}