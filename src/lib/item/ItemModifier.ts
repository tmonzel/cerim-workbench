import type { HeroState, HeroStateModifier } from '$lib/state';
import type { ItemModifierData, ModifierType } from './types';

export class ItemModifier implements HeroStateModifier {
  constructor(
    readonly data: ItemModifierData,
    readonly type: ModifierType = 'flat',
  ) {}

  modify(hero: HeroState): void {
    for(const [key, value] of Object.entries(this.data)) {
      switch(key) {
        case 'stats':
        case 'resistance':
        case 'attributes':
        case 'defense':
        case 'damageNegation':
          switch(this.type) {
            case 'percentual':
              hero[key].addMultiplier(value.modify);
              break;
            case 'flat':
            default:
              hero[key].addOffset(value.modify);
          }
      }
    }
  }
}