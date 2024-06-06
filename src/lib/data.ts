import type { Attribute, DataSchema } from './types';
import { appState } from './state';
import { registerModifier } from './modifiers';
import { addEffect } from './effects';
import { addItem, registerItemBase } from './items';

export function loadData(data: DataSchema) {
  const attributes: Record<string, Attribute> = {};

  // Resolve effects
  if(data.effects) {
    for(const def of data.effects) {
      addEffect(def);
    }
  }

  // Resolve affix modifiers
  if(data.modifiers) {
    for(const [id, def] of Object.entries(data.modifiers)) {
      registerModifier(id, def);
    }
  }

  // Resolve base items
  if(data.models) {
    for(const [id, def] of Object.entries(data.models)) {
      registerItemBase(id, def);
    }
  }
  
  // Resolve items
  if(data.items) {
    for(const def of data.items) {
      addItem(def);
    }
  }

  // Resolve attributes
  if(data.attributes) {
    for(const [name, schema] of Object.entries(data.attributes)) {
      attributes[name] = {
        label: schema.name, 
        value: schema.default ?? 0
      }
    }
  }

  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
    attributes
  })
}
