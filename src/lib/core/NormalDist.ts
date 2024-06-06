export class NormalDist {
  private standardDeviation: number;

  constructor(
    private mean: number = 0,
    private variance: number = 1
  ) {
    this.standardDeviation = Math.sqrt(variance);
  }

  calcProbabilityDensity(x: number) {
    const m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    const e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));

    return e / m;
  };

  scale(amount: number): NormalDist {
    return new NormalDist(this.mean * amount, this.variance * amount);
  }
}