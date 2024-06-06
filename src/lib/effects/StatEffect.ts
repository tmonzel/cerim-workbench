
import type { HeroState } from '$lib/hero';
import { DamageMutator } from '$lib/core/mutators/DamageMutator';
import { NumberMutator } from '$lib/core/mutators/NumberMutator';
import type { AttributeState } from '$lib/state';
import { Effect } from './Effect';

export class StatEffect extends Effect<HeroState> {
  apply(attributes: AttributeState, hero: HeroState): void {
    const attr = attributes[this.def.attr];
    const base = this.def.value;

    if(!attr) {
      return;
    }

    if(typeof base === 'number') {
      // Mutate normal stat number
      const mutator = new NumberMutator(base, this.def.mutations ?? []);

      if(this.def.affects === 'health') {
        hero.stats.health.setScale(mutator.mutate(attr.value));
      }
      
    }

    else if(Array.isArray(base)) {
      // Mutate damage
      const mutator = new DamageMutator(base, this.def.mutations ?? []);
      //hero.stats.damage.add(mutator.mutate(attr.value));
    }
  }
}
