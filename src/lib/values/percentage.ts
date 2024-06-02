export class Percentage {
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
