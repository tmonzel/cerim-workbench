import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class SlashDefenseStat extends DynamicStat implements HeroStat {
	readonly label = 'Slash Defense';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.STRENGTH,
		mutations: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 30, grow: 10 },
			{ breakpoint: 40, grow: 15 },
			{ breakpoint: 60, grow: 30 },
			{ breakpoint: 99, grow: 40 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
