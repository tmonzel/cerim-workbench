import { list } from '../helpers';
import type { HeroStats, ItemModifierDef } from '../types';

export class FlatModifier {
  constructor(
    readonly def: ItemModifierDef
  ) {}

  modify(stats: HeroStats): void {
    for(const item of list(this.def)) {
      switch(item.key) {
        case 'stats':
          for(const s of list(item.value.modify)) {
            stats[s.key].value.addOffset(s.value);
          }
          
          break;
        case 'defense':
          for(const s of list(item.value.modify)) {
            stats['def:' + s.key].value.addOffset(s.value);
          }
          break;
        case 'resistance':
          for(const s of list(item.value.modify)) {
            stats['res:' + s.key].value.addOffset(s.value);
          }
          break;
        case 'attributes':
          for(const a of list(item.value.modify)) {
            stats.attributes.value.add({ [a.key]: a.value });
          }
      }
    }
  }
}