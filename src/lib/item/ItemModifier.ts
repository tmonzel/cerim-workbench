import type { HeroState, HeroStateModifier } from '$lib/hero';
import type { ModifierType, SpEffectModifier } from './types';

export class ItemModifier implements HeroStateModifier {
	readonly type: ModifierType;
	readonly group: string;
	readonly prop: string;
	readonly value: number;

	constructor(private mod: SpEffectModifier) {
		this.type = mod.type;
		this.prop = mod.prop;
		this.value = mod.value;
		this.group = mod.group;
	}

	modify(hero: HeroState): void {
		//for (const [key, value] of Object.entries(this.data)) {
		const group = this.group;
		const prop = this.prop;
		const value = this.value;

		switch (group) {
			/*case 'attack':
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
					break;*/
			case 'stats':
			case 'resistance':
			case 'attributes':
			case 'damageNegation':
				switch (this.type) {
					case 'percentual':
						//if (value.multiplier && value.multiplier === 'total') {
						//	hero[group].addTotalMultiplier({ [prop]: value });
						//} else {
						hero[group].addMultiplier({ [prop]: value });
						//}

						break;
					case 'flat':
					default:
						hero[group].addOffset({ [prop]: value });
				}
		}
		//}
	}
}
