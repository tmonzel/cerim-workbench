export class PercentualStat {
  constructor(private value: number) {}

  isPresent(): boolean {
    return this.value > 0;
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return `${this.value > 0 ? '+' : ''}${Math.round(this.value * 100)}%`;
  }
}