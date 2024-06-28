import { derived, writable } from 'svelte/store';
import { attributeStore } from './attributes';
import { AttributeStat, AttributeType, DamageStat, NumericStat, calcAttributeScaling, type HeroStats, type Item } from './core';
import { equipStore, itemStore, type EquipState } from './stores';
import type { AttributeEffect } from './types';

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
    'hp': new NumericStat("Health"),
    'fp': new NumericStat("FP"),
    'stamina': new NumericStat("Stamina"),
    'discovery': new NumericStat("Discovery"),
    'weight': new NumericStat("Weight"),
    'equipLoad': new NumericStat("Equip Load"),
    'attackSpeed': new NumericStat("Attack Speed"),

    'res:immunity': new NumericStat("Immunity"),
    'res:robustness': new NumericStat("Robustness"),
    'res:focus': new NumericStat("Focus"),
    'res:vitality': new NumericStat("Vitality"),
    'res:poise': new NumericStat("Poise"),

    'def:standard': new NumericStat("Standard Defense"),
    'def:strike': new NumericStat("Strike Defense"),
    'def:slash': new NumericStat("Slash Defense"),
    'def:pierce': new NumericStat("Pierce Defense"),
    'def:hol': new NumericStat("Holy Defense"),
    'def:lit': new NumericStat("Lightning Defense"),
    'def:fir': new NumericStat("Fire Defense"),
    'def:mag': new NumericStat("Magic Defense"),

    'attributes': new AttributeStat("Attributes"),
    'damage': new DamageStat("Attack Power"),
    
    'guard:sta': new NumericStat("Stability"),
    'guard:res': new NumericStat("Resistance"),
    'guard:phy': new NumericStat("Physical Guard"),
    'guard:mag': new NumericStat("Magic Guard"),
    'guard:fir': new NumericStat("Fire Guard"),
    'guard:lit': new NumericStat("Lightning Guard"),
    'guard:hol': new NumericStat("Holy Guard")
  };

  // Apply effects
  for(const effect of state.effects) {
    const attr = attributes[effect.attr as AttributeType];
    
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
        stats[effect.affects].value.add(calcAttributeScaling(attr.value + attr.offset, effect.mutations));
    }
  }

  // Apply item modifications
  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Summarize resistance
    if(item.resistance) {
      stats['res:immunity'].value.add(item.resistance.immunity);
      stats['res:robustness'].value.add(item.resistance.robustness);
      stats['res:focus'].value.add(item.resistance.focus);
      stats['res:vitality'].value.add(item.resistance.vitality);
      stats['res:poise'].value.add(item.resistance.poise);
    }

    // Summarize defense
    if(item.defense) {
      stats['def:standard'].value.add(item.defense.physical.standard);
      stats['def:strike'].value.add(item.defense.physical.strike);
      stats['def:slash'].value.add(item.defense.physical.slash);
      stats['def:pierce'].value.add(item.defense.physical.pierce);
      
      stats['def:mag'].value.add(item.defense.elemental.mag);
      stats['def:fir'].value.add(item.defense.elemental.fir);
      stats['def:lit'].value.add(item.defense.elemental.lit);
      stats['def:hol'].value.add(item.defense.elemental.hol);
    }

    // Summarize guard
    if(item.guard) {
      stats['guard:sta'].value.add(item.guard.sta);
      stats['guard:res'].value.add(item.guard.res);
      
      stats['guard:phy'].value.add(item.guard.phy);
      stats['guard:mag'].value.add(item.guard.mag);
      stats['guard:fir'].value.add(item.guard.fir);
      stats['guard:lit'].value.add(item.guard.lit);
      stats['guard:hol'].value.add(item.guard.hol);
    }

    for(const mod of item.modifiers) {
      mod.modify(stats);
    }

    // Sum item weights
    stats.weight.value.add(item.weight);
  }
  
  return stats;
}) 

export const attributeState = derived([attributeStore, heroStatsState], ([attributes, stats]) => {
  for(const [n, attr] of Object.entries(attributes)) {
    const t = n as AttributeType;
    attributes[t] = { 
      ...attr, 
      offset: stats.attributes.value.get(t)
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
