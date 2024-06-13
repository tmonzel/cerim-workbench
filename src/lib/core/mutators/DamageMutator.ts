
import { type Mutation } from '../types';
import type { DamageValue } from '$lib/types';
import { FlatDamage } from '../values/FlatDamage';

export class DamageMutator {
  constructor(
    readonly base: DamageValue, 
    private mutations: Mutation[] = []
  ) {}

  mutate(progress: number): FlatDamage {
    const damage = new FlatDamage();
    
    for(let i = 0; i < progress; i++) {
      damage.add(new FlatDamage([this.calcValue(i)]));
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