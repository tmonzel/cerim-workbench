export class NumRange {
  readonly distance: number;

  constructor(
    private start: number, 
    private end: number
  ) {
    this.distance = Math.abs(this.start - this.end);
  }

  getValueForPercent(p: number): number {
    return this.start - ((p * 100) * (this.start - this.end)) / 100;
  }

  getPercentFor(x: number): number {
    return ((Math.abs(x - this.start) * 100) / this.distance) * 0.01;
  }
}