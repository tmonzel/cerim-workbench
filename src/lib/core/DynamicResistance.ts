import type { DynamicValue } from './types';
import { FlatResistance } from './values/FlatResistance';

export class DynamicResistance implements DynamicValue<FlatResistance> {
  multiplier = 1;
  base: FlatResistance = new FlatResistance();
  added: FlatResistance;

  constructor(base?: FlatResistance) {
    this.added = new FlatResistance();
    this.base = base ?? new FlatResistance();
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added.total > 0;
  }

  getValue(): FlatResistance {
    const resistance = this.base.clone();
    resistance.add(this.added);

    return resistance.multiply(this.multiplier);
  }
}