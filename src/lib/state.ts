import { derived, writable } from 'svelte/store';
import { FlatAttribute } from './core/values/FlatAttribute';
import { equipStore, type EquipState } from './items/state';
import { attributeStore } from './attributes';
import type { AttributeType } from './core';

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
});

export const attributeState = derived([attributeStore, equipStore], ([attributes, equip]) => {
  const offsetAttribute = new FlatAttribute();

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    const attribute = item.stats.attributes.getValue();
    offsetAttribute.add(attribute);
  }
  
  for(const [n, attr] of Object.entries(attributes)) {
    const t = n as AttributeType;
    attributes[t] = { 
      ...attr, 
      offset: offsetAttribute[t] ?? 0
    };
  }

  return attributes;
});

export const equipState = derived([attributeState, equipStore], ([attributes, equip]) => {
  const state: EquipState = {
    head: null,
    chest: null,
    legs: null,
    hand: null,
    mainHand: null,
    offHand: null,
    rune: null,
    pouch: null
  }

  for(const [part, item] of Object.entries(equip)) {
    if(!item) {
      continue;
    }
    
    state[part] = item.applyScaling(attributes);
  }

  return state;
})
