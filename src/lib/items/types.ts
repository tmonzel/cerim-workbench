import type { FlatModifier, PercentualModifier } from '$lib/core';
import type { EffectDef } from '$lib/effects';
import type { ModifierScope } from '$lib/modifiers';
import type { DamageValue, HeroStatTypes } from '$lib/types';

export type ItemType = 'weapon' | 'armor' | 'talisman';

export type ItemBaseDef = {
  name: string;
  type: ItemType;
  caption: string;
  group: string;
  tags: string[];
  poise?: number;
  weight: number;
  armor?: number;
  damage?: DamageValue;
  attackSpeed?: number;
  description?: string;
  requiredLevel: number;
  effects?: EffectDef[];
  iconUrl?: string;
}

export type ItemDef = {
  base: string;
  name: string;
  quality: number;
  affixes?: ItemAffixDef[];
  effect?: string;
}

export type ItemModification = {
  name: string;
  tier: number;
  stat: HeroStatTypes;
  scope?: ModifierScope;
  modifier: PercentualModifier | FlatModifier;
}
 
export type ItemAffixDef = {
  modifier: string;
  tier: number;
}