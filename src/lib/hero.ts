import { derived } from 'svelte/store';
import { equipState } from './items/state';
import { appState, attributeState } from './state';
import { ComplexDamage, DamageStat, NumberStat, type DamageNumber, type FlatNumber, type PercentageNumber } from './core';
import { findEffects } from './effects';

export type HeroStats = {
  damage: DamageStat;
  health: NumberStat;
  stamina: NumberStat;
  armor: NumberStat;
  weight: NumberStat;
  poise: NumberStat;
  equipLoad: NumberStat;
  focus: NumberStat;
  attackSpeed: NumberStat;
}

export type HeroState = {
  level: number;
  attributePoints: number;
  dps: ComplexDamage;
  stats: HeroStats;
  modifications: StatModification[];
}

export type StatModification = {
  name: string;
  value: FlatNumber | PercentageNumber | DamageNumber;
}

export const heroState = derived([attributeState, equipState, appState], (s) => {
  const [attributes, equip, state] = s;

  const hero: HeroState = {
    level: 0,
    attributePoints: 0,
    dps: new ComplexDamage(),
    stats: {
      damage: new DamageStat(),
      health: new NumberStat(),
      stamina: new NumberStat(),
      armor: new NumberStat(),
      weight: new NumberStat(),
      poise: new NumberStat(),
      equipLoad: new NumberStat(),
      focus: new NumberStat(),
      attackSpeed: new NumberStat(1)
    },
    modifications: []
  }

  for(const effect of findEffects()) {
    effect.apply(attributes, hero);
  }

  let equipArmor = 0;
  let equipWeight = 0;
  const equipDamage = new ComplexDamage();

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
        case 'attackSpeed':
          if(affix.num.type === 'flat') {
            hero.stats[affix.stat].add(affix.num.value);
          } else if(affix.num.type === 'percentual') {
            hero.stats[affix.stat].multiplier += affix.num.value;
          }
      }
    }

    // Add attack speed if any
    if(item.attackSpeed) {
      hero.stats.attackSpeed.add(item.attackSpeed);
    }

    // Sum item damage
    equipDamage.add(item.damage.getTotal().getValue());

    // Sum item weights
    equipWeight += item.weight.getTotal();

    // Sum item armors
    equipArmor += item.armor.getTotal();
  }

  hero.stats.armor.set(equipArmor);
  hero.stats.weight.set(equipWeight);
  hero.stats.damage.set(equipDamage.getValue());

  // Filter modifications

  if(hero.stats.stamina.added.value !== 0) {
    hero.modifications.push({ name: 'Stamina', value: hero.stats.stamina.added })
  }

  if(hero.stats.health.multiplier !== 1) {
    hero.modifications.push({ name: 'Increased Health', value: { value: hero.stats.health.multiplier - 1, type: 'percentual' } })
  }

  const totalDamage = hero.stats.damage.getTotal();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  hero.dps.add(totalDamage.getValue());
  hero.dps.multiply(hero.stats.attackSpeed.getTotal());

  return hero;
});
