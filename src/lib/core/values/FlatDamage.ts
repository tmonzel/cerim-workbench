import { DamageType, type DamageValue } from '$lib/types';

export class FlatDamage {
  private typedValues: { [key: string]: number[] } = {
    [DamageType.PHYSICAL]: [0, 0],
    [DamageType.FIRE]: [0, 0],
    [DamageType.COLD]: [0, 0],
    [DamageType.LIGHTNING]: [0, 0],
    [DamageType.POISON]: [0, 0]
  }

  private total = [0, 0];
  private average = 0;

  constructor(value: DamageValue[] = []) {
    this.set(value);
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

  clone(): FlatDamage {
    return new FlatDamage(this.getValue());
  }

  reset(): void {
    for(const key of Object.keys(DamageType)) {
      this.typedValues[key] = [0, 0];
    }
  }

  set(value: DamageValue[]): void {
    for(const d of value) {
      this.typedValues[d[2]] = [d[0], d[1]];
    }

    this.update();
  }

  add(value: FlatDamage): FlatDamage {
    const damage: DamageValue[] = [];

    for(const t of Object.keys(this.typedValues)) {
      damage.push([
        this.typedValues[t][0] + value.typedValues[t][0], 
        this.typedValues[t][1] + value.typedValues[t][1],
        Number(t)
      ]);
    }

    this.set(damage);

    return this;
  }

  multiply(amount: number): FlatDamage {
    const damage: DamageValue[] = [];

    for(const [t, v] of Object.entries(this.typedValues)) {
      damage.push([v[0] * amount, v[1] * amount, Number(t)])
    }

    this.set(damage);

    return this;
  }

  getTotal(): number[] {
    return this.total;
  }

  getTypeDistribution(): { [key: string]: number } {
    const dist: { [key: string]: number } = {};
    const fullAvg = Object.values(this.typedValues)
      .reduce((p, c) => { return p + Math.round((c[0] + c[1]) / 2)}, 0);
    
    const n = 100 / fullAvg;

    for(const [k, v] of Object.entries(this.typedValues)) {
      dist[k] = Math.round(n * Math.round((v[0] + v[1]) / 2)) / 100;
    }

    return dist;
  }

  getValue(): DamageValue[] {
    const r: DamageValue[] = [];

    for(const [t, v] of Object.entries(this.typedValues)) {
      r.push({ [0]: v[0], [1]: v[1], [2]: Number(t) });
    }

    return r;
  }

  private update(): void {
    this.total = [0, 0];
    this.average = 0;
    
    const values = [ ...Object.values(this.typedValues)];

    for(const v of values) {
      this.total[0] += v[0];
      this.total[1] += v[1];
    }

    const sum = this.total[0] + this.total[1];

    if(sum > 0) {
      this.average = Math.round((sum / 2) * 100) / 100;
    }
  }

  toString(): string {
    return `${this.min > 0 ? '+' : ''}${Math.round(this.min * 100) / 100}-${Math.round(this.max * 100) / 100}(${Math.round(this.average * 100) / 100})`;
  }
}