import { derived } from 'svelte/store';
import { equipState } from './items/state';
import { appState, attributeState } from './state';
import { DamageMutator, DynamicDamage, DynamicNumber, FlatDamage, FlatResistance, FlatStat, type Stat } from './core';
import { findEffects } from './effects';
import { NumberMutator } from './core/mutators/NumberMutator';
import { DynamicResistance } from './core/DynamicResistance';
import { PercentualStat } from './core/values/PercentualStat';

export type HeroStats = {
  damage: Stat<FlatDamage>;
  health: Stat<number>;
  stamina: Stat<number>;
  armor: Stat<number>;
  weight: Stat<number>;
  poise: Stat<number>;
  equipLoad: Stat<number>;
  focus: Stat<number>;
  attackSpeed: Stat<number>;
  resistance: Stat<FlatResistance>;
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
      damage: { 
        label: 'Damage', 
        value: new DynamicDamage() 
      },
      health: { 
        label: 'Health', 
        value: new DynamicNumber() 
      },
      stamina: { 
        label: 'Stamina', 
        value: new DynamicNumber() 
      },
      armor: { 
        label: 'Armor', 
        value: new DynamicNumber() 
      },
      weight: { 
        label: 'Weight', 
        value: new DynamicNumber() 
      },
      poise: { 
        label: 'Poise', 
        value: new DynamicNumber() 
      },
      equipLoad: { 
        label: 'Equip Load', 
        value: new DynamicNumber() 
      },
      focus: { 
        label: 'Focus', 
        value: new DynamicNumber() 
      },
      attackSpeed: { 
        label: 'Attack Speed', 
        value: new DynamicNumber(1) 
      },
      resistance: { 
        label: 'Resistance', 
        value: new DynamicResistance() 
      }
    },
  };

  for(const effect of findEffects()) {
    const attr = attributes[effect.attr];
    const base = effect.value;

    if(!attr) {
      continue;
    }

    if(typeof base === 'number') {
      // Mutate normal stat number
      const mutator = new NumberMutator(base, effect.mutations ?? []);

      switch(effect.affects) {
        case 'health':
        case 'stamina':
        case 'poise':
        case 'equipLoad':
          hero.stats[effect.affects].value.set(mutator.mutate(attr.value));
      }
    }

    else if(Array.isArray(base)) {
      // Mutate damage
      const mutator = new DamageMutator(base, effect.mutations ?? []);
      hero.stats.damage.value.added.push(mutator.mutate(attr.value));
    }
  }

  let equipArmor = 0;
  let equipWeight = 0;
  const equipDamage = new FlatDamage();

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    hero.stats.resistance.value.added.push(
      item.resistance.getTotal()
    );

    for(const mod of item.modifications) {
      if(mod.scope !== 'hero') {
        continue;
      }

      switch(mod.stat) {
        case 'stamina':
        case 'health':
        case 'equipLoad':
        case 'poise':
        case 'attackSpeed':
          if(mod.value instanceof FlatStat) {
            hero.stats[mod.stat].value.added.push(mod.value.getValue());
          } else if(mod.value instanceof PercentualStat) {
            hero.stats[mod.stat].value.multiplier += mod.value.getValue();
          }
      }
    }

    // Add attack speed if any
    if(item.attackSpeed) {
      hero.stats.attackSpeed.value.added.push(item.attackSpeed);
    }
    
    // Sum item damage
    equipDamage.add(item.damage.getTotal());

    // Sum item weights
    equipWeight += item.weight.getTotal();

    // Sum item armors
    equipArmor += item.armor.getTotal();
  }

  hero.stats.armor.value.set(equipArmor);
  hero.stats.weight.value.set(equipWeight);
  hero.stats.damage.value.set(equipDamage);
  

  const totalDamage = hero.stats.damage.value.getTotal();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints

  hero.dps.add(totalDamage);
  hero.dps.multiply(hero.stats.attackSpeed.value.getTotal());

  return hero;
});
