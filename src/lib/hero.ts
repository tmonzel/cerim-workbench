import { derived } from 'svelte/store';
import { appState, attributeState, equipState } from './state';
import { DynamicDamage, DynamicNumber, FlatResistance } from './core';
import { findEffects } from './effects';
import { DynamicResistance } from './core/DynamicResistance';
import type { HeroStats } from './types';
import { DynamicAttribute } from './core/DynamicAttribute';
import { DynamicAttack } from './core/DynamicAttack';

export type HeroState = {
  level: number;
  attributePoints: number;
  dps: number;
  stats: HeroStats;
  attack: DynamicAttack;
  effects: string[];
}

export const heroState = derived([attributeState, equipState, appState], (s) => {
  const [attributes, equip, state] = s;

  const hero: HeroState = {
    level: 0,
    attributePoints: 0,
    dps: 0,
    stats: {
      damage: new DynamicDamage(),
      health: new DynamicNumber(),
      stamina: new DynamicNumber() ,
      armor: new DynamicNumber(),
      weight: new DynamicNumber(),
      poise: new DynamicNumber(),
      equipLoad: new DynamicNumber(),
      focus: new DynamicNumber(),
      attackSpeed: new DynamicNumber(),
      resistance: new DynamicResistance(),
      robustness: new DynamicNumber(),
      immunity: new DynamicNumber(),
      vitality: new DynamicNumber(),
      attributes: new DynamicAttribute()
    },
    
    attack: new DynamicAttack(),
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    const itemStats = item.stats;
  
    for(const [stat, value] of Object.entries(itemStats)) {
      switch(stat) {
        case 'resistance':
          hero.stats.resistance.base.add(value.getValue() as FlatResistance);
          break;
        case 'attackSpeed':
          hero.stats.attackSpeed.base += value.getValue() as number;
          hero.stats.attackSpeed.multiplier += value.multiplier - 1;
          break;
        case 'stamina':
        case 'health':
        case 'armor':
        case 'focus':
        case 'vitality':
          hero.stats[stat].added += value.added as number;
          hero.stats[stat].multiplier += value.multiplier - 1;
      }
    }

    for(const mod of item.modifications) {
      if(mod.scope === 'hero' && mod.type === 'percentual') {
        hero.stats[mod.stat].multiplier += mod.value - 1;
      }
    }

    if(item.effects) {
      hero.effects = [ ...hero.effects, ...item.effects ];
    }
    
    // Sum item damage
    hero.attack.base.add(item.attack.getValue());

    // Sum item weights
    hero.stats.weight.base += itemStats.weight.getValue();

    // Sum item armors
    hero.stats.armor.base += itemStats.armor.getValue();
  }

  if(hero.stats.attackSpeed.base === 0) {
    // Set attacks per second to one if no weapon equipped
    hero.stats.attackSpeed.base = 1;
  }

  for(const effect of findEffects()) {
    //effect.apply(attributes, hero.stats);
  }

  const attackDamage = hero.attack.getValue();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.getValue();

  return hero;
});
