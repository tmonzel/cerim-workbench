import { derived } from 'svelte/store';
import { equipState } from './equip/state';
import { ComplexDamage } from './values/complex-damage';
import { modifierStore } from './modifier.store';
import { attributeStore } from './attribute.store';
import { dataStore } from './data.store';
import { DamageItem } from './equip/items/DamageItem';
import { ArmorItem } from './equip/items/ArmorItem';

export type HeroState = {
  [name: string]: number | number[] | ComplexDamage;
  level: number;
  attributePoints: number;
  dps: number[];
  attackSpeed: number;
  health: number;
  armor: number;
  damage: ComplexDamage;
  weight: number;
  poise: number;
  equipLoad: number;
  stamina: number;
}

export type HeroStatTypes = 'focus' | 'stamina' | 'armor' | 'weight' | 'poise' | 'equipLoad' | 'damage' | 'health';

export const heroState = derived([attributeStore, equipState, dataStore], (state) => {
  const [attributes, equip, data] = state;

  const stats: HeroState = {
    level: 0,
    attributePoints: 0,
    dps: [0, 0],
    attackSpeed: 1,
    health: 0,
    armor: 0,
    damage: new ComplexDamage(),
    weight: 0,
    poise: 0,
    equipLoad: 0,
    stamina: 0
  }

  for(const statMod of modifierStore.getAll()) {
    statMod.modify(attributes, stats);
  }

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Sum item weights
    stats.weight += item.weight.value;

    if(item instanceof DamageItem) {
      stats.damage.add(item.damage.value.get());
    }

    if(item instanceof ArmorItem) {
      stats.armor += item.armor.value;
    }
  }

  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  stats.level = Math.floor(numDistributedPoints / data.attributePointsPerLevel);
  stats.attributePoints = data.attributePointsPerLevel * data.maxLevel - numDistributedPoints

  /*stats.dps = [
    Math.round(stats.damage[0] * stats.attackSpeed), 
    Math.round(stats.damage[1] * stats.attackSpeed)
  ];*/

  return {
    ...stats,
    health: Math.round(stats.health * 100) / 100
  };
});
