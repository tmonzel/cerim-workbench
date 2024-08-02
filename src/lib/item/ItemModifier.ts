import type { HeroState, HeroStateModifier } from '$lib/hero';
import type { ModifierType, SpEffectModifier } from './types';

export class ItemModifier implements HeroStateModifier {
	readonly type: ModifierType;
	readonly group?: string;
	readonly prop: string;
	readonly value: number;

	constructor(private mod: SpEffectModifier) {
		this.type = mod.type;
		this.prop = mod.prop;
		this.value = mod.value;
		this.group = mod.group;
	}

	modify(hero: HeroState): void {
		const group = this.group;
		const prop = this.prop;
		const value = this.value;

		switch (group) {
			case 'attack':
				switch (this.type) {
					case 'percentual':
						hero.attack.addMultiplier({ [prop]: value });
						break;
					case 'flat':
					default:
						hero.attack.addOffset({ [prop]: value });
				}
				break;

			case 'damageNegation':
				switch (this.type) {
					case 'percentual':
						hero.damageNegation.set(prop, 100 - (100 - hero.damageNegation.get(prop)) * value);
						break;
					case 'flat':
					default:
						hero.damageNegation.addOffset({ [prop]: value });
				}
				break;
			case 'stats':
			case 'resistance':
			case 'attributes':
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
	}
}
