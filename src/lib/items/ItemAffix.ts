import { ComplexDamage, type DamageNumber, type FlatNumber, type PercentageNumber } from '$lib/core';
import type { ModifierDef, ModifierScope } from '$lib/modifiers';
import type { HeroStatTypes } from '$lib/types';
import type { Item } from './Item';
import type { ItemAffixDef } from './types';

export class ItemAffix {
  readonly num: FlatNumber | PercentageNumber | DamageNumber = { value: 0, type: 'flat' };

  constructor(
    private modifierDef: ModifierDef,
    private def: ItemAffixDef
  ) {

    if(modifierDef.affects === 'damage' && modifierDef.type === 'flat') {
      this.num = { type: 'damage', value: modifierDef.values[def.tier] }
    } else {
      if(modifierDef.type === 'percentual') {
        this.num = { type: 'percentual', value: modifierDef.values[def.tier] };
      } else {
        this.num = { type: 'flat', value: modifierDef.values[def.tier] };
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
    if(this.num.type === 'damage') {
      item.damage.add(new ComplexDamage([this.num.value]));
    } else if(this.num.type === 'percentual') {
      
      switch(this.modifierDef.affects) {
        case 'damage':
        case 'weight':
        case 'armor':
          item[this.modifierDef.affects].multiplier += this.num.value;
      }


    } else if(this.num.type === 'flat') {
      //item.damage.multiplier += this.value.num;
    }
  }
}
