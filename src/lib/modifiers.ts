export type Modifier<T = unknown> = {
  increase(value: T): void;
  modify(stat: T): T;
  getValue(): T;
}

export type StatModifiers = { [stat: string]: { [type: string]: Modifier } }

export class FlatModifier implements Modifier<number> {
  constructor(
    private value: number = 0
  ) {}

  increase(value: number): void {
    this.value += value;
  }

  modify(stat: number): number {
    return stat + this.value;
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return `${this.value > 0 ? '+' : ''} ${this.value}`;
  }
}

export class PercentageModifier implements Modifier<number> {
  constructor(
    private value: number = 0
  ) {}

  increase(value: number): void {
    this.value += value;
  }

  modify(stat: number): number {
    return stat + (stat * this.value);
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return `${this.value > 0 ? '+' : '-'} ${Math.round(this.value * 100)} %`;
  }
}

export class FlatDamageModifier implements Modifier<number[]> {
  private min: number;
  private max: number;

  constructor(
    value: number[] = [0, 0]
  ) { 
    this.min = value[0];
    this.max = value[1];
  }

  increase(value: number[]): void {
    this.min += value[0];
    this.max += value[1];
  }

  modify(stat: number[]): number[] {
    return [stat[0] + this.min, stat[1] + this.max];
  }

  getValue(): number[] {
    return [this.min, this.max];
  }

  toString(): string {
    const avg = Math.round((this.min + this.max) / 2);
    return `${avg > 0 ? '+' : '-'} ${Math.round(this.min * 10) / 10}-${Math.round(this.max * 10) / 10} (${avg})`;
  }
}

export class PercentageDamageModifier implements Modifier<number[]> {
  private min: number;
  private max: number;
  private scale: number = 0;

  constructor(
    value: number[] = [0, 0]
  ) { 
    this.min = value[0];
    this.max = value[1];
  }

  setScale(scale: number): void {
    this.scale = scale;
  }

  getMinDamage(): number {
    return this.min + this.scale;
  }

  getMaxDamage(): number {
    return this.max + this.scale;
  }

  increase(value: number[]): void {
    this.min += value[0];
    this.max += value[1];
  }

  modify(stat: number[]): number[] {
    return [stat[0] + (stat[0] * this.min), stat[1] + (stat[1] * this.max)];
  }

  getValue(): number[] {
    return [this.min, this.max];
  }

  toString(): string {
    const avg = (this.min + this.max) / 2;
    return `${avg > 0 ? '+' : '-'} ${Math.round(avg * 100)} %`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const statModifierMap: { [stat: string]:  { [type: string]: new(value: any) => Modifier }} = {
  armor: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  stamina: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  damage: {
    flat: FlatDamageModifier,
    percentage: PercentageDamageModifier,
  },

  health: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  poise: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  focus: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  equipLoad: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  speed: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  attackSpeed: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  },

  castSpeed: {
    flat: FlatModifier,
    percentage: PercentageModifier,
  }
}

export function createModifier<T = unknown>(stat: string, type: string, value: T): Modifier<T> {
  return new statModifierMap[stat][type](value) as Modifier<T>;
}
