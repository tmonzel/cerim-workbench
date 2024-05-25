import { derived, writable } from 'svelte/store';
import type { AttributeState, EquipState, StatValues } from './types';
import { scaleValue } from '$lib';
import { appState } from './state';
import { statModifierMap, type StatModifiers } from './modifiers';

export type HeroState = {
  level: number;
  attributePoints: number;
  masteryPoints: number;
}

export function useHero() {
  const attributes = writable<AttributeState>({});

  const state = derived([attributes, appState], (v) => {
    const attrs = v[0];
    const app = v[1];

    const numDistributedPoints = Object.values(attrs).reduce((p, c) => p + c, 0);
    
    return {
      level: Math.floor(numDistributedPoints / app.schema.attributePointsPerLevel),
      attributePoints: app.schema.attributePointsPerLevel * app.schema.maxLevel - numDistributedPoints
    } as HeroState;
  });
  
  const equip = writable<EquipState>({
    neck: null,
    head: null,
    chest: null,
    legs: null,
    hand: null,
    feet: null,
    mainHand: null,
    offHand: null
  });

  const equippedItems = derived([equip, attributes], ([items, attributes]) => {

    for(const item of Object.values(items)) {
      if(!item) {
        continue;
      }

      item.update(attributes);
    }

    return items;
  });

  const modifiers = derived(equippedItems, (items) => {
    const mods: StatModifiers = {};

    for(const [, item] of Object.entries(items)) {
      if(!item) {
        continue;
      }

      /*if(item instanceof DamageItem) {
        const dmg = item.damage;

        if(!mods['damage']) {
          mods['damage'] = {
            flat: new FlatDamageModifier(dmg.get())
          }
        } else {
          mods['damage'].flat.increase(dmg.get());
        }
      }*/

      /*if(item.base.damage) {
        // Weapon item
        
        // If its a weapon with damage scaling
        if(item.base.scaling) {
          let damageIncrease = 0;

          for(const mod of item.base.scaling) {
            if(item.base.damage && attributes[mod.attr] > 0) {
              damageIncrease += scaleValue(attributes[mod.attr], mod.span, mod.rate);
            }
          }

          item.damage = [
            item.base.damage[0] + damageIncrease, 
            item.base.damage[1] + damageIncrease
          ];

          //equip.set({ ...get(equip), [slot]: item });
        }

        if(!mods['damage']) {
          mods['damage'] = {
            flat: new FlatDamageModifier(item.damage)
          }
        } else {
          mods['damage'].flat.increase(item.damage);
        }
      }*/

      /*if(item.base.armor) {
        // Armor item
        if(!mods['armor']) {
          mods['armor'] = {
            flat: new FlatModifier(item.base.armor)
          }
        } else {
          mods['armor'].flat.increase(item.base.armor);
        }
      }

      if(item.base.weight) {
        if(!mods['weight']) {
          mods['weight'] = {
            flat: new FlatModifier(item.base.weight)
          }
        } else {
          mods['weight'].flat.increase(item.base.weight);
        }
      }*/
      
      //mods.attackSpeed.value += item.base.attackSpeed ?? 0;
      //mods.armor.value += item.base.armor ?? 0;
      //mods.weight.value += item.base.weight ?? 0;
      //mods.poise.value += item.base.poise ?? 0;


      /*for(const attr of item.attributes) {
        if(attr.scope === 'item') {
          continue;
        }

        const value = attr.modifier.getValue();

        if(!mods[attr.affects]) {
          mods[attr.affects] = {};
        }

        if(mods[attr.affects][attr.type]) {
          mods[attr.affects][attr.type].increase(value);
        } else {
          mods[attr.affects][attr.type] = new (statModifierMap[attr.affects][attr.type])(value);
        }
      }*/
    }

    return mods;
  });

  const values = derived([attributes, modifiers, appState], (state) => {
    const attributes = state[0];
    const mods = state[1];
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
        const modifierClass = statModifierMap[mod.affects][mod.type ?? 'flat'];
        const m = new modifierClass(mod.value);
        stats[mod.affects] = m.modify(scaleValue(attributes[name], mod.span, mod.rate)) as number | number[];
      }
    }

    for(const [s, ms] of Object.entries(mods)) {
      if(!ms.flat) {
        continue;
      }

      stats[s] = ms.flat.modify(stats[s]) as number | number[];
    }
    
    for(const [s, ms] of Object.entries(mods)) {
      if(!ms.percentage) {
        continue;
      }

      stats[s] = ms.percentage.modify(stats[s]) as number | number[];
    }

    stats.dps = [
      Math.round(stats.damage[0] * stats.attackSpeed), 
      Math.round(stats.damage[1] * stats.attackSpeed)
    ];

    return {
      ...stats,
      health: Math.round(stats.health * 100) / 100
    };
  });

  return {
    state,
    attributes,
    equip,
    modifiers,
    equippedItems,
    values
  }
}
