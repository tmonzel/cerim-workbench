import { calcCorrect, type AttributeType, type GraphMutation } from '$lib/core';
import type { HeroState, HeroStateModifier } from '../types';

export class AttributeModifier implements HeroStateModifier {
	constructor(
		readonly type: `${AttributeType}`,
		readonly modifications: Record<string, Record<string, GraphMutation[]>>
	) {}

	modify(hero: HeroState): void {
		const attr = hero.attributes.value[this.type];

		for (const [key, value] of Object.entries(this.modifications)) {
			switch (key) {
				case 'stats':
				case 'resistance':
				case 'defense':
					for (const [k, mutations] of Object.entries(value)) {
						hero[key].value[k].add(calcCorrect(attr.total, mutations));
					}
			}
		}
	}
}
