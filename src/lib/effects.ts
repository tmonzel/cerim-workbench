import { DamageMutator, type Mutation } from './core';
import { NumberMutator } from './core/mutators/NumberMutator';
import type { AttributeState } from './state';
import type { DamageValue, HeroStatTypes, HeroStats } from './types';

export type BaseEffect = {
  attr: string;
  mutations?: Mutation[];
}

export interface DefaultEffect extends BaseEffect {
  affects: Exclude<HeroStatTypes, 'damage'>;
  value: number;
}

export interface DamageEffect extends BaseEffect {
  affects: 'damage';
  value: DamageValue;
}

export type EffectDef = DefaultEffect | DamageEffect;

const list: AttributeEffect[] = [];

export function addEffect(def: EffectDef): void {
  list.push(new AttributeEffect(def));
}

export function findEffects(): AttributeEffect[] {
  return list;
}

export type Effect = (attributes: AttributeState, stats: HeroStats) => void;

export class AttributeEffect {
  get attributeId(): string {
    return this.def.attr;
  }

  constructor(private def: EffectDef) {}

  apply(attributes: AttributeState, stats: HeroStats): void {
    const attr = attributes[this.def.attr];
    const base = this.def.value;

    if(!attr) {
      return;
    }

    if(typeof base === 'number') {
      // Mutate normal stat number
      const mutator = new NumberMutator(base, this.def.mutations ?? []);

      switch(this.def.affects) {
        case 'health':
        case 'stamina':
        case 'poise':
        case 'equipLoad':
        case 'focus':
          stats[this.def.affects].base += mutator.mutate(attr.value + attr.offset);
      }
    }

    else if(Array.isArray(base)) {
      // Mutate damage
      const mutator = new DamageMutator(base, this.def.mutations ?? []);
      stats.damage.base.add(mutator.mutate(attr.value));
    }
  }
}
