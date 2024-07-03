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
          for(const s of list(item.value.modify)) {
            hero.stats[s.key].addOffset(s.value);
          }
          
          break;
        case 'defense':
          for(const s of list(item.value.modify)) {
            hero.stats['def:' + s.key].addOffset(s.value);
          }
          break;
        case 'resistance':
          for(const s of list(item.value.modify)) {
            hero.stats['res:' + s.key].addOffset(s.value);
          }
          break;
        case 'attributes':
          for(const a of list(item.value.modify)) {
            hero.attributes.addOffset({ [a.key]: a.value });
          }
      }
    }
  }
}