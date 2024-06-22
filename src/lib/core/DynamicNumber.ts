import type { DynamicValue } from './types';

export class DynamicNumber implements DynamicValue<number> {
  multiplier = 1;
  added: number = 0;
  base: number = 0;

  constructor(base: number = 0) {
    this.base = base;
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added > 0;
  }

  getValue(): number {
    return (this.base + this.added) * this.multiplier;
  }
}