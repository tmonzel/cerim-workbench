import type { DynamicValue } from './types';
import { FlatResistance } from './values/FlatResistance';

export class DynamicResistance implements DynamicValue<FlatResistance> {
  multiplier = 1;
  base: FlatResistance;
  readonly added: FlatResistance[];

  constructor(
    base?: FlatResistance
  ) {
    this.base = base ?? new FlatResistance();
    this.added = [];
  }

  getAdded(): FlatResistance {
    const resist = new FlatResistance();

    for(const added of this.added) {
      resist.add(added);
    }

    return resist;
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.added.length > 0;
  }

  set(value: FlatResistance): void {
    this.base = value;
  }

  getTotal(): FlatResistance {
    const resistance = new FlatResistance(this.base.getValue());
    resistance.add(this.getAdded());

    return resistance;
  }
}