import { DamageType, type ResistanceValue } from '$lib/types';

export class FlatResistance {
  private _value: { [key: string]: number } = {
    [DamageType.PHYSICAL]: 0,
    [DamageType.FIRE]: 0,
    [DamageType.COLD]: 0,
    [DamageType.LIGHTNING]: 0,
    [DamageType.POISON]: 0
  };

  private _total: number = 0;

  get value(): { [key: string]: number } {
    return this._value;
  }

  get total(): number {
    return this._total;
  }

  constructor(value: ResistanceValue[] = []) {
    this.set(value);
  }

  clone(): FlatResistance {
    return new FlatResistance(
      Object.entries(this._value).map(([t, v]) => [v, Number(t)])
    );
  }

  isPresent(): boolean {
    return this._total > 0;
  }

  add(value: FlatResistance): FlatResistance {
    for(const t of Object.keys(this._value)) {
      this._value[t] += value._value[t];
    }

    this.update();

    return this;
  }

  multiply(amount: number): FlatResistance {
    for(const t of Object.keys(this._value)) {
      this._value[t] *= amount;
    }

    this.update();

    return this;
  }

  set(value: ResistanceValue[]): void {
    for(const rv of value) {
      this._value[rv[1]] += rv[0];
    }

    this.update();
  }

  private update(): void {
    this._total = 0;

    for(const num of Object.values(this._value)) {
      this._total += num;
    }
  }
}
