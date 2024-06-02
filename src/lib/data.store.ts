import { writable } from 'svelte/store';
import type { ItemAffix } from './equip/types';
import { itemStore } from './equip/state';
import { StatModifier } from './modifiers/StatModifier';
import type { DataSchema, DataState } from './types';
import { createItem } from './equip/create-item';
import { modifierStore } from './modifier.store';
import { attributeStore, type AttributeState } from './attribute.store';
import { registerModification } from './modifications';
import { PercentualAffix } from './equip/affixes/PercentualAffix';
import { FlatAffix } from './equip/affixes/FlatAffix';
import type { Item } from './equip/items/Item';

const store = writable<DataState>({
  maxLevel: 0,
  attributePointsPerLevel: 3,
  attributes: {}
});

const load = (data: DataSchema) => {
  const items: Item[] = [];
  const attributes: AttributeState = {};

  if(data.modifiers) {
    for(const def of data.modifiers) {
      modifierStore.add(new StatModifier(def));
    }
  }

  if(data.itemAffixDefs) {
    for(const [id, def] of Object.entries(data.itemAffixDefs)) {
      registerModification(id, { name: def.name, type: def.type, stat: def.affects });
    }
  }

  if(data.items) {
    // Resolve items
    for(const i in data.items) {
      const itemSchema = data.items[i];
      const def = data.itemDefs[itemSchema.def];
      const affixes: ItemAffix[] = [];

      for(const affixSchema of (itemSchema.affixes ?? [])) {
        const affixId = affixSchema.def;
        const affixDef = data.itemAffixDefs[affixId];

        if(!affixDef) {
          continue;
        }

        const name = affixDef.name ?? 'No name';

        if(affixDef.type === 'percentual') {
          affixes.push(new PercentualAffix(affixId, name, affixDef.values, affixSchema.tier));
        } else if(affixDef.type === 'flat') {
          affixes.push(new FlatAffix(affixId, name, affixDef.values, affixSchema.tier));
        }
      }
      
      items.push(createItem(def, affixes));
    }
  }

  dataStore.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
    attributes: data.attributes
  });

  for(const [name, schema] of Object.entries(data.attributes)) {
    attributes[name] = {
      label: schema.name, 
      value: schema.default ?? 0
    }
  }

  attributeStore.set(attributes);
  itemStore.set(items);
}

export const dataStore = {
  load,
  ...store
}
