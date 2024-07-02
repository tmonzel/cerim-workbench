import { derived, writable } from 'svelte/store';
import { attributeStore } from './attributes';
import { AttributeType, ComplexAttributes, ComplexDamage, calcAttributeScaling, flattenAttributeState, type AttributeEffect, type HeroStats, type Item } from './core';
import { equipStore, itemStore, type EquipState } from './stores';
import { DynamicNumber } from './core/DynamicNumber';

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

export const heroStatsState = derived([attributeStore, equipStore, appState, itemStore], ([attributes, equip, state]) => {
  const stats: HeroStats = {
    'hp': new DynamicNumber(),
    'fp': new DynamicNumber(),
    'stamina': new DynamicNumber(),
    'discovery': new DynamicNumber(),
    'weight': new DynamicNumber(),
    'equipLoad': new DynamicNumber(),
    'attackSpeed': new DynamicNumber(),

    'res:immunity': new DynamicNumber(),
    'res:robustness': new DynamicNumber(),
    'res:focus': new DynamicNumber(),
    'res:vitality': new DynamicNumber(),
    'res:poise': new DynamicNumber(),

    'def:standard': new DynamicNumber(),
    'def:strike': new DynamicNumber(),
    'def:slash': new DynamicNumber(),
    'def:pierce': new DynamicNumber(),
    'def:hol': new DynamicNumber(),
    'def:lit': new DynamicNumber(),
    'def:fir': new DynamicNumber(),
    'def:mag': new DynamicNumber(),

    'attributes': new ComplexAttributes(),
    'damage': new ComplexDamage(),
    
    'guard:sta': new DynamicNumber(),
    'guard:res': new DynamicNumber(),
    'guard:phy': new DynamicNumber(),
    'guard:mag': new DynamicNumber(),
    'guard:fir': new DynamicNumber(),
    'guard:lit': new DynamicNumber(),
    'guard:hol': new DynamicNumber()
  };

  // Apply item modifications
  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Summarize resistance
    if(item.resistance) {
      stats['res:immunity'].add(item.resistance.immunity);
      stats['res:robustness'].add(item.resistance.robustness);
      stats['res:focus'].add(item.resistance.focus);
      stats['res:vitality'].add(item.resistance.vitality);
      stats['res:poise'].add(item.resistance.poise);
    }

    // Summarize defense
    if(item.defense) {
      stats['def:standard'].add(item.defense.physical.standard);
      stats['def:strike'].add(item.defense.physical.strike);
      stats['def:slash'].add(item.defense.physical.slash);
      stats['def:pierce'].add(item.defense.physical.pierce);
      
      stats['def:mag'].add(item.defense.elemental.mag);
      stats['def:fir'].add(item.defense.elemental.fir);
      stats['def:lit'].add(item.defense.elemental.lit);
      stats['def:hol'].add(item.defense.elemental.hol);
    }

    // Summarize guard
    if(item.guard) {
      stats['guard:sta'].add(item.guard.sta);
      stats['guard:res'].add(item.guard.res);
      
      stats['guard:phy'].add(item.guard.phy);
      stats['guard:mag'].add(item.guard.mag);
      stats['guard:fir'].add(item.guard.fir);
      stats['guard:lit'].add(item.guard.lit);
      stats['guard:hol'].add(item.guard.hol);
    }

    for(const mod of item.modifiers) {
      mod.modify(stats);
    }

    // Sum item weights
    stats.weight.add(item.weight);
  }

  // Apply effects
  for(const effect of state.effects) {
    const attr = attributes[effect.attr as AttributeType];
    const offset = stats.attributes.get(effect.attr as AttributeType);
    
    switch(effect.affects) {
      case 'hp':
      case 'fp':
      case 'stamina':
      case 'equipLoad':
      case 'discovery':
      case 'res:vitality':
      case 'def:standard':
      case 'def:mag':
      case 'def:fir':
      case 'def:hol':
        stats[effect.affects].add(calcAttributeScaling(attr.value + offset, effect.mutations));
    }
  }
  
  return stats;
}) 

export const attributeState = derived([attributeStore, heroStatsState], ([attributes, stats]) => {
  for(const [n, attr] of Object.entries(attributes)) {
    const t = n as AttributeType;
    attributes[t] = { 
      ...attr, 
      offset: stats.attributes.get(t)
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

  const flatAttributes = flattenAttributeState(attributes)

  for(const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
    if(!item) {
      continue;
    }
    
    state[part] = item.applyScaling(flatAttributes);
  }

  return state;
})
