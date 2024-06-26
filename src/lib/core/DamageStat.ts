import type { Stat } from './types';
import { ComplexDamage } from './values';

export class DamageStat implements Stat<ComplexDamage> {
  readonly base: ComplexDamage;
  added: ComplexDamage;
  multiplier = 1;

  constructor(
    readonly name: string,
    base?: ComplexDamage
  ) {
    this.base = base ?? new ComplexDamage();
    this.added = new ComplexDamage();
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added.getTotal() > 0;
  }

  getValue(): ComplexDamage {
    const damage = new ComplexDamage(this.base.value);
    damage.add(this.added.value);
    damage.multiply(this.multiplier);

    return damage;
  }
}