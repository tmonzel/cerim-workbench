import { derived, writable } from 'svelte/store';
import { attributeStore } from './attributes';
import { AttributeType, type Item } from './core';
import { equipStore, itemStore, type EquipState } from './stores';
import type { AttributeEffect } from './types';
import { ComplexAttributes } from './core/values';

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  effects: AttributeEffect[]
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
  effects: []
});

export const attributeState = derived([attributeStore, equipStore], ([attributes, equip]) => {
  const offsetAttribute = new ComplexAttributes();

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    for(const mod of item.modifiers) {
      if(mod.affects !== 'attributes') {
        continue;
      }
      
      offsetAttribute.add(mod.value as Partial<Record<AttributeType, number>>);
    }
  }
  
  for(const [n, attr] of Object.entries(attributes)) {
    const t = n as AttributeType;
    attributes[t] = { 
      ...attr, 
      offset: offsetAttribute.value[t].total
    };
  }

  return attributes;
});

export const equipState = derived([attributeState, equipStore, itemStore], ([attributes, equip]) => {
  const state: EquipState = {
    head: null,
    chest: null,
    legs: null,
    hand: null,
    mainHand: null,
    offHand: null,
    rune: null,
    pouch: null,
    pouch2: null,
    pouch3: null,
    pouch4: null
  }

  for(const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
    if(!item) {
      continue;
    }
    
    state[part] = item.applyScaling(attributes);
  }

  return state;
})
