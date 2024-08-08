import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class RobustnessStat extends DynamicStat implements HeroStat {
	readonly label = 'Robustness';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.ENDURANCE,
		mutations: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 30, grow: 0 },
			{ breakpoint: 40, grow: 30 },
			{ breakpoint: 60, grow: 40 },
			{ breakpoint: 99, grow: 50 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
