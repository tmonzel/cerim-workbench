import { writable } from 'svelte/store';
import type { DataSchema } from './types';
import { ArmorItem, DamageItem, Item, TalismanItem } from './item';
import { FlatDamageAttribute, FlatValueAttribute, PercentageDamageAttribute, PercentageValueAttribute, type ItemAttribute } from './item-attribute';

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
    baseItems: {},
    modifiers: {}
  },
  items: []
});

export function loadData(schema: DataSchema) {
  const items: Item[] = [];

  if(schema.items) {
    // Resolve items
    for(const i in schema.items) {
      const itemSchema = schema.items[i];
      const baseItem = schema.baseItems[itemSchema.base]

      const attributes: ItemAttribute[] = (itemSchema.attributes ?? [])
        .filter(s => !!schema.modifiers[s.modifier])
        .map(s => {
          const mod = schema.modifiers[s.modifier];
          
          if(mod.type === 'flat') {
            if(mod.affects === 'damage') {
              return new FlatDamageAttribute(mod.name, mod.affects, mod.values as (number[])[], s.tier, mod.scaling);
            } else {
              return new FlatValueAttribute(mod.name, mod.affects, mod.values as number[], s.tier, mod.scaling)
            }
          } else if(mod.type === 'percentage') {
            if(mod.affects === 'damage') {
              return new PercentageDamageAttribute(mod.name, mod.affects, mod.values as number[], s.tier, mod.scaling);
            } else {
              return new PercentageValueAttribute(mod.name, mod.affects, mod.values as number[], s.tier, mod.scaling);
            }
          }


          return new FlatValueAttribute(mod.name, mod.affects, mod.values as number[], s.tier, mod.scaling);
        })

      
      if(baseItem.damage) {
        // Damage Item
        items.push(
          new DamageItem(baseItem, itemSchema, attributes)
        );
      } else if(baseItem.armor) {
        // Armor Item
        items.push(
          new ArmorItem(baseItem, itemSchema, attributes)
        );
      } else {
        // Talisman Item
        items.push(
          new TalismanItem(baseItem, itemSchema, attributes)
        );
      }
    }
  }
  

  appState.set({
    schema,
    items
  });
}
