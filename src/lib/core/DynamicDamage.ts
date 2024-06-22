import { FlatDamage } from './values/FlatDamage';
import type { DynamicValue } from './types';

export class DynamicDamage implements DynamicValue<FlatDamage> {
  multiplier = 1;
  base: FlatDamage;
  added: FlatDamage;

  constructor(
    base?: FlatDamage
  ) {
    this.added = new FlatDamage();
    this.base = base ?? new FlatDamage();
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added.avg > 0;
  }

  getValue(): FlatDamage {
    const dmg = this.base.clone();
    dmg.add(this.added);

    return dmg.multiply(this.multiplier);
  }
}