type ValueRecord<T extends string> = Record<T, number>;

export type ComplexValueInterface<T extends string> = {
  add(value: ValueRecord<T>): void;
  get value(): ValueRecord<T>;
}

export class ComplexValue<T extends string> implements ComplexValueInterface<T> {
  protected _value: ValueRecord<T>;
  protected _origin: ValueRecord<T>;

  get value(): ValueRecord<T> {
    return this._value;
  }
  
  constructor(value: ValueRecord<T>) {
    this._value = { ...value };
    this._origin = { ...value };
  }

  reset(): void {
    this._value = { ...this._origin };
  }

  values(): number[] {
    return Object.values(this._value);
  }

  keys(): T[] {
    return Object.keys(this._value) as T[];
  }

  add(value: Partial<ValueRecord<T>>): void {
    for(const k in value) {
      this._value[k] += value[k] ?? 0;
    }
  }

  multiply(amount: number): void {
    for(const k in this._value) {
      this._value[k] *= amount;
    }
  }

  isPresent(key: T): boolean {
    return this._value[key] > 0;
  }

  getPresentValues(): Partial<ValueRecord<T>> {
    const values: Partial<ValueRecord<T>> = {};

    for(const k in this._value) {
      if(this._value[k] === 0) {
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
      if(this._value[k] === 0) {
        continue;
      }

      dist.push({ 
        key: k,
        value: this._value[k],
        amount: Math.round(n * this._value[k]) / 100 
      });
    }
    
    return dist;
  }

  get(key: T): number {
    return this._value[key];
  }

  getTotal(): number {
    let total = 0;

    for(const k in this._value) {
      total += this._value[k];
    }
    

    return total;
  }
}