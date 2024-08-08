import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class StaminaStat extends DynamicStat implements HeroStat {
	readonly label = 'Stamina';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.ENDURANCE,
		mutations: [
			{ breakpoint: 1, grow: 80 },
			{ breakpoint: 15, grow: 105 },
			{ breakpoint: 30, grow: 130 },
			{ breakpoint: 50, grow: 155 },
			{ breakpoint: 99, grow: 170 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
