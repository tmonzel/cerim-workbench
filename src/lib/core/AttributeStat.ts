import { type Stat } from './types';
import { ComplexAttributes } from './values';

export class AttributeStat implements Stat {
  value: ComplexAttributes;

  constructor(
    readonly name: string,
    base?: ComplexAttributes
  ) {
    this.value = base ?? new ComplexAttributes();
  }

  isModified(): boolean {
    return this.value.modified;
  }
}