import type { DamageEffectDef, EffectDef } from '$lib/effects';
import type { DamageValue } from '$lib/types';

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
  effects?: (EffectDef | DamageEffectDef)[];
  iconUrl?: string;
}

export type ItemDef = {
  base: string;
  name: string;
  quality: number;
  affixes: ItemAffixDef[];
  effect?: string;
}
 
export type ItemAffixDef = {
  modifier: string;
  tier: number;
}