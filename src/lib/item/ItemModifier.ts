import type { ModifierData, ModifierType } from '$lib/core';
import type { HeroState, HeroStateModifier } from '$lib/hero';

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
								hero.attack.mainHand.addTotalMultiplier(value.modify);
								hero.attack.offHand.addTotalMultiplier(value.modify);
							} else {
								hero.attack.mainHand.addMultiplier(value.modify);
								hero.attack.offHand.addMultiplier(value.modify);
							}

							break;
						case 'flat':
						default:
							hero.attack.mainHand.addOffset(value.modify);
							hero.attack.offHand.addOffset(value.modify);
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
