import { FlatDamage } from './values/FlatDamage';
import type { DynamicValue, Modifier } from './types';

export class DynamicDamage implements DynamicValue<FlatDamage> {
  multiplier = 1;
  base: FlatDamage;
  added: FlatDamage;

  private _modifiers: Modifier<FlatDamage>[] = [];

  get modifiers(): Modifier<FlatDamage>[] {
    return this._modifiers;
  }

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

  addModifier(m: Modifier<FlatDamage>): void {
    this._modifiers.push(m);
  }

  getValue(): FlatDamage {
    const dmg = this.base.clone();
    dmg.add(this.added);

    for(const mod of this._modifiers) {
      if(mod.type === 'add') {
        dmg.add(mod.value);
        continue;
      }

      if(mod.type === 'multiply') {
        dmg.multiply(mod.value);
      }
    }

    return dmg.multiply(this.multiplier);
  }
}