import { list } from '$lib/core';
import type { HeroState } from '$lib/state';
import type { ItemModifierDef } from '../types';

export class PercentualModifier {
  constructor(readonly def: ItemModifierDef) {}

  modify(hero: HeroState): void {
    for(const item of list(this.def)) {
      switch(item.key) {
        case 'stats':
        case 'defense':
        case 'resistance':
        case 'damageNegation':
          hero[item.key].addMultiplier(item.value.modify);
      }
    }
  }
}