import { Damage } from './damage';
import type { ComplexDamageValue, DamageValue } from './types';

export class ComplexDamage {
  readonly ph = new Damage([0, 0, 0]);
  readonly fi = new Damage([0, 0, 1]);
  readonly li = new Damage([0, 0, 2]);
  readonly all = new Damage([0, 0]);


  private _min: number = 0;
  private _max: number = 0;
  private _scale: number = 0;

  get min(): number {
    return this._min + this._scale;
  }

  get max(): number {
    return this._max + this._scale;
  }

  constructor(value?: ComplexDamageValue | DamageValue) {
    this.set(value ?? []);
  }

  update(): void {
    this._min = 0;
    this._max = 0;
    
    for(const dmg of [this.ph, this.fi, this.li, this.all]) {
      this._min += dmg.min;
      this._max += dmg.max;
    }
  }

  addScale(v: number): void {
    this._scale += v;
  }

  set(value: ComplexDamageValue | DamageValue): void {
    this.ph.reset();
    this.fi.reset();
    this.li.reset();

    this.add(value);
  }

  add(value: ComplexDamageValue | DamageValue): void {
    if(value.length < 2) {
      return;
    }
    
    const dv = this.normalizeDamageValue(value);

    for(const v of dv) {
      switch(v[2]) {
        case 2:
          this.li.add(v);
          break;
        case 1:
          this.fi.add(v);
          break;
        case 0: 
          this.ph.add(v);
          break;
        default:
          // Add to all
          this.all.add(v);
      }
    }

    this.update();
  }

  increase(amount: number): ComplexDamage {
    this.ph.increase(amount);
    this.fi.increase(amount);
    this.li.increase(amount);

    this.update();

    return this;
  }

  getTypeDistribution(): number[] {
    const amount = this.ph.avg + this.fi.avg + this.li.avg;
    
    const n = 100 / amount;

    return [
      Math.round(n * this.ph.avg) / 100,
      Math.round(n * this.fi.avg) / 100,
      Math.round(n * this.li.avg) / 100
    ]
  }

  get(): ComplexDamageValue {
    return [
      this.ph.get(),
      this.fi.get(),
      this.li.get()
    ]
  }

  private normalizeDamageValue(value: ComplexDamageValue | DamageValue): ComplexDamageValue {
    if(!Array.isArray(value[0])) {
      return [[ ...value as DamageValue ]];
    }

    return value as ComplexDamageValue;
  }
}