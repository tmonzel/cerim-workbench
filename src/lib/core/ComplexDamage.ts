import { DamageType, type DamageValue } from '$lib/types';

export class ComplexDamage {
  private typedValues: { [key: string]: number[] } = {
    [DamageType.PHYSICAL]: [0, 0],
    [DamageType.FIRE]: [0, 0],
    [DamageType.LIGHTNING]: [0, 0],
    [DamageType.COLD]: [0, 0],
    [DamageType.POISON]: [0, 0]
  }

  private overall = [0, 0];
  private total = [0, 0];

  constructor(value?: DamageValue[]) {
    this.add(value ?? []);
  }

  clone(): ComplexDamage {
    return new ComplexDamage(this.getValue());
  }

  reset(): void {
    for(const key of Object.keys(DamageType)) {
      this.typedValues[key] = [0, 0];
    }
  }

  set(value: DamageValue[]): void {
    this.reset();
    this.add(value);
  }

  add(value: DamageValue[]): void {
    for(const d of value) {
      const currVal = d[2] !== undefined ? this.typedValues[d[2]] : this.overall;

      if(d[2] !== undefined) {
        this.typedValues[d[2]] = [currVal[0] + d[0], currVal[1] + d[1]];
      } else {
        this.overall = [currVal[0] + this.overall[0], currVal[1] + this.overall[1]];
      }
    }

    this.update();
  }

  multiply(amount: number): void {
    for(const [t, v] of Object.entries(this.typedValues)) {
      this.typedValues[t] = [v[0] * amount, v[1] * amount];
    }

    this.overall = [this.overall[0] * amount, this.overall[1] * amount];

    this.update();
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

    r.push({ [0]: this.overall[0], [1]: this.overall[1] });

    return r;
  }

  private update(): void {
    this.total = [0, 0];
    
    const values = [ ...Object.values(this.typedValues), this.overall];

    for(const v of values) {
      this.total[0] += v[0];
      this.total[1] += v[1];
    }
  }
}