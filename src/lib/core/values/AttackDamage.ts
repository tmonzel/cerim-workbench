import { AttackDamageType } from '../types';

export class AttackDamage {
  [AttackDamageType.PHYSICAL] = 0;
  [AttackDamageType.MAGIC] = 0;
  [AttackDamageType.FIRE] = 0;
  [AttackDamageType.LIGHTNING] = 0;
  [AttackDamageType.HOLY] = 0;
  [AttackDamageType.FROSTBITE] = 0;
  [AttackDamageType.POISON] = 0;
  [AttackDamageType.HEMORRHAGE] = 0;
  [AttackDamageType.STAMINA] = 0;

  private _origin: Partial<Record<AttackDamageType, number>> = {};

  constructor(value: Partial<Record<AttackDamageType, number>> = {}) {
    for(const k of Object.values(AttackDamageType)) {
      const t = k as AttackDamageType;
      this._origin[t] = this[t] = value[t] ?? 0;
    }
  }

  reset(): void {
    for(const k of Object.values(AttackDamageType)) {
      const t = k as AttackDamageType;
      this[t] = this._origin[t] ?? 0;
    }
  }

  add(damage: AttackDamage): void {
    for(const t of Object.values(AttackDamageType)) {
      this[t] += damage[t] ?? 0;
    }
  }

  multiply(amount: number): void {
    for(const t of Object.values(AttackDamageType)) {
      this[t] *= amount;
    }
  }

  getTotal(): number {
    return Object
      .values(AttackDamageType)
      .map(type => this[type])
      .reduce((p, c) => p + c, 0);
  }
}