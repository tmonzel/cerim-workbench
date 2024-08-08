import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class FPStat extends DynamicStat implements HeroStat {
	readonly label = 'FP';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.MIND,
		mutations: [
			{ breakpoint: 1, grow: 50 },
			{ breakpoint: 15, grow: 95 },
			{ breakpoint: 35, grow: 200, exp: -1.2 },
			{ breakpoint: 60, grow: 350 },
			{ breakpoint: 99, grow: 450 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
