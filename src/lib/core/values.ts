import type { DamageValue } from '$lib/types';
import { roundValue } from './helpers';

export class PercentageNumber {
  constructor(readonly num: number) {}

  toString(): string {
    return `${this.num > 0 ? '+' : ''}${Math.round(this.num * 100)}%`;
  }
}

export class DamageNumber {
  private _num!: DamageValue;
  private average = 0;

  constructor(num: DamageValue = [0, 0]) {
    this.set(num);
  }

  get num(): DamageValue {
    return this._num;
  }

  set(num: DamageValue): void {
    this._num = num;
    
    const sumDmg = this._num[0] + this._num[1];
    
    if(sumDmg > 0) {
      this.average = Math.round((sumDmg / 2) * 100) / 100;
    } else {
      this.average = 0;
    }
  }

  toString(): string {
    return `${this.average > 0 ? '+' : ''}${roundValue(this._num[0])}-${roundValue(this._num[1])} (${this.average})`;
  }
}

export class FlatNumber {
  constructor(readonly num: number) {}

  toString(): string {
    return `${this.num > 0 ? '+' : ''}${Math.round(this.num * 100) / 100}`;
  }
}