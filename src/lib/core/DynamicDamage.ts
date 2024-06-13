import { FlatDamage } from './values/FlatDamage';
import type { DynamicValue } from './types';

export class DynamicDamage implements DynamicValue<FlatDamage> {
  multiplier = 1;
  base: FlatDamage;
  added: FlatDamage[];

  constructor(
    base?: FlatDamage
  ) {
    this.base = base ?? new FlatDamage();
    this.added = [];
  }

  isModified(): boolean {
    return this.multiplier !== 1;
  }

  set(value: FlatDamage): void {
    this.base = value;
  }

  getAdded(): FlatDamage {
    const dmg = new FlatDamage();

    for(const addedDamage of this.added) {
      dmg.add(addedDamage);
    }

    return dmg;
  }

  getTotal(): FlatDamage {
    const dmg = new FlatDamage(this.base.getValue());
    dmg.add(this.getAdded());

    return dmg.multiply(this.multiplier);
  }
}