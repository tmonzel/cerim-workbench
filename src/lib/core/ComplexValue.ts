import type { DynamicNumber } from './DynamicNumber';

type ValueRecord<T extends string> = Record<T, DynamicNumber>;

export type ComplexValueInterface<T extends string> = {
  add(value: ValueRecord<T>): void;
  get value(): ValueRecord<T>;
}

export class ComplexValue<T extends string> implements ComplexValueInterface<T> {
  protected _value: ValueRecord<T>;

  get value(): ValueRecord<T> {
    return this._value;
  }

  get modified(): boolean {
    return false;
  }
  
  constructor(value: ValueRecord<T>) {
    this._value = { ...value };
  }

  values(): number[] {
    return Object.values(this._value);
  }

  keys(): T[] {
    return Object.keys(this._value) as T[];
  }

  add(value: Partial<ValueRecord<T>>): void {
    for(const k in value) {
      this._value[k].add(value[k]?.flat ?? 0);
    }
  }

  multiply(amount: number): void {
    for(const k in this._value) {
      this._value[k].addMultiplier(amount - 1);
    }
  }

  isPresent(key: T): boolean {
    return this._value[key].isPresent();
  }

  getPresentValues(): Partial<ValueRecord<T>> {
    const values: Partial<ValueRecord<T>> = {};

    for(const k in this._value) {
      if(!this._value[k].isPresent()) {
        continue;
      }

      values[k] = this._value[k];
    }

    return values;
  }

  getValueDistribution(): { amount: number; value: number; key: T }[] {
    const dist: { amount: number; value: number; key: T }[] = [];
    const total = this.getTotal();
    const n = 100 / total;

    for(const k in this._value) {
      if(!this._value[k].isPresent()) {
        continue;
      }

      const total = this._value[k].total;

      dist.push({ 
        key: k,
        value: total,
        amount: Math.round(n * total) / 100 
      });
    }
    
    return dist;
  }

  get(key: T): number {
    return this._value[key].total;
  }

  getTotal(): number {
    let total = 0;

    for(const k in this._value) {
      total += this._value[k].total;
    }

    return total;
  }
}