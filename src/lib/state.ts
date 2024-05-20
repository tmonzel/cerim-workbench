import { writable } from 'svelte/store';
import type { DataSchema, Item } from './types';

export type AppState = {
  schema: DataSchema;
  items: Item[];
}

export const appState = writable<AppState>({
  schema: {
    maxLevel: 0,
    attributePointsPerLevel: 3,
    masteryPointsPerLevel: 1,
    attributes: {},
    masteries: [],
    baseItems: {},
  },
  items: []
});

export function loadData(schema: DataSchema) {
  const items: Item[] = [];

  if(schema.items) {
    // Resolve items
    for(const i in schema.items) {
      const item: Item = {
        tier: schema.items[i].tier,
        name: schema.items[i].name,
        base: schema.baseItems[schema.items[i].base],
        modifiers: schema.items[i].modifiers
      }

      items.push(item);
    }
  }
  

  appState.set({
    schema,
    items
  });
}
