import { appState, type SlotState } from './state';
import { attributeStore, slotStore } from './stores';
import { mutationRecord, presetRecord } from './records';
import { AttributeType, type AttributeEffect, type AttributeMutation, type UpgradeSchema } from './core/types';
import type { ItemDef, ItemPreset } from './item/types';
import { Item, itemStore } from './item';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  
  defaults?: {
    attributes?: Record<AttributeType, number>;
    equip?: Record<keyof SlotState, string>;
  };

  items?: Record<string, ItemDef>;

  effects?: AttributeEffect[];
  upgradeSchemata?: Record<string, UpgradeSchema>; 
  presets?: Record<string, ItemPreset>;
  mutations?: Record<string, AttributeMutation[]>;
}


export const upgradeSchemata: Record<string, UpgradeSchema> = {};

export function loadData(data: DataSchema) {
  if(data.mutations) {
    for(const name in data.mutations) {
      mutationRecord[name] = data.mutations[name];
    }
  }

  if(data.upgradeSchemata) {
    for(const name in data.upgradeSchemata) {
      upgradeSchemata[name] = data.upgradeSchemata[name];
    }
  }

  if(data.presets) {
    for(const name in data.presets) {
      presetRecord[name] = data.presets[name];
    }
  }

  // Resolve items
  if(data.items) {
    const items: Record<string, Item> = {};

    for(const id in data.items) {
      const def = data.items[id];
      items[id] = new Item(id, def);
    }

    itemStore.set(items);
  }
  
  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
    effects: data.effects ?? []
  });
  
  // Apply attribute defaults
  attributeStore.update(state => {
    if(!data.defaults || !data.defaults.attributes) {
      return { ...state };
    }

    for(const t of Object.values(AttributeType)) {
      if(!data.defaults.attributes[t]) {
        continue;
      }

      state[t] = data.defaults.attributes[t];
    }

    return { ...state };
  });

  // Apply equip defaults
  slotStore.update(state => {
    if(!data.defaults || !data.defaults.equip) {
      return { ...state };
    }

    return { ...state, ...data.defaults.equip };
  })
}
