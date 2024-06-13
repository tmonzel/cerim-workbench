import { DamageType, type ResistanceValue } from '$lib/types';

export class FlatResistance {
  resistancesByType: { [key: string]: number } = {
    [DamageType.PHYSICAL]: 0,
    [DamageType.FIRE]: 0,
    [DamageType.COLD]: 0,
    [DamageType.LIGHTNING]: 0,
    [DamageType.POISON]: 0
  }

  constructor(value: ResistanceValue[] = []) {
    this.set(value);
  }

  add(value: FlatResistance): FlatResistance {
    for(const t of Object.keys(this.resistancesByType)) {
      this.resistancesByType[t] += value.resistancesByType[t];
    }

    return this;
  }

  multiply(amount: number): FlatResistance {
    for(const t of Object.keys(this.resistancesByType)) {
      this.resistancesByType[t] *= amount;
    }

    return this;
  }

  set(value: ResistanceValue[]): void {
    for(const rv of value) {
      this.resistancesByType[rv[1]] += rv[0];
    }
  }

  getValue(): ResistanceValue[] {
    return Object.entries(this.resistancesByType).map(([t, v]) => ([v, Number(t)]));
  }
}
