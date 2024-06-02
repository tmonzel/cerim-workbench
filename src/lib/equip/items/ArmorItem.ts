import { Item } from './Item';
import type { ItemAffix, ItemDef } from '../types';
import type { DynamicValue } from '$lib/types';

export class ArmorItem extends Item {
  readonly armor: DynamicValue<number>;

  constructor(def: ItemDef, affixes: ItemAffix[] = []) {
    super(def, affixes);
    const base = def.armor ?? 0;

    this.armor = { base, value: base };
  }
}
