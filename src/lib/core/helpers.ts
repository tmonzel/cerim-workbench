import { AttributeType, type AffectedStat, type AttributeMutation, type AttributeValue } from './types';
import { ComplexAttributes, type ComplexDamage } from './values';

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

export function mapModifierValue(stat: AffectedStat, value: number | AttributeValue[]): number | ComplexAttributes | ComplexDamage {
  const attributes: Partial<Record<AttributeType, number>> = {}

  switch(stat) {
    case 'attributes':
      if(typeof value === 'number') {
        Object.values(AttributeType).forEach(t => attributes[t] = value);
      } else {
        value.forEach((v) => attributes[v[1]] = v[0]);
      }
      
      return new ComplexAttributes(attributes);
  }

  return value as number;
}

export function getScalingId(base: number): string {
  if(base <= 24) {
    return "E";
  }

  if(base <= 59) {
    return "D";
  }

  if(base <= 89) {
    return "C";
  }

  if(base <= 139) {
    return "B";
  }

  if(base <= 174) {
    return "A";
  }

  return "S";
}

export function getAttributeScalingParams(attributeLevel: number, mutations: AttributeMutation[]): { stat: number[], grow: number[], exp: number[] } {
  for(let i = 1; i < mutations.length; i++) {
    const calc = mutations[i];

    if(calc.breakpoint > attributeLevel) {
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

export function calcAttributeScaling(value: number, mutations: AttributeMutation[]): number {
  if(value === 0) {
    return 0;
  }

  const params = getAttributeScalingParams(value, mutations);
  const ratio = (value - params.stat[0]) / (params.stat[1] - params.stat[0]);
  let growth = 0;

  if(params.exp[0] > 0) {
    growth = Math.pow(ratio, params.exp[0]);
  } else if(params.exp[0] < 0) {
    growth = 1 - Math.pow(1 - ratio, Math.abs(params.exp[0]));
  }

  return params.grow[0] + ((params.grow[1] - params.grow[0]) * growth);
}
