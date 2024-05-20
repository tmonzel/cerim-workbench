import { derived, writable } from 'svelte/store';
import type { AttributeState, EquipState, HeroState, StatModifier, StatValues } from './types';
import { scaleValue } from '$lib';
import { appState } from './state';

export function useHero() {
  const attributes = writable<AttributeState>({});

  const state = derived([attributes, appState], (v) => {
    const attrs = v[0];
    const app = v[1];

    const numDistributedPoints = Object.values(attrs).reduce((p, c) => p + c, 0);
    
    return {
      level: Math.floor(numDistributedPoints / app.schema.attributePointsPerLevel),
      attributePoints: app.schema.attributePointsPerLevel * app.schema.maxLevel - numDistributedPoints,
      masteryPoints: app.schema.masteryPointsPerLevel * app.schema.maxLevel
    } as HeroState;
  });
  
  const equip = writable<EquipState>({
    head: null,
    chest: null,
    legs: null,
    hand: null,
    feet: null,
    mainHand: null,
    offHand: null
  });

  const modifiers = writable<{ [property: string]: StatModifier }>({});

  const values = derived([attributes, equip, appState], (state) => {
    const attributes = state[0];
    const gear = state[1];
    const app = state[2];

    const stats: StatValues = {
      dps: [0, 0],
      attackSpeed: 1,
      health: 0,
      armor: 0,
      damage: [0, 0],
      weight: 0,
      poise: 0,
      equipLoad: 0,
      stamina: 0
    }

    for(const [name, schema] of Object.entries(app.schema.attributes)) {
      if(!schema.modifiers) {
        continue;
      }

      for(const mod of schema.modifiers) {
        if(mod.rate) {
          stats[mod.property] = scaleValue(attributes[name], mod.span, mod.rate);
          continue;
        }

        stats[mod.property] = attributes[name] * mod.value;
      }
    }

    const gearItems = [
      gear.head, 
      gear.chest, 
      gear.legs, 
      gear.feet, 
      gear.mainHand, 
      gear.offHand, 
      gear.hand
    ];

    const mods: { [property: string]: StatModifier } = {};

    for(const item of gearItems) {
      if(!item) {
        continue;
      }
      
      stats.armor += item.base.armor ?? 0;
      stats.weight += item.base.weight ?? 0;
      stats.poise += item.base.poise ?? 0;

      for(const mod of item.modifiers) {
        if(mods[mod.stat]) {
          mods[mod.stat].value += mod.type === 'flat' ? mod.value : mod.value - 1;
          continue;
        }
        
        mods[mod.stat] = { property: mod.stat, value: mod.value, type: mod.type, affectedGroups: [] }
      }

      const itemDamage = item.damage ? item.damage : (item.base.damage ?? [0,0]);

      /*for(const i in masteryTiers) {
        const tier = masteryTiers[i];

        if(tier === 0) continue;

        const mastery = data.masteries[i];
        const tierSchema = mastery.tiers[tier - 1];
        
        for(const mod of tierSchema.modifiers) {
          if(!mod.affectedGroups.includes(item.base.group)) continue;

          switch(mod.property) {
            case 'damage':
              itemDamage = [mod.value * itemDamage[0], mod.value * itemDamage[1]];
          }
        }
      }*/

      stats.damage = [
        Math.round(stats.damage[0] + itemDamage[0]), 
        Math.round(stats.damage[1] + itemDamage[1])
      ];

      stats.attackSpeed = item.base.attackSpeed ?? stats.attackSpeed;
    }
    
    for(const [p, m] of Object.entries(mods)) {
      if(m.type === 'flat') {
        // Flat
        stats[p] = m.value + Number(stats[p]);
      } else {
        // Percentual
        stats[p] = m.value * Number(stats[p]);
      }
    }

    stats.dps = [
      Math.round(stats.damage[0] * stats.attackSpeed), 
      Math.round(stats.damage[1] * stats.attackSpeed)
    ];

    modifiers.set(mods);

    return stats;
  });

  return {
    state,
    attributes,
    equip,
    modifiers,
    values
  }
}
