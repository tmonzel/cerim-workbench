export class FlatStat {
  constructor(public value: number) {}

  isPresent(): boolean {
    return this.value > 0;
  }

  toString(): string {
    return `${this.value > 0 ? '+' : ''}${Math.round(this.value * 100) / 100}`;
  }
}