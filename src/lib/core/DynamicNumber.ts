import type { DynamicValue } from './types';

export class DynamicNumber implements DynamicValue<number> {
  multiplier = 1;
  readonly added: number[];

  constructor(
    private _value: number = 0
  ) {
    this.added = [];
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.added.length > 0;
  }

  set(value: number): void {
    this._value = value;
  }

  getAdded(): number {
    return this.added.reduce((p, c) => p + c, 0);
  }

  getTotal(): number {
    return (this._value + this.getAdded()) * this.multiplier;
  }
}