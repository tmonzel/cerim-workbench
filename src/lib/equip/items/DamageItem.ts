import type { AttributeState } from '$lib/attribute.store';
import { DamageMutator } from '$lib/math/DamageMutator';
import type { DynamicValue } from '$lib/types';
import { ComplexDamage } from '$lib/values/complex-damage';
import type { ItemAffix, ItemDef } from '../types';
import { Item } from './Item';

export class DamageItem extends Item {
  damage: DynamicValue<ComplexDamage>;

  constructor(def: ItemDef, affixes: ItemAffix[] = []) {
    super(def, affixes);
    
    const base = new ComplexDamage(def.damage ?? []);

    this.damage = {
      base,
      value: base
    };

    this.damage.value = this.getModifiedDamage();
  }

  getModifiedDamage(): ComplexDamage {
    const damage = new ComplexDamage(this.damage.base.get());

    return damage;
  }

  applyAttributeChange(attributes: AttributeState): void {
    this.damage.value = this.getModifiedDamage();

    const modDefs = this.def.modifiers ?? [];

    for(const mod of modDefs) {
      const attr = attributes[mod.attr];
      const base = mod.value;

      if(Array.isArray(base)) {
        // Mutate damage
        const mutator = new DamageMutator(base, mod.mutations ?? []);
        this.damage.value.add(mutator.mutate(attr.value).get());
      }
    }
  }
}