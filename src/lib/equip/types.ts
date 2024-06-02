import type { ModifierDef } from '$lib/types';
import type { HeroStatTypes } from '$lib/hero';
import type { Writable } from 'svelte/store';

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
  damage?: number[];
  attackSpeed?: number;
  description?: string;
  requiredLevel: number;
  modifiers?: ModifierDef[];
  iconUrl?: string;
}

export interface ItemAffix<T = number> extends Writable<T> {
  readonly id: string;
  readonly name: string;

  get tier(): number;
}

export interface AbstractItemAffixDef {
  name: string;
}

export interface PercentualAffixDef extends AbstractItemAffixDef {
  type: 'percentual';
  affects: HeroStatTypes;
  values: number[];
}

export interface FlatAffixDef extends AbstractItemAffixDef {
  type: 'flat';
  affects: HeroStatTypes;
  values: number[];
}

export type ItemAffixDef = PercentualAffixDef | FlatAffixDef;