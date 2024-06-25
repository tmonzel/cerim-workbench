import type { DataSchema } from './types';
import { appState } from './state';
import { addEffect } from './effects';
import { itemStore } from './stores';
import { Item } from './core';

export function loadData(data: DataSchema) {
  // Resolve effects
  if(data.effects) {
    for(const def of data.effects) {
      addEffect(def);
    }
  }
  
  // Resolve items
  if(data.items) {
    const items: Record<string, Item> = {};

    for(const id in data.items) {
      const def = data.items[id];

      if(typeof def.config === 'string' && data.configurations && data.configurations[def.config]) {
        items[id] = new Item(id, def, data.configurations[def.config]);
      } else {
        items[id] = new Item(id, def);
      }
    }

    itemStore.set(items);
  }
  
  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
  });
}
