import type { Stat } from './types';

export class NumericStat implements Stat<number> {
  multiplier = 1;
  added: number = 0;
  base: number = 0;

  constructor(readonly name: string, base: number = 0) {
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