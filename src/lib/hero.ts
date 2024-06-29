import { derived } from 'svelte/store';
import { appState, attributeState, equipState, heroStatsState } from './state';
import { DamageType, type HeroStats } from './core';

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  dps: number;
  stats: HeroStats;
  effects: string[];
}

export const heroState = derived([heroStatsState, attributeState, equipState, appState], ([stats, attributes, equip, app]) => {
  const hero: HeroState = {
    level: 0,
    progress: 0,
    attributePoints: 0,
    dps: 0,
    stats,
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    if(item.effects) {
      hero.effects.push(...item.effects);
    }
    
    if(item.scaledDamage) {
      for(const damageType in item.scaledDamage) {
        hero.stats['damage'].add({ [damageType]: item.scaledDamage[damageType as DamageType] })
      }
    }
  }

  if(!hero.stats.attackSpeed.isPresent()) {
    // Set attacks per second to one if no weapon equipped
    hero.stats.attackSpeed.set(1);
  }

  const attackDamage = hero.stats['damage'];
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / app.attributePointsPerLevel);
  hero.attributePoints = app.attributePointsPerLevel * app.maxLevel - numDistributedPoints;
  hero.progress = (hero.level / app.maxLevel);

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.total;

  return hero;
});
