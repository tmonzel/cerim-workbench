import { DynamicNumber } from './DynamicNumber';
import type { Stat } from './types';

export class NumericStat implements Stat {
  value: DynamicNumber;

  constructor(readonly name: string, base: number = 0) {
    this.value = new DynamicNumber(base);
  }

  isModified(): boolean {
    return this.value.modified;
  }
}
