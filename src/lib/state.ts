import { derived, writable } from 'svelte/store';
import { DynamicAttack, DynamicAttributes, DynamicDamageNegation, DynamicDefense, DynamicGuard, DynamicResistance, DynamicStats, calcAttributeScaling, list } from './core';
import { attributeStore, slotStore } from './stores';
import type { AttributeEffect, AttributeType } from './core/types';
import { itemStore, type Item } from './item';

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

export type SlotState = Record<keyof EquipState, string | null>;

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  equip: EquipState;
  effects: string[];
  stats: DynamicStats;
  attributes: DynamicAttributes;
  attack: DynamicAttack;
  resistance: DynamicResistance;
  defense: DynamicDefense;
  damageNegation: DynamicDamageNegation;
  guard: DynamicGuard;
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
  effects: []
});

export const heroState = derived([attributeStore, slotStore, appState, itemStore], ([attributes, slots, app, items]) => {
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c, 0);
  const level = Math.floor(numDistributedPoints / app.attributePointsPerLevel);
  const equip: EquipState = {
    rune: slots.rune ? items[slots.rune] : null,
    pouch: slots.pouch ? items[slots.pouch] : null,
    pouch2: slots.pouch2 ? items[slots.pouch2] : null,
    pouch3: slots.pouch3 ? items[slots.pouch3] : null,
    pouch4: slots.pouch4 ? items[slots.pouch4] : null,
    head: slots.head ? items[slots.head] : null,
    chest: slots.chest ? items[slots.chest] : null,
    legs: slots.legs ? items[slots.legs] : null,
    hand: slots.hand ? items[slots.hand] : null,
    mainHand: slots.mainHand ? items[slots.mainHand] : null,
    offHand: slots.offHand ? items[slots.offHand] : null
  };

  const hero: HeroState = {
    level,
    progress: (level / app.maxLevel),
    attributePoints: app.attributePointsPerLevel * app.maxLevel - numDistributedPoints,
    stats: new DynamicStats(),
    equip,
    effects: [],
    attributes: new DynamicAttributes(attributes),
    attack: new DynamicAttack(),
    resistance: new DynamicResistance(),
    defense: new DynamicDefense(),
    damageNegation: new DynamicDamageNegation(),
    guard: new DynamicGuard()
  };

  // Apply item modifications
  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Summarize resistance
    if(item.resistance) {
      hero.resistance.add(item.resistance);
    }

    // Summarize damage negation
    if(item.damageNegation) {
      hero.damageNegation.add(item.damageNegation);
    }

    // Summarize guard
    if(item.guard) {
      hero.guard.add(item.guard);
    }

    for(const mod of item.modifiers) {
      mod.modify(hero);
    }

    if(item.effects) {
      hero.effects.push(...item.effects);
    }

    // Sum item weights
    hero.stats.add({ weight: item.weight });
  }

  // Apply effects
  for(const effect of app.effects) {
    const attr = hero.attributes.value[effect.attr as AttributeType];
    
    for(const m of list(effect.mutate)) {
      switch(m.key) {
        case 'stats':
        case 'resistance':
        case 'defense':
          for(const k of list(m.value)) {
            hero[m.key].value[k.key].add(calcAttributeScaling(attr.total, k.value));
          }
      }
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
