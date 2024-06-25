import { derived } from 'svelte/store';
import { appState, attributeState, equipState } from './state';
import { AttributeType, DynamicNumber, calcAttributeScaling, type HeroStats } from './core';
import { DynamicAttribute } from './core/DynamicAttribute';
import { DynamicAttack } from './core/DynamicAttack';

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
      'hp': new DynamicNumber("Health"),
      'fp': new DynamicNumber("FP"),
      'stamina': new DynamicNumber("Stamina"),
      'discovery': new DynamicNumber("Discovery"),
      'weight': new DynamicNumber("Weight"),
      'equipLoad': new DynamicNumber("Equip Load"),
      'damage': new DynamicAttack("Attack Power"),
      'attackSpeed': new DynamicNumber("Attack Speed"),
      'res:immunity': new DynamicNumber("Immunity"),
      'res:robustness': new DynamicNumber("Robustness"),
      'res:focus': new DynamicNumber("Focus"),
      'res:vitality': new DynamicNumber("Vitality"),
      'res:poise': new DynamicNumber("Poise"),
      'def:strike': new DynamicNumber("Strike Defense"),
      'def:slash': new DynamicNumber("Slash Defense"),
      'def:pierce': new DynamicNumber("Pierce Defense"),
      'def:phy': new DynamicNumber("Physical Defense"),
      'def:hol': new DynamicNumber("Holy Defense"),
      'def:lit': new DynamicNumber("Lightning Defense"),
      'def:fir': new DynamicNumber("Fire Defense"),
      'def:mag': new DynamicNumber("Magic Defense"),
      'attributes': new DynamicAttribute("Attributes"),
    },
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Resistance summary
    hero.stats['res:immunity'].base += item.resistance.immunity;
    hero.stats['res:robustness'].base += item.resistance.robustness;
    hero.stats['res:focus'].base += item.resistance.focus;
    hero.stats['res:vitality'].base += item.resistance.vitality;
    hero.stats['res:poise'].base += item.resistance.poise;

    // Defense summary
    hero.stats['def:strike'].base += item.damageNegation.attack.strike;
    hero.stats['def:slash'].base += item.damageNegation.attack.slash;
    hero.stats['def:pierce'].base += item.damageNegation.attack.pierce;
    
    hero.stats['def:phy'].base +=  item.damageNegation.elemental.phy;
    hero.stats['def:mag'].base +=  item.damageNegation.elemental.mag;
    hero.stats['def:fir'].base +=  item.damageNegation.elemental.fir;
    hero.stats['def:lit'].base +=  item.damageNegation.elemental.lit;
    hero.stats['def:hol'].base +=  item.damageNegation.elemental.hol;

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
        case 'def:phy':
          if(mod.type === 'percentual') {
            hero.stats[mod.affects].multiplier += mod.value - 1;
          } else {
            hero.stats[mod.affects].added += mod.value;
          }
      }
    }
    
    // Sum item damage
    hero.stats['damage'].base.add(item.attack);

    // Sum item weights
    hero.stats.weight.base += item.weight;
  }

  if(hero.stats.attackSpeed.base === 0) {
    // Set attacks per second to one if no weapon equipped
    hero.stats.attackSpeed.base = 1;
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
      case 'def:phy':
      case 'def:mag':
      case 'def:fir':
      case 'def:hol':
        hero.stats[effect.affects].base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
    }
  }

  const attackDamage = hero.stats['damage'].getValue();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints;
  hero.progress = (hero.level / state.maxLevel);

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.getValue();

  return hero;
});
