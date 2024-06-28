import { derived } from 'svelte/store';
import { appState, attributeState, equipState } from './state';
import { AttributeStat, AttributeType, DamageStat, DamageType, NumericStat, calcAttributeScaling, type HeroStats } from './core';
import { DynamicNumber } from './core/DynamicNumber';

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  dps: number;
  stats: HeroStats;
  effects: string[];
}

export const heroState = derived([attributeState, equipState, appState], (s) => {
  const [attributes, equip, state] = s;

  const hero: HeroState = {
    level: 0,
    progress: 0,
    attributePoints: 0,
    dps: 0,
    stats: {
      'hp': new NumericStat("Health"),
      'fp': new NumericStat("FP"),
      'stamina': new NumericStat("Stamina"),
      'discovery': new NumericStat("Discovery"),
      'weight': new NumericStat("Weight"),
      'equipLoad': new NumericStat("Equip Load"),
      'attackSpeed': new NumericStat("Attack Speed"),

      'res:immunity': new NumericStat("Immunity"),
      'res:robustness': new NumericStat("Robustness"),
      'res:focus': new NumericStat("Focus"),
      'res:vitality': new NumericStat("Vitality"),
      'res:poise': new NumericStat("Poise"),

      'def:standard': new NumericStat("Standard Defense"),
      'def:strike': new NumericStat("Strike Defense"),
      'def:slash': new NumericStat("Slash Defense"),
      'def:pierce': new NumericStat("Pierce Defense"),
      'def:hol': new NumericStat("Holy Defense"),
      'def:lit': new NumericStat("Lightning Defense"),
      'def:fir': new NumericStat("Fire Defense"),
      'def:mag': new NumericStat("Magic Defense"),

      'attributes': new AttributeStat("Attributes"),
      'damage': new DamageStat("Attack Power"),
      
      'guard:sta': new NumericStat("Stability"),
      'guard:res': new NumericStat("Resistance"),
      'guard:phy': new NumericStat("Physical Guard"),
      'guard:mag': new NumericStat("Magic Guard"),
      'guard:fir': new NumericStat("Fire Guard"),
      'guard:lit': new NumericStat("Lightning Guard"),
      'guard:hol': new NumericStat("Holy Guard")
    },
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Summarize resistance
    if(item.resistance) {
      hero.stats['res:immunity'].value.add(item.resistance.immunity);
      hero.stats['res:robustness'].value.add(item.resistance.robustness);
      hero.stats['res:focus'].value.add(item.resistance.focus);
      hero.stats['res:vitality'].value.add(item.resistance.vitality);
      hero.stats['res:poise'].value.add(item.resistance.poise);
    }

    // Summarize defense
    if(item.defense) {
      hero.stats['def:standard'].value.add(item.defense.physical.standard);
      hero.stats['def:strike'].value.add(item.defense.physical.strike);
      hero.stats['def:slash'].value.add(item.defense.physical.slash);
      hero.stats['def:pierce'].value.add(item.defense.physical.pierce);
      
      hero.stats['def:mag'].value.add(item.defense.elemental.mag);
      hero.stats['def:fir'].value.add(item.defense.elemental.fir);
      hero.stats['def:lit'].value.add(item.defense.elemental.lit);
      hero.stats['def:hol'].value.add(item.defense.elemental.hol);
    }

    // Summarize guard
    if(item.guard) {
      hero.stats['guard:sta'].value.add(item.guard.sta);
      hero.stats['guard:res'].value.add(item.guard.res);
      
      hero.stats['guard:phy'].value.add(item.guard.phy);
      hero.stats['guard:mag'].value.add(item.guard.mag);
      hero.stats['guard:fir'].value.add(item.guard.fir);
      hero.stats['guard:lit'].value.add(item.guard.lit);
      hero.stats['guard:hol'].value.add(item.guard.hol);
    }

    if(item.effects) {
      hero.effects.push(...item.effects);
    }

    for(const mod of item.modifiers) {
      if(typeof mod.value !== 'number') {
        continue;
      }
      
      switch(mod.affects) {
        case 'stamina':
        case 'hp':
        case 'fp':
        case 'discovery':
        case 'equipLoad':
        case 'res:immunity':
        case 'res:poise':
        case 'res:vitality':
        case 'def:standard':
        case 'def:hol':
        case 'def:lit':
        case 'def:mag':
        case 'def:fir':
          if(mod.type === 'percentual') {
            hero.stats[mod.affects].value.addMultiplier(mod.value - 1);
          } else {
            hero.stats[mod.affects].value.addOffset(mod.value);
          }
      }
    }

    // Sum item damage
    for(const damageType in item.scaledDamage) {
      hero.stats['damage'].value.add({ [damageType]: item.scaledDamage[damageType as DamageType] })
    }

    // Sum item weights
    hero.stats.weight.value.add(item.weight);
  }

  if(!hero.stats.attackSpeed.value.isPresent()) {
    // Set attacks per second to one if no weapon equipped
    hero.stats.attackSpeed.value.set(1);
  }

  // Apply effects
  for(const effect of state.effects) {
    const attr = attributes[effect.attr as AttributeType];
    
    switch(effect.affects) {
      case 'hp':
      case 'fp':
      case 'stamina':
      case 'equipLoad':
      case 'discovery':
      case 'res:vitality':
      case 'def:standard':
      case 'def:mag':
      case 'def:fir':
      case 'def:hol':
        hero.stats[effect.affects].value.add(calcAttributeScaling(attr.value + attr.offset, effect.mutations));
    }
  }

  const attackDamage = hero.stats['damage'].value;
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints;
  hero.progress = (hero.level / state.maxLevel);

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.value.total;

  return hero;
});
