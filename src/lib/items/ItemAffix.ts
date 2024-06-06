import { ComplexDamage, DamageNumber, FlatNumber, PercentageNumber } from '$lib/core';
import type { ModifierDef, ModifierScope } from '$lib/modifiers';
import type { HeroStatTypes } from '$lib/types';
import type { Item } from './Item';
import type { ItemAffixDef } from './types';

export class ItemAffix {
  readonly value: FlatNumber | PercentageNumber | DamageNumber;

  constructor(
    private modifierDef: ModifierDef,
    private def: ItemAffixDef
  ) {

    if(modifierDef.affects === 'damage' && modifierDef.type === 'flat') {
      this.value = new DamageNumber(modifierDef.values[def.tier]);
    } else {
      if(modifierDef.type === 'percentual') {
        this.value = new PercentageNumber(modifierDef.values[def.tier]);
      } else {
        this.value = new FlatNumber(modifierDef.values[def.tier]);
      }
    }
  }

  get name(): string {
    return this.modifierDef.name;
  }

  get stat(): HeroStatTypes {
    return this.modifierDef.affects;
  }

  get scope(): ModifierScope {
    return this.modifierDef.scope ?? 'hero';
  }

  get tier(): number {
    return this.def.tier;
  }

  apply(item: Item): void {
    if(this.value instanceof DamageNumber) {
      item.damage.add(new ComplexDamage([this.value.num]));
    } else if(this.value instanceof PercentageNumber) {
      
      switch(this.modifierDef.affects) {
        case 'damage':
        case 'weight':
          item[this.modifierDef.affects].multiplier += this.value.num;
      }


    } else if(this.value instanceof FlatNumber) {
      //item.damage.multiplier += this.value.num;
    }
  }
}
