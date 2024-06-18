import { DamageType, type DamageValue } from '$lib/types';

export class FlatDamage {
  private _value: { [key: string]: number[] } = {
    [DamageType.PHYSICAL]: [0, 0],
    [DamageType.FIRE]: [0, 0],
    [DamageType.COLD]: [0, 0],
    [DamageType.LIGHTNING]: [0, 0],
    [DamageType.POISON]: [0, 0]
  }

  private _total = [0, 0];
  private average = 0;

  get value(): { [key: string]: number[] } {
    return this._value;
  }

  get total(): number[] {
    return this._total;
  }

  get min(): number {
    return this.total[0];
  }

  get max(): number {
    return this.total[1];
  }

  get avg(): number {
    return this.average;
  }

  constructor(value: DamageValue[] = []) {
    this.set(value);
  }

  clone(): FlatDamage {
    return new FlatDamage(
      Object.entries(this._value).map(([t, d]) => ([d[0], d[1], Number(t)]))
    );
  }

  isPresent(): boolean {
    return this.total[0] !== 0 || this.total[1] !== 0;
  }

  reset(): void {
    for(const key of Object.keys(DamageType)) {
      this._value[key] = [0, 0];
    }
  }

  set(value: DamageValue[]): void {
    for(const d of value) {
      this._value[d[2]] = [d[0], d[1]];
    }

    this.update();
  }

  add(damage: FlatDamage): FlatDamage {
    for(const t of Object.keys(this._value)) {
      this._value[t] = [
        this._value[t][0] + damage.value[t][0], 
        this._value[t][1] + damage.value[t][1], 
        Number(t)
      ];
    }

    this.update();

    return this;
  }

  multiply(amount: number): FlatDamage {
    for(const t of Object.keys(this._value)) {
      this._value[t] = [
        this._value[t][0] * amount, 
        this._value[t][1] * amount, 
        Number(t)
      ];
    }

    this.update();

    return this;
  }

  getTypeDistribution(): { [key: string]: number } {
    const dist: { [key: string]: number } = {};
    const fullAvg = Object.values(this._value)
      .reduce((p, c) => { return p + Math.round((c[0] + c[1]) / 2)}, 0);
    
    const n = 100 / fullAvg;

    for(const [k, v] of Object.entries(this._value)) {
      dist[k] = Math.round(n * Math.round((v[0] + v[1]) / 2)) / 100;
    }

    return dist;
  }

  private update(): void {
    this._total = [0, 0];
    this.average = 0;

    for(const v of Object.values(this._value)) {
      this._total[0] += v[0];
      this._total[1] += v[1];
    }

    const sum = this._total[0] + this._total[1];

    if(sum > 0) {
      this.average = Math.round((sum / 2) * 100) / 100;
    }
  }

  toString(): string {
    return `${this.min > 0 ? '+' : ''}${Math.round(this.min * 100) / 100}-${Math.round(this.max * 100) / 100}(${Math.round(this.average * 100) / 100})`;
  }
}