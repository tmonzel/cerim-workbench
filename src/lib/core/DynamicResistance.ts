import type { DynamicValue, Modifier } from './types';
import { FlatResistance } from './values/FlatResistance';

export class DynamicResistance implements DynamicValue<FlatResistance> {
  multiplier = 1;
  base: FlatResistance = new FlatResistance();
  added: FlatResistance;

  private _modifiers: Modifier<FlatResistance>[] = [];

  get modifiers(): Modifier<FlatResistance>[] {
    return this._modifiers;
  }

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

  addModifier(m: Modifier<FlatResistance>): void {
    this._modifiers.push(m);
  }

  getValue(): FlatResistance {
    const resistance = this.base.clone();
    resistance.add(this.added);

    for(const mod of this._modifiers) {
      if(mod.type === 'add') {
        resistance.add(mod.value);
        continue;
      }

      if(mod.type === 'multiply') {
        resistance.multiply(mod.value);
      }
    }

    return resistance.multiply(this.multiplier);
  }
}