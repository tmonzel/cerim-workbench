import type { Mutation } from '../types';
import { NumRange } from '../NumRange';

export class NumberMutator {
  constructor(
    readonly base: number, 
    private mutations: Mutation[] = []
  ) {}

  mutate(progress: number) {
    let inc = 0;

    for(let i = 0; i < progress; i++) {
      inc += this.calcValue(i);
    }

    return inc;
  }

  private calcValue(index: number): number {
    const mutations = this.mutations ?? [];
    
    let value = this.base;

    for(const m of mutations) {
      const scaleRange = new NumRange(m.from[1], m.to[1]);
      const levelRange = new NumRange(m.from[0], m.to[0]);
  
      if(index >= m.from[0] && index <= m.to[0]) {
        const scaleProgress = levelRange.getPercentFor(index);
        const modValue = scaleRange.getValueForPercent(scaleProgress);
        
        value *= modValue;
      }
    }

    return value;
  }
}