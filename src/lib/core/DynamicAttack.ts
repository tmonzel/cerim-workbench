import { AttackDamageStat } from './stats';
import type { DynamicValue } from './types';

export class DynamicAttack implements DynamicValue<AttackDamageStat> {
  readonly base: AttackDamageStat;
  added: AttackDamageStat;
  multiplier = 1;

  constructor(
    base?: AttackDamageStat, 
    readonly attackSpeed: number = 1
  ) {
    this.base = base ?? new AttackDamageStat();
    this.added = new AttackDamageStat();
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

  getValue(): AttackDamageStat {
    const damage = new AttackDamageStat(this.base);
    damage.add(this.added);
    damage.multiply(this.multiplier);

    return damage;
  }
}