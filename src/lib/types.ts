import type { Item } from './item';

export type DataSchema = {
  maxLevel: number;

  attributePointsPerLevel: number;
  masteryPointsPerLevel: number;

  attributes: { [name: string]: AttributeSchema };
  modifiers: { [name: string]: ModifierSchema };

  baseItems: { [id: string]: BaseItem };
  items?: ItemSchema[];
}

export type ModifierSchema<TValue = unknown> = {
  name: string;
  type: string;
  scope?: string;
  affects: string;
  values: TValue[];
  scaling?: AttributeScaling;
}

export type AttributeSchema = {
  name: string;
  initialValue: number;
  flag: string;
  modifiers: StatModifier<unknown>[];
}

export type AttributeState = { [name: string]: number }

export type StatValues = {
  [name: string]: number | number[];
  dps: number[];
  attackSpeed: number;
  health: number;
  armor: number;
  damage: number[];
  weight: number;
  poise: number;
  equipLoad: number;
  stamina: number;
}

export type BaseItem = {
  name: string;
  type: string;
  group: string;
  tags: string[];
  poise?: number;
  weight: number;
  armor?: number;
  damage?: number[];
  attackSpeed?: number;
  description?: string;
  requiredLevel: number;
  scaling?: AttributeScaling[];
  iconUrl?: string;
}

export type ItemSchema = {
  base: string;
  name: string;
  quality: number;
  attributes: ItemAttributeSchema[];
  damage?: number[];
  effect?: string;
}

export type ItemAttributeSchema = {
  modifier: string;
  tier: number;
}

export type AttributeScaling = {
  attr: string;
  span?: number[];
  rate?: number;
}

export type StatModifier<T = number> = {
  affects: string;
  type?: string;
  scale?: string;
  span?: number[];
  rate?: number;
  value: T;
  affectedGroups?: string[];
}

export type EquipState = {
  neck: Item | null;
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}