import { derived } from 'svelte/store';
import { equipState } from './items/state';
import type { HeroStatTypes, Stat } from './types';
import { appState, attributeState } from './state';
import { DamageStat, FlatNumber, NumberStat, PercentageNumber, type ComplexDamage } from './core';
import { findEffects } from './effects';

export type HeroState = {
  level: number;
  attributePoints: number;
  dps: number[];
  attackSpeed: number;
  stats: Record<HeroStatTypes, Stat<number | ComplexDamage>>;
}

export const heroState = derived([attributeState, equipState, appState], (s) => {
  const [attributes, equip, state] = s;

  const hero: HeroState = {
    level: 0,
    attributePoints: 0,
    dps: [0, 0],
    attackSpeed: 1,
    stats: {
      damage: new DamageStat(),
      health: new NumberStat(),
      stamina: new NumberStat(),
      armor: new NumberStat(),
      weight: new NumberStat(),
      poise: new NumberStat(),
      equipLoad: new NumberStat(),
      focus: new NumberStat(),
    }
  }

  for(const effect of findEffects()) {
    effect.apply(attributes, hero);
  }

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    for(const affix of item.affixes) {
      if(affix.scope !== 'hero') {
        continue;
      }

      switch(affix.stat) {
        case 'stamina':
        case 'health':
        case 'equipLoad':
        case 'poise':
          if(affix.value instanceof FlatNumber) {
            hero.stats[affix.stat].add(affix.value.num);
          } else if(affix.value instanceof PercentageNumber) {
            hero.stats[affix.stat].multiplier += affix.value.num;
          }
      }
    }

    // Sum item damage
    hero.stats.damage.add(item.damage.getTotal());

    // Sum item weights
    hero.stats.weight.add(item.weight.getTotal());

    // Sum item armors
    hero.stats.armor.add(item.armor.getTotal());
  }

  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  /*stats.dps = [
    Math.round(stats.damage[0] * stats.attackSpeed), 
    Math.round(stats.damage[1] * stats.attackSpeed)
  ];*/

  return hero;
});
