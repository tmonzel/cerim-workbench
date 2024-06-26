import type { DataSchema } from './types';
import { appState } from './state';
import { equipStore, itemStore, type EquipState } from './stores';
import { AttributeType, Item, type UpgradeSchema } from './core';
import { attributeStore } from './attributes';
import { get } from 'svelte/store';

export const upgradeSchemata: Record<string, UpgradeSchema> = {};

export function loadData(data: DataSchema) {
  if(data.upgradeSchemata) {
    for(const name in data.upgradeSchemata) {
      upgradeSchemata[name] = data.upgradeSchemata[name];
    }
  }

  // Resolve items
  if(data.items) {
    const items: Record<string, Item> = {};

    for(const id in data.items) {
      const def = data.items[id];

      if(typeof def.config === 'string' && data.configurations && data.configurations[def.config]) {
        items[id] = new Item(id, def, { config: data.configurations[def.config] });
      } else {
        items[id] = new Item(id, def);
      }
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

      state[t].value = data.defaults.attributes[t];
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
