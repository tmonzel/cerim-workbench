import type { AttributeState } from './attributes';
import { AttributeType, calcAttributeScaling } from './core';
import type { HeroState } from './hero';
import type { AttributeEffectDef } from './types';

const list: AttributeEffect[] = [];

export function addEffect(def: AttributeEffectDef): void {
  list.push(new AttributeEffect(def));
}

export function findEffects(): AttributeEffect[] {
  return list;
}

export class AttributeEffect {
  get attributeId(): string {
    return this.def.attr;
  }

  constructor(private def: AttributeEffectDef) {}

  apply(attributes: AttributeState, hero: HeroState): void {
    const attr = attributes[this.def.attr as AttributeType];

    switch(this.def.affects) {
      case 'def:hol':
        hero.damageNegation.elemental.hol.base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
        break;
      case 'def:fir':
        hero.damageNegation.elemental.fir.base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
        break;
      case 'def:mag':
        hero.damageNegation.elemental.mag.base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
        break;
        case 'def:phy':
          hero.damageNegation.elemental.phy.base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
          break;
      case 'res:vitality':
        hero.resistance.vitality.base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
        break;
      case 'hp':
      case 'fp':
      case 'stamina':
      case 'equipLoad':
      case 'discovery':
        hero.stats[this.def.affects].base += calcAttributeScaling(attr.value + attr.offset, this.def.mutations);
    }
  }
}
