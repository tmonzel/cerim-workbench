export function scaleValue(value: number, span: number[] = [1, 1], rate: number = -0.01) {
  let v = 0;

  for(let i = 0; i < value; i++) {
    v += (span[0] - span[1]) * Math.exp(rate * i) + span[1];
  }
  
  return Math.round(v);
}

export function calcNormalDist(x: number, peak: number, b: number, variance: number = 1): number {
  const f = -Math.pow((x - b), 2) / variance;
  return peak * Math.pow(Math.E, f);
}

export function humanize(v: string) {
  return v
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/([a-z]{1})([A-Z]{1})/g, "$1 $2")
    .replace(/^[a-z]/, (v) => { return v.toUpperCase(); });
}

export function roundValue(value: number, decimals: number = 1): number {
  const d = Math.pow(10, decimals);
  return value > 0 ? Math.round(value * d) / d : 0;
}
