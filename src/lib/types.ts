import type { ItemAffixDef, ItemDef } from './equip/types';

export type DataSchema = {
  maxLevel: number;

  attributePointsPerLevel: number;
  masteryPointsPerLevel: number;

  modifiers?: ModifierDef[];
  attributes: { [name: string]: AttributeDef };

  itemDefs: { [id: string]: ItemDef };
  itemAffixDefs: { [name: string]: ItemAffixDef };

  items?: ItemSchema[];
}

export type AttributeDef = {
  name: string;
  default: number;
}

export type ModifierDef = {
  attr: string;
  affects: string;
  mutations?: Mutation[];
  value: number | number[];
}

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}

export type ItemSchema = {
  def: string;
  name: string;
  quality: number;
  affixes: ItemAffixSchema[];
  damage?: number[];
  effect?: string;
}

export type ItemAffixSchema = {
  def: string;
  tier: number;
}

export type DataState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  attributes: { [name: string]: AttributeDef };
}

export type DynamicValue<T> = {
  base: T;
  value: T;
}