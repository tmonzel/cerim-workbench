import { AttackItem, itemStore, type Item } from '$lib/item';
import { derived, writable } from 'svelte/store';
import type { AppState, HeroState } from './types';
import { attributeStore } from './attributes';
import { slotStore } from './equip';
import { calcCorrect, DynamicAttack, DynamicAttributes, DynamicDamageNegation, DynamicDefense, DynamicGuard, DynamicResistance, DynamicStats, list } from '$lib/core';
import { defenseMutations, resistanceMutations } from './graph';
import type { AffinityType, AttributeType } from '$lib/core/types';
import type { DataDefaults } from '$lib/data';

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

  const baseDefense = calcCorrect(level + 79, defenseMutations);
  const baseResistance = calcCorrect(level + 79, resistanceMutations);

  const hero: HeroState = {
    level,
    progress: (level / app.maxLevel),
    attributePoints: app.attributePointsPerLevel * app.maxLevel - numDistributedPoints,
    stats: new DynamicStats(),
    equip,
    effects: [],
    attributes: new DynamicAttributes(attributes),
    attack: new DynamicAttack(),

    resistance: new DynamicResistance({
      immunity: baseResistance,
      focus: baseResistance,
      poise: baseResistance,
      robustness: baseResistance,
      vitality: baseResistance
    }),

    defense: new DynamicDefense({ 
      standard: baseDefense,
      pierce: baseDefense,
      slash: baseDefense,
      strike: baseDefense, 
      fir: baseDefense, 
      hol: baseDefense, 
      lit: baseDefense, 
      mag: baseDefense 
    }),

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
    if(item instanceof AttackItem) {
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
            hero[m.key].value[k.key].add(calcCorrect(attr.total, k.value));
          }
      }
    }
  }

  const totalAttributes = hero.attributes.getTotalValue();

  for(const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
    if(!item) {
      continue;
    }

    if(item instanceof AttackItem) {
      hero.equip[part] = item.applyScaling(totalAttributes);

      if(item.scaledAttack) {
        for(const damage of list(item.scaledAttack)) {
          hero.attack.add({ [damage.key]: item.scaledAttack[damage.key] })
        }
      }
    }
  }
  
  return hero;
});

export const sharedDataState = derived([attributeStore, slotStore, itemStore], ([attributes, equip, items]) => {
  const itemModifications: Record<string, { affinity?: AffinityType, tier?: number}> = {};

  for(const item of Object.values(items)) {
    if(!item.modified) {
      continue;
    }

    const mod: { affinity?: AffinityType, tier?: number } = {};
    
    if(item instanceof AttackItem && item.affinity) {
      mod.affinity = item.affinity;
    }

    if(item.tier > 0) {
      mod.tier = item.tier;
    }

    itemModifications[item.id] = mod;
  }


  return {
    attributes,
    equip,
    itemModifications,
  } satisfies DataDefaults;
})