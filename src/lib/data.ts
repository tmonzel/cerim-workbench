import type { DataSchema } from './types';
import { appState } from './state';
import { registerModifier } from './modifiers';
import { addEffect } from './effects';
import { addItem } from './items';
import type { ItemConfig } from './items/types';

export function loadData(data: DataSchema) {
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
  
  // Resolve items
  if(data.items) {
    for(let i = 0; i < data.items.length; i++) {
      const def = data.items[i];

      if(typeof def.config === 'string' && data.configurations && data.configurations[def.config]) {
        addItem(i, def, data.configurations[def.config]);
      } else {
        addItem(i, def, def.config as ItemConfig);
      }
    }
  }
  
  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
  });
}
