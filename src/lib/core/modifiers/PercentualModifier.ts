import { list } from '../helpers';
import type { HeroStats, ItemModifierDef } from '../types';

export class PercentualModifier {
  constructor(readonly def: ItemModifierDef) {}

  modify(stats: HeroStats): void {
    for(const item of list(this.def)) {
      switch(item.key) {
        case 'stats':
          for(const s of list(item.value.modify)) {
            stats[s.key].addMultiplier(s.value - 1);
          }
          
          break;
        case 'defense':
          for(const s of list(item.value.modify)) {
            stats['def:' + s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'resistance':
          for(const s of list(item.value.modify)) {
            stats['res:' + s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'attack':
          for(const s of list(item.value.modify)) {
            stats['damage'].value[s.key].addMultiplier(s.value - 1);
          }
          break;
        case 'attributes':
      }
    }
  }
}