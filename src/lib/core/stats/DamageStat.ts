import { ComplexDamage } from '../ComplexDamage';
import type { DamageValue, Stat } from '$lib/types';

export class DamageStat implements Stat<ComplexDamage> {
  multiplier = 1;
  private added: ComplexDamage;
  private scale: ComplexDamage;

  constructor(
    private value?: DamageValue[]
  ) {
    this.added = new ComplexDamage();
    this.scale = new ComplexDamage();
  }

  reset(): void {
    this.added = new ComplexDamage();
    this.scale = new ComplexDamage();
    this.multiplier = 1;
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.added.getTotal()[0] > 0 || this.scale.getTotal()[0] > 0;
  }

  add(v: ComplexDamage): void {
    this.added.add(v.getValue());
  }

  getAdded(): ComplexDamage {
    return this.added;
  }

  getTotal(): ComplexDamage {
    const dmg = new ComplexDamage(this.value);
    dmg.add(this.added.getValue());
    dmg.add(this.scale.getValue());
    dmg.multiply(this.multiplier);

    return dmg;
  }

  setScale(scale: ComplexDamage): void {
    this.scale = scale;
  }
}