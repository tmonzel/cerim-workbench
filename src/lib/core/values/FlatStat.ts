export class FlatStat {
  constructor(private value: number) {}

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return `${this.value > 0 ? '+' : ''}${Math.round(this.value * 100) / 100}`;
  }
}