import { scaleValue } from '$lib';
import { DamageValue } from './helpers';
import { FlatDamageAttribute, PercentageDamageAttribute, type ItemAttribute } from './item-attribute';
import type { AttributeState, BaseItem, ItemSchema } from './types';

export abstract class Item {
  readonly name: string;
  readonly quality: number = 0.8;
  readonly weight: number = 0;
  readonly effect?: string;

  constructor(
    readonly base: BaseItem, 
    schema: ItemSchema, 
    readonly attributes: ItemAttribute[] = []
  ) {
    this.name = schema.name ?? base.name;
    this.weight = base.weight;
    this.effect = schema.effect;
  }

  abstract update(state?: AttributeState): void;
}

export class DamageItem extends Item {
  baseDamage: DamageValue;
  damage: DamageValue;

  constructor(base: BaseItem, schema: ItemSchema, attributes: ItemAttribute[] = []) {
    super(base, schema, attributes);

    this.baseDamage = base.damage ? new DamageValue(base.damage) : new DamageValue();
    this.damage = new DamageValue(this.baseDamage.get());

    this.update();
  }

  update(state?: AttributeState): void {
    const damage = new DamageValue(this.baseDamage.get());

    if(state && this.base.scaling) {
      let damageIncrease = 0;

      for(const mod of this.base.scaling) {
        if(this.base.damage && state[mod.attr] > 0) {
          damageIncrease += scaleValue(state[mod.attr], mod.span, mod.rate);
        }
      }

      damage.set([
        damage.min + damageIncrease, 
        damage.max + damageIncrease
      ]);
    }
    
    for(const attr of this.attributes) {
      /*if(attr.scope !== 'item') {
        continue;
      }*/

      if(state) {
        attr.applyAttributeChange(state);
      }

      if(attr instanceof PercentageDamageAttribute) {
        damage.multiply(attr.value.get() + 1);
      }

      if(attr instanceof FlatDamageAttribute) {
        damage.add(attr.value.get());
      }

      //attr.apply(this);
    }
    
    this.damage.set(damage.get());
  }
}

export class ArmorItem extends Item {
  armor: number = 0;

  constructor(base: BaseItem, schema: ItemSchema, attributes: ItemAttribute[] = []) {
    super(base, schema, attributes);

    this.armor = base.armor ?? 0;
    this.update();
  }

  update(state?: AttributeState | undefined): void {
    
  }
}

export class TalismanItem extends Item {
  update(state?: AttributeState | undefined): void {
      
  }
}
