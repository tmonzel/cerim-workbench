import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class HPStat extends DynamicStat implements HeroStat {
	readonly label = 'HP';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.VIGOR,
		mutations: [
			{ breakpoint: 1, grow: 300, exp: 1.5 },
			{ breakpoint: 25, grow: 800, exp: 1.1 },
			{ breakpoint: 40, grow: 1450, exp: -1.2 },
			{ breakpoint: 60, grow: 1900, exp: -1.2 },
			{ breakpoint: 99, grow: 2100 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
