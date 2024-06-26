import type { AffectedStat, AttributeMutation, AttributeType, ItemConfig, ItemDef, UpgradeSchema } from './core';
import type { EquipState } from './stores';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  
  defaults?: {
    attributes?: Record<AttributeType, number>;
    equip?: Record<keyof EquipState, string>;
  };

  effects?: AttributeEffect[];
  upgradeSchemata?: Record<string, UpgradeSchema>; 
  configurations?: Record<string, ItemConfig>;

  items?: Record<string, ItemDef>;
}

export type AttributeEffect = {
  attr: AttributeType;
  affects: AffectedStat;
  mutations: AttributeMutation[];
};
