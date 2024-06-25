import { derived } from 'svelte/store';
import { appState, attributeState, equipState } from './state';
import { AttackDamageType, AttributeType, DynamicNumber, calcAttributeScaling } from './core';
import { DynamicAttribute } from './core/DynamicAttribute';
import { DynamicAttack } from './core/DynamicAttack';

export type HeroState = {
  level: number;
  progress: number;
  attributePoints: number;
  dps: number;
  stats: {
    hp: DynamicNumber;
    fp: DynamicNumber;
    stamina: DynamicNumber;
    discovery: DynamicNumber;
    weight: DynamicNumber;
    equipLoad: DynamicNumber;
    attackSpeed: DynamicNumber;
    attributes: DynamicAttribute;
  };

  attack: DynamicAttack;
  
  resistance: {
    immunity: DynamicNumber;
    robustness: DynamicNumber;
    focus: DynamicNumber;
    vitality: DynamicNumber;
    poise: DynamicNumber;
  },

  damageNegation: {
    strike: DynamicNumber;
    slash: DynamicNumber;
    pierce: DynamicNumber;
    elemental: {
      [AttackDamageType.PHYSICAL]: DynamicNumber,
      [AttackDamageType.MAGIC]: DynamicNumber; 
      [AttackDamageType.FIRE]: DynamicNumber;
      [AttackDamageType.LIGHTNING]: DynamicNumber; 
      [AttackDamageType.HOLY]: DynamicNumber;
    }
  },
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
      hp: new DynamicNumber(),
      fp: new DynamicNumber(),
      stamina: new DynamicNumber(),
      discovery: new DynamicNumber(),
      weight: new DynamicNumber(),
      equipLoad: new DynamicNumber(),
      attackSpeed: new DynamicNumber(),
      attributes: new DynamicAttribute()
    },
    
    attack: new DynamicAttack(),
    resistance: {
      immunity: new DynamicNumber(),
      robustness: new DynamicNumber(),
      focus: new DynamicNumber(),
      vitality: new DynamicNumber(),
      poise: new DynamicNumber(),
    },

    damageNegation: {
      slash: new DynamicNumber(),
      strike: new DynamicNumber(),
      pierce: new DynamicNumber(),
      elemental: {
        mag: new DynamicNumber(),
        hol: new DynamicNumber(),
        phy: new DynamicNumber(),
        fir: new DynamicNumber(),
        lit: new DynamicNumber()
      }
    },
    effects: []
  };

  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    // Resistance summary
    hero.resistance.immunity.base += item.resistance.immunity;
    hero.resistance.robustness.base += item.resistance.robustness;
    hero.resistance.focus.base += item.resistance.focus;
    hero.resistance.vitality.base += item.resistance.vitality;
    hero.resistance.poise.base += item.resistance.poise;

    // Damage negation summary
    hero.damageNegation.strike.base += item.damageNegation.attack.strike;
    hero.damageNegation.slash.base += item.damageNegation.attack.slash;
    hero.damageNegation.pierce.base += item.damageNegation.attack.pierce;
    
    hero.damageNegation.elemental.phy.base +=  item.damageNegation.elemental.phy;
    hero.damageNegation.elemental.mag.base +=  item.damageNegation.elemental.mag;
    hero.damageNegation.elemental.fir.base +=  item.damageNegation.elemental.fir;
    hero.damageNegation.elemental.lit.base +=  item.damageNegation.elemental.lit;
    hero.damageNegation.elemental.hol.base +=  item.damageNegation.elemental.hol;

    for(const mod of item.modifiers) {
      if(typeof mod.value !== 'number') {
        continue;
      }

      if(mod.type === 'percentual') {
        switch(mod.affects) {
          case 'stamina':
          case 'hp':
          case 'fp':
          case 'discovery':
          case 'equipLoad':
            hero.stats[mod.affects].multiplier += mod.value - 1;
            break;
          case 'res:immunity':
            hero.resistance.immunity.multiplier += mod.value - 1;
            break;
          case 'res:poise':
            hero.resistance.poise.multiplier += mod.value - 1;
            break;
          case 'res:vitality':
            hero.resistance.vitality.multiplier += mod.value - 1;
            break;
          case 'def:phy':
            hero.damageNegation.elemental.phy.multiplier += mod.value - 1;
            break;
        }
      }
    }
    
    // Sum item damage
    hero.attack.base.add(item.attack.getValue());

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
      case 'def:hol':
        hero.damageNegation.elemental.hol.base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
        break;
      case 'def:fir':
        hero.damageNegation.elemental.fir.base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
        break;
      case 'def:mag':
        hero.damageNegation.elemental.mag.base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
        break;
        case 'def:phy':
          hero.damageNegation.elemental.phy.base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
          break;
      case 'res:vitality':
        hero.resistance.vitality.base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
        break;
      case 'hp':
      case 'fp':
      case 'stamina':
      case 'equipLoad':
      case 'discovery':
        hero.stats[effect.affects].base += calcAttributeScaling(attr.value + attr.offset, effect.mutations);
    }
  }

  const attackDamage = hero.attack.getValue();
  const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c.value, 0);

  hero.level = Math.floor(numDistributedPoints / state.attributePointsPerLevel);
  hero.attributePoints = state.attributePointsPerLevel * state.maxLevel - numDistributedPoints;
  hero.progress = (hero.level / state.maxLevel);

  hero.dps += attackDamage.getTotal();
  hero.dps *= hero.stats.attackSpeed.getValue();

  return hero;
});
