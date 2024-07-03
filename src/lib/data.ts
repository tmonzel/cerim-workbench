import { appState, type EquipState } from './state';
import { attributeStore, equipStore, itemStore } from './stores';
import { AttributeType, Item, type AttributeEffect, type AttributeMutation, type ItemDef, type ItemPreset, type UpgradeSchema } from './core';
import { get } from 'svelte/store';
import { mutationRecord, presetRecord } from './records';

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
  equipStore.update(state => {
    if(!data.defaults || !data.defaults.equip) {
      return { ...state };
    }

    const items = get(itemStore);

    for(const [slot, itemId] of Object.entries(data.defaults.equip)) {
      if(!items[itemId]) {
        continue;
      }

      state[slot as keyof EquipState] = items[itemId];
    }

    return { ...state };
  })
}
