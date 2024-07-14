import { type GraphMutation } from './types';

export function sum<T extends string>(v: Partial<Record<T, number>>): number {
  let s = 0;

  for(const k in v) {
    s += v[k] ?? 0;
  }

  return s;
}

export function list<TValue, TKey extends string | number | symbol>(obj: Partial<Record<TKey, TValue>>): { key: TKey, value: TValue }[] {
  const r: { key: TKey, value: TValue }[] = [];

  for(const k in obj) {
    r.push({
      key: k,
      value: obj[k] as TValue
    })
  }

  return r;
}

export function getValueDistribution<T extends string = string>(v: Partial<Record<T, number>>): { amount: number; value: number; key: T; }[] {
  const dist: { amount: number; value: number; key: T }[] = [];
  const total = sum(v);
  const n = 100 / total;

  for(const k in v) {
    const b = v[k];

    if(b === 0 || b === undefined) {
      continue;
    }
    
    dist.push({ 
      key: k,
      value: b,
      amount: Math.round(n * b) / 100 
    });
  }
  
  return dist;
}

export function roundValue(value: number, decimals: number = 1): number {
  const d = Math.pow(10, decimals);
  return value > 0 ? Math.round(value * d) / d : 0;
}

export function getScalingId(base: number): string {
  const b = Math.floor(base);

  if(b <= 24) {
    return "E";
  }

  if(b <= 59) {
    return "D";
  }

  if(b <= 89) {
    return "C";
  }

  if(b <= 139) {
    return "B";
  }

  if(b <= 175) {
    return "A";
  }

  return "S";
}

export function calcGraphParams(x: number, mutations: GraphMutation[]): { stat: number[], grow: number[], exp: number[] } {
  for(let i = 1; i < mutations.length; i++) {
    const calc = mutations[i];

    if(calc.breakpoint > x) {
      return {
        stat: [mutations[i-1].breakpoint, calc.breakpoint],
        grow: [mutations[i-1].grow, calc.grow],
        exp: [mutations[i-1].exp ?? 1, calc.exp ?? 1]
      }
    }
  }

  return {
    stat: [mutations[0].breakpoint, mutations[1].breakpoint],
    grow: [mutations[0].breakpoint, mutations[1].grow],
    exp: [mutations[0].breakpoint, mutations[1].exp ?? 1]
  }
}

export function calcCorrect(value: number, mutations: GraphMutation[]): number {
  if(value === 0 || mutations.length <= 1) {
    return 0;
  }

  const params = calcGraphParams(value, mutations);
  const ratio = (value - params.stat[0]) / (params.stat[1] - params.stat[0]);
  let growth = 0;

  if(params.exp[0] > 0) {
    growth = Math.pow(ratio, params.exp[0]);
  } else if(params.exp[0] < 0) {
    growth = 1 - Math.pow(1 - ratio, Math.abs(params.exp[0]));
  }

  return params.grow[0] + ((params.grow[1] - params.grow[0]) * growth);
}
