
import type { AttributeState } from '$lib/attribute.store';
import type { HeroState } from '$lib/hero';
import { DamageMutator } from '$lib/math/DamageMutator';
import { NumberMutator } from '$lib/math/NumberMutator';
import { Modifier } from './Modifier';

export class StatModifier extends Modifier<HeroState> {
  modify(attributes: AttributeState, stats: HeroState): void {
    const attr = attributes[this.def.attr];
    const base = this.def.value;

    if(!attr) {
      return;
    }

    if(typeof base === 'number') {
      // Mutate normal stat number
      const mutator = new NumberMutator(base, this.def.mutations ?? []);
      stats[this.def.affects] = mutator.mutate(attr.value);
    }

    else if(Array.isArray(base)) {
      // Mutate damage
      const mutator = new DamageMutator(base, this.def.mutations ?? []);
      stats[this.def.affects] = mutator.mutate(attr.value);
    }
  }
}
