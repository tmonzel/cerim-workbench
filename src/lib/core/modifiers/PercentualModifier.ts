import type { HeroState } from '$lib/state';
import { list } from '../helpers';
import type { ItemModifierDef } from '../types';

export class PercentualModifier {
  constructor(readonly def: ItemModifierDef) {}

  modify(hero: HeroState): void {
    for(const item of list(this.def)) {
      switch(item.key) {
        case 'stats':
          for(const s of list(item.value.modify)) {
            hero.stats[s.key].addMultiplier(s.value - 1);
          }
          
          break;
        case 'defense':
          for(const s of list(item.value.modify)) {
            hero.stats['def:' + s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'resistance':
          for(const s of list(item.value.modify)) {
            hero.stats['res:' + s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'attack':
          for(const s of list(item.value.modify)) {
            //hero.stats['attack'].value[s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'attributes':
      }
    }
  }
}