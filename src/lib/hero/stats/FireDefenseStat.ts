import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class FireDefenseStat extends DynamicStat implements HeroStat {
	readonly label = 'Fire Defense';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.VIGOR,
		mutations: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 30, grow: 20 },
			{ breakpoint: 40, grow: 40 },
			{ breakpoint: 60, grow: 60 },
			{ breakpoint: 99, grow: 70 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
