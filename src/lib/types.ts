import type { AffectedStat, AttributeMutation, AttributeType, ItemDef, ItemPreset, UpgradeSchema } from './core';
import type { EquipState } from './stores';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  
  defaults?: {
    attributes?: Record<AttributeType, number>;
    equip?: Record<keyof EquipState, string>;
  };

  items?: Record<string, ItemDef>;

  effects?: AttributeEffect[];
  upgradeSchemata?: Record<string, UpgradeSchema>; 
  presets?: Record<string, ItemPreset>;
  mutations?: Record<string, AttributeMutation[]>;
}

export type AttributeEffect = {
  attr: AttributeType;
  affects: AffectedStat;
  mutations: AttributeMutation[];
};
