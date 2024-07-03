import type { HeroState } from '$lib/state';
import { list } from '../helpers';
import type { ItemModifierDef } from '../types';

export class FlatModifier {
  constructor(
    readonly def: ItemModifierDef
  ) {}

  modify(hero: HeroState): void {
    for(const item of list(this.def)) {
      switch(item.key) {
        case 'stats':
        case 'resistance':
        case 'attributes':
        case 'defense':
          hero[item.key].addOffset(item.value.modify);
      }
    }
  }
}