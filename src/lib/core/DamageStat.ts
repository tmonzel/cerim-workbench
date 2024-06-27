import type { Stat } from './types';
import { ComplexDamage } from './values';

export class DamageStat implements Stat {
  value: ComplexDamage;

  constructor(
    readonly name: string,
    base?: ComplexDamage
  ) {
    this.value = base ?? new ComplexDamage();
  }

  isModified(): boolean {
    return false;
  }
}