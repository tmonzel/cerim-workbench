import { type Stat } from './types';
import { ComplexAttributes } from './values';

export class AttributeStat implements Stat<ComplexAttributes> {
  readonly base: ComplexAttributes;
  added: ComplexAttributes;
  multiplier = 1;

  constructor(
    readonly name: string,
    base?: ComplexAttributes
  ) {
    this.base = base ?? new ComplexAttributes();
    this.added = new ComplexAttributes();
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.hasAdded();
  }

  hasAdded(): boolean {
    return this.added.getTotal() > 0;
  }

  getValue(): ComplexAttributes {
    const damage = new ComplexAttributes(this.base.value);
    damage.add(this.added.value);
    damage.multiply(this.multiplier);

    return damage;
  }
}