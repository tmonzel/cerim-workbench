import type { DynamicValue, Modifier } from './types';

export class DynamicNumber implements DynamicValue<number> {
  multiplier = 1;
  added: number = 0;
  base: number = 0;

  private _modifiers: Modifier<number>[] = [];
  
  get modifiers(): Modifier<number>[] {
    return this._modifiers;
  }

  constructor(base: number = 0) {
    this.base = base;
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added > 0;
  }

  addModifier(m: Modifier<number>): void {
    this._modifiers.push(m);

    switch(m.type) {
      case 'multiply':
        this.multiplier += (m.value - 1);
        break;
      case 'add':
        this.added += m.value;
    }
  }

  getValue(): number {
    return (this.base + this.added) * this.multiplier;
  }
}