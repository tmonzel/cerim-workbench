import type { Stat } from '$lib/types';

export class NumberStat implements Stat<number> {
  multiplier = 1;
  private added = 0;
  private scale = 0;

  constructor(
    private _value: number = 0
  ) {}

  reset(): void {
    this.added = 0;
    this.multiplier = 1;
    this.scale = 0;
  }

  isModified(): boolean {
    return ((this._value + this.added) * this.multiplier) !== this._value;
  }

  set(value: number): void {
    this._value = value;
  }

  add(v: number): void {
    this.added += v;
  }

  getAdded(): number {
    return this.added;
  }

  getTotal(): number {
    return (this._value + this.added + this.scale) * this.multiplier;
  }

  toString(): string {
    return String(Math.round(this.getTotal() * 100) / 100);
  }

  setScale(scale: number): void {
    this.scale = scale;
  }
}