import { derived } from 'svelte/store';
import { appState, attributeState, equipState } from './state';
import { AttackDamageType, DynamicDamage, DynamicNumber, FlatResistance } from './core';
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
  
  resistance: {
    immunity: DynamicNumber;
    robustness: DynamicNumber;
    focus: DynamicNumber;
    vitality: DynamicNumber;
    poise: DynamicNumber;
  },

  damageNegation: {
    strike: DynamicNumber;
    slash: DynamicNumber;
    pierce: DynamicNumber;
    elemental: {
      [AttackDamageType.PHYSICAL]: DynamicNumber,
      [AttackDamageType.MAGIC]: DynamicNumber; 
      [AttackDamageType.FIRE]: DynamicNumber;
      [AttackDamageType.LIGHTNING]: DynamicNumber; 
      [AttackDamageType.HOLY]: DynamicNumber;
    }
  },
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
      equipLoad: new DynamicNumber(),
      attackSpeed: new DynamicNumber(),
      resistance: new DynamicResistance(),
      attributes: new DynamicAttribute()
    },
    
    attack: new DynamicAttack(),
    resistance: {
      immunity: new DynamicNumber(),
      robustness: new DynamicNumber(),
      focus: new DynamicNumber(),
      vitality: new DynamicNumber(),
      poise: new DynamicNumber(),
    },
    damageNegation: {
      immunity: new DynamicNumber(),
      robustness: new DynamicNumber(),
      focus: new DynamicNumber(),
      vitality: new DynamicNumber(),
      poise: new DynamicNumber(),
    },
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    hero.resistance.immunity.base += item.resistance.immunity;
    hero.resistance.robustness.base += item.resistance.robustness;
    hero.resistance.focus.base += item.resistance.focus;
    hero.resistance.vitality.base += item.resistance.vitality;
    hero.resistance.poise.base += item.resistance.poise;

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
    effect.apply(attributes, hero.stats);
  }

  const attackDamage = hero.attack.getValue();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.getValue();

  return hero;
});
