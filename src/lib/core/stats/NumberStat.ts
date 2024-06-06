import type { Stat } from '$lib/types';
import type { FlatNumber } from '../types';

export class NumberStat implements Stat<number> {
  multiplier = 1;
  added: FlatNumber = { value: 0, type: 'flat' };
  private scale = 0;

  constructor(
    private _value: number = 0
  ) {}

  reset(): void {
    this.added.value = 0;
    this.multiplier = 1;
    this.scale = 0;
  }

  hasAdded(): boolean {
    return this.added.value !== 0;
  }

  isModified(): boolean {
    return this.multiplier !== 1 || this.added.value !== 0;
  }

  set(value: number): void {
    this._value = value;
  }

  add(v: number): void {
    this.added.value += v;
  }

  getTotal(): number {
    return (this._value + this.added.value + this.scale) * this.multiplier;
  }

  toString(): string {
    return String(Math.round(this.getTotal() * 100) / 100);
  }

  setScale(scale: number): void {
    this.scale = scale;
  }
}