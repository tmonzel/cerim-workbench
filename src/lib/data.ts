import type { DataSchema } from './types';
import { appState, type AttributeState } from './state';
import { registerModifier } from './modifiers';
import { addEffect } from './effects';
import { addItem, registerItemBase } from './items';
import { attributeStore } from './attributes';

export function loadData(data: DataSchema) {
  // Resolve attributes
  if(data.attributes) {
    const attributeState: AttributeState = {};
    
    for(const [name, schema] of Object.entries(data.attributes)) {
      attributeState[name] = {
        label: schema.name, 
        value: schema.default ?? 0,
        color: schema.color,
        offset: 0
      }
    }

    attributeStore.set(attributeState);
  }

  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
  });

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
    for(let i = 0; i < data.items.length; i++) {
      addItem(i, data.items[i]);
    }
  }
}
