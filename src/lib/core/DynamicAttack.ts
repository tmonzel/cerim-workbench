import type { DynamicValue } from './types';
import { AttackDamage } from './values/AttackDamage';

export class DynamicAttack implements DynamicValue<AttackDamage> {
  readonly base: AttackDamage;
  added: AttackDamage;
  multiplier = 1;

  constructor(base?: AttackDamage) {
    this.base = base ?? new AttackDamage();
    this.added = new AttackDamage();
  }

  reset(): void {
    this.base.reset();
    this.added.reset();
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added.getTotal() > 0;
  }

  getValue(): AttackDamage {
    const damage = new AttackDamage(this.base);
    damage.add(this.added);
    damage.multiply(this.multiplier);

    return damage;
  }
}