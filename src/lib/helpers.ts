export class DamageValue {
  constructor(
    private value: number[] = [0, 0]
  ) {}

  get min(): number {
    return this.value[0];
  }

  get max(): number {
    return this.value[1];
  }

  multiply(value: number): void {
    this.value = [value * this.value[0], value * this.value[1]];
  }

  add(value: number[]): void {
    this.value = [value[0] + this.value[0], value[1] + this.value[1]];
  }

  get(): number[] {
    return this.value;
  }

  set(value: number[]): void {
    this.value = value;
  }

  toString(): string {
    const avg = Math.round((this.value[0] + this.value[1]) / 2);
    return `${Math.round(this.value[0] * 10) / 10}-${Math.round(this.value[1] * 10) / 10} (${avg})`;
  }
}

export class PercentageValue {
  constructor(private value: number = 0) {}

  add(value: number): void {
    this.value += value;
  }

  set(value: number): void {
    this.value = value;
  }

  get(): number {
    return this.value;
  }

  toString(): string {
    return `${Math.round(this.value * 100)} %`;
  }
}

export function renderDamageValue(v: number[]): string {
  return `${new DamageValue(v)})`;
}
