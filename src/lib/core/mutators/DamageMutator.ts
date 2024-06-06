
import { type Mutation } from '../types';
import type { DamageValue } from '$lib/types';
import { ComplexDamage } from '../ComplexDamage';

export class DamageMutator {
  constructor(
    readonly base: DamageValue, 
    private mutations: Mutation[] = []
  ) {}

  mutate(progress: number): ComplexDamage {
    const damage = new ComplexDamage();
    
    for(let i = 0; i < progress; i++) {
      damage.add([this.calcValue(i)]);
    }
    
    return damage;
  }

  private calcValue(index: number): DamageValue {
    const mutations = this.mutations ?? [];

    for(const m of mutations) {
      /*const scaleRange = new NumRange(m.from[1], m.to[1]);
      const levelRange = new NumRange(m.from[0], m.to[0]);
  
      if(index >= m.from[0] && index <= m.to[0]) {
        const scaleProgress = levelRange.getPercentFor(index);
        const modValue = scaleRange.getValueForPercent(scaleProgress);
        
        value *= modValue;
      }*/
    }
    //console.log(this.base);
    
    return this.base;
  }
}