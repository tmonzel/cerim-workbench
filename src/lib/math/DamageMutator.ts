
import type { Mutation } from '$lib/types';
import { ComplexDamage } from '$lib/values/complex-damage';
import { Damage } from '$lib/values/damage';

export class DamageMutator {
  constructor(
    readonly base: number[], 
    private mutations: Mutation[] = []
  ) {}

  mutate(progress: number): ComplexDamage {
    const damage = new ComplexDamage();
    
    for(let i = 0; i < progress; i++) {
      damage.add(this.calcValue(i).get());
    }

    return damage;
  }

  private calcValue(index: number): Damage {
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

    return new Damage(this.base);
  }
}