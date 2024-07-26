import type { HeroState, HeroStateModifier } from '$lib/hero';
import type { ModifierData, ModifierType } from './types';

export class ItemModifier implements HeroStateModifier {
	constructor(
		readonly data: ModifierData,
		readonly type: ModifierType = 'flat'
	) {}

	modify(hero: HeroState): void {
		for (const [key, value] of Object.entries(this.data)) {
			switch (key) {
				case 'attack':
					switch (this.type) {
						case 'percentual':
							if (value.multiplier && value.multiplier === 'total') {
								hero.mainHandAttack.addTotalMultiplier(value.modify);
								hero.offHandAttack.addTotalMultiplier(value.modify);
							} else {
								hero.mainHandAttack.addMultiplier(value.modify);
								hero.offHandAttack.addMultiplier(value.modify);
							}

							break;
						case 'flat':
						default:
							hero.mainHandAttack.addOffset(value.modify);
							hero.offHandAttack.addOffset(value.modify);
					}
					break;
				case 'stats':
				case 'resistance':
				case 'defense':
				case 'attributes':
				case 'damageNegation':
					switch (this.type) {
						case 'percentual':
							if (value.multiplier && value.multiplier === 'total') {
								hero[key].addTotalMultiplier(value.modify);
							} else {
								hero[key].addMultiplier(value.modify);
							}

							break;
						case 'flat':
						default:
							hero[key].addOffset(value.modify);
					}
			}
		}
	}
}
