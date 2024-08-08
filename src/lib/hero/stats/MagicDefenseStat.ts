import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class MagicDefenseStat extends DynamicStat implements HeroStat {
	readonly label = 'Magic Defense';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.INTELLIGENCE,
		mutations: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 20, grow: 40 },
			{ breakpoint: 35, grow: 50 },
			{ breakpoint: 60, grow: 60 },
			{ breakpoint: 99, grow: 70 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
