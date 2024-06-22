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

export function getAttributeScalingParams(attributeLevel: number): { stat: number[], grow: number[], exp: number[] } {
  const data = [
    {
      breakpoint: 1,
      grow: 0,
      exp: 1.2
    },
    {
      breakpoint: 18,
      grow: 25,
      exp: -1.2
    },

    {
      breakpoint: 60,
      grow: 75,
      exp: 1
    },

    {
      breakpoint: 80,
      grow: 90,
      exp: 1
    },

    {
      breakpoint: 150,
      grow: 110,
      exp: 1
    }
  ];

  for(let i = 1; i < data.length; i++) {
    const calc = data[i];

    if(calc.breakpoint > attributeLevel) {
      return {
        stat: [data[i-1].breakpoint, calc.breakpoint],
        grow: [data[i-1].grow, calc.grow],
        exp: [data[i-1].exp, calc.exp]
      }
    }
  }

  return {
    stat: [data[0].breakpoint, data[1].breakpoint],
    grow: [data[0].breakpoint, data[1].grow],
    exp: [data[0].breakpoint, data[1].exp]
  }
}
