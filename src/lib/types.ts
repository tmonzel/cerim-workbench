import type { AffectedStat, AttributeType, ItemConfig, ItemDef } from './core';
import type { EquipState } from './stores';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  defaults?: HeroDefaults;

  effects?: AttributeEffect[];
  configurations?: Record<string, ItemConfig>;

  items?: Record<string, ItemDef>;
}

export type HeroDefaults = {
  attributes?: Record<AttributeType, number>;
  equip?: Record<keyof EquipState, string>;
}

export type AttributeEffect = {
  attr: AttributeType;
  affects: AffectedStat;
  mutations: AttributeMutation[];
};

export type AttributeMutation = {
  breakpoint: number;
  grow: number;
  exp?: number;
}

export type DamageValue = { [0]: number; [1]: number; [2]: number } | number;
export type ResistanceValue = { [0]: number; [1]: number; };
export type AttributeValue = {
  [0]: number;
  [1]: AttributeType;
}
