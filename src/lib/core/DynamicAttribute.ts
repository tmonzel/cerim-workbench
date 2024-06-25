import { AttributeStat } from './stats';
import type { DynamicValue } from './types';

export class DynamicAttribute implements DynamicValue<AttributeStat> {
  multiplier = 1;
  readonly added: AttributeStat;

  constructor(
    readonly name: string,
    readonly base: AttributeStat = new AttributeStat()
  ) {
    this.added = new AttributeStat();
  }

  isModified(): boolean {
    return this.multiplier !== 1;
  }

  hasAdded(): boolean {
    return this.added.getTotal() > 0;
  }

  getValue(): AttributeStat {
    const attr = this.base;
    attr.add(this.added);

    return attr;
  }
}