import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class VitalityStat extends DynamicStat implements HeroStat {
	readonly label = 'Vitality';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.ARCANE,
		mutations: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 15, grow: 15 },
			{ breakpoint: 40, grow: 30 },
			{ breakpoint: 60, grow: 40 },
			{ breakpoint: 99, grow: 50 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
