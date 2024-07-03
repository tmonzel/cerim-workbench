import { derived, writable } from 'svelte/store';
import { AttributeType, DynamicAttack, DynamicAttributes, calcAttributeScaling, list, type AttributeEffect, type HeroStats, type Item } from './core';
import { attributeStore, equipStore, itemStore } from './stores';
import { DynamicNumber } from './core/DynamicNumber';

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  effects: AttributeEffect[]
}

export type AttributeState = Record<AttributeType, number>;

export type EquipState = {
  rune: Item | null;
  pouch: Item | null;
  pouch2: Item | null;
  pouch3: Item | null;
  pouch4: Item | null;
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  attributes: DynamicAttributes;
  equip: EquipState;
  stats: HeroStats;
  effects: string[];
  attack: DynamicAttack;
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
  effects: []
});

export const heroState = derived([attributeStore, equipStore, appState, itemStore], ([attributes, equip, app]) => {
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
    
    'guard:sta': new DynamicNumber(),
    'guard:res': new DynamicNumber(),
    'guard:phy': new DynamicNumber(),
    'guard:mag': new DynamicNumber(),
    'guard:fir': new DynamicNumber(),
    'guard:lit': new DynamicNumber(),
    'guard:hol': new DynamicNumber()
  };

  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c, 0);
  const level = Math.floor(numDistributedPoints / app.attributePointsPerLevel);

  const hero: HeroState = {
    level,
    progress: (level / app.maxLevel),
    attributePoints: app.attributePointsPerLevel * app.maxLevel - numDistributedPoints,
    stats,
    equip,
    effects: [],
    attributes: new DynamicAttributes(attributes),
    attack: new DynamicAttack()
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
      mod.modify(hero);
    }

    if(item.effects) {
      hero.effects.push(...item.effects);
    }

    // Sum item weights
    stats.weight.add(item.weight);
  }

  // Apply effects
  for(const effect of app.effects) {
    const attr = hero.attributes.value[effect.attr as AttributeType];
    
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
        stats[effect.affects].add(calcAttributeScaling(attr.total, effect.mutations));
    }
  }

  const totalAttributes = hero.attributes.getTotalValue();

  for(const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
    if(!item) {
      continue;
    }
    
    hero.equip[part] = item.applyScaling(totalAttributes);

    if(item.scaledAttack) {
      for(const damage of list(item.scaledAttack)) {
        hero.attack.add({ [damage.key]: item.scaledAttack[damage.key] })
      }
    }
  }
  
  return hero;
});
