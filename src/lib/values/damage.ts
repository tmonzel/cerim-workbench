export class Damage {
  readonly type: number | null;

  private _min: number;
  private _max: number;

  private initialValue: { min: number; max: number };

  constructor(
    value: number[] = [0, 0, 0]
  ) {
    this.type = value[2] ?? null;
    this.initialValue = { min: value[0], max: value[1] };

    this._min = this.initialValue.min;
    this._max = this.initialValue.max;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get avg(): number {
    return Math.round((this.min + this.max) / 2);
  }

  increase(amount: number): void {
    this._min += this._min * amount;
    this._max += this._max * amount;
  }

  multiply(amount: number): void {
    this._min *= amount;
    this._max *= amount;
  }

  add(value: number | number[]): void {
    if(!Array.isArray(value)) {
      value = [value, value];
    }

    this._min += value[0];
    this._max += value[1];
  }

  get(): number[] {
    const v = [this._min, this._max];
    
    if(typeof this.type === 'number') {
      v.push(this.type);
    }

    return v;
  }

  set(value: number[]): void {
    this._min = value[0];
    this._max = value[1];
  }

  reset(): void {
    this._min = this.initialValue.min;
    this._max = this.initialValue.max;     
  }

  toString(): string {
    return `${Math.round(this._min * 10) / 10}-${Math.round(this._max * 10) / 10} (${this.avg})`;
  }
}