import type { AttributeValue } from '$lib/types';

export class FlatAttribute {
  private _value: Record<string, number> = {};

  get value(): Record<string, number> {
    return this._value;
  }
  
  constructor(value: AttributeValue[] = []) {
    this.set(value);
  }

  clone(): FlatAttribute {
    return new FlatAttribute(
      Object.entries(this._value).map(([attr, num]) => ([num, attr]))
    );
  }

  set(value: AttributeValue[]): void {
    for(const a of value) {
      this._value[a[1]] = a[0];
    }
  }

  add(attr: FlatAttribute): void {
    for(const [k, v] of Object.entries(attr.value)) {
      if(!this._value[k]) {
        this._value[k] = 0;
      }
      
      this._value[k] += v;
    }
  }
}
