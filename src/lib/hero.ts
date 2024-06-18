import { derived } from 'svelte/store';
import { equipState } from './items/state';
import { appState, attributeState } from './state';
import { DynamicDamage, DynamicNumber, FlatDamage, FlatResistance } from './core';
import { findEffects } from './effects';
import { DynamicResistance } from './core/DynamicResistance';

export type HeroStats = {
  damage: DynamicDamage;
  health: DynamicNumber;
  stamina: DynamicNumber;
  armor: DynamicNumber;
  weight: DynamicNumber;
  poise: DynamicNumber;
  equipLoad: DynamicNumber;
  focus: DynamicNumber;
  attackSpeed: DynamicNumber;
  resistance: DynamicResistance;
}

export type HeroState = {
  level: number;
  attributePoints: number;
  dps: FlatDamage;
  stats: HeroStats;
}

export const heroState = derived([attributeState, equipState, appState], (s) => {
  const [attributes, equip, state] = s;

  const hero: HeroState = {
    level: 0,
    attributePoints: 0,
    dps: new FlatDamage(),
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
      resistance: new DynamicResistance()
    },
  };

  for(const effect of findEffects()) {
    effect.apply(attributes, hero.stats);
  }

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
        case 'weight':
        case 'armor':
          hero.stats[stat].added += value.added as number;
          hero.stats[stat].multiplier += value.multiplier - 1;
      }
    }

    for(const mod of item.modifications) {
      if(mod.scope === 'hero' && mod.modifier.type === 'multiply') {
        hero.stats[mod.stat].multiplier += mod.modifier.value - 1;
      }
    }
    
    // Sum item damage
    hero.stats.damage.base.add(itemStats.damage.getValue());

    // Sum item weights
    hero.stats.weight.base += itemStats.weight.getValue();

    // Sum item armors
    hero.stats.armor.base += itemStats.armor.getValue();
  }

  if(hero.stats.attackSpeed.base === 0) {
    // Set attacks per second to one if no weapon equipped
    hero.stats.attackSpeed.base = 1;
  }

  const totalDamage = hero.stats.damage.getValue();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  hero.dps.add(totalDamage);
  hero.dps.multiply(hero.stats.attackSpeed.getValue());

  return hero;
});
