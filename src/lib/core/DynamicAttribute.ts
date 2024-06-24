import type { DynamicValue } from './types';
import { FlatAttribute } from './values/FlatAttribute';

export class DynamicAttribute implements DynamicValue<FlatAttribute> {
  multiplier = 1;
  readonly added: FlatAttribute;

  constructor(
    readonly base: FlatAttribute = new FlatAttribute()
  ) {
    this.added = new FlatAttribute();
  }

  isModified(): boolean {
    return this.multiplier !== 1;
  }

  hasAdded(): boolean {
    return this.added.getTotal() > 0;
  }

  getValue(): FlatAttribute {
    const attr = this.base.clone();
    attr.add(this.added);

    return attr;
  }
}