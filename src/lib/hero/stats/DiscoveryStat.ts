import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class DiscoveryStat extends DynamicStat implements HeroStat {
	readonly label = 'Discovery';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.ARCANE,
		mutations: [
			{ breakpoint: 0, grow: 1 },
			{ breakpoint: 30, grow: 1.3 },
			{ breakpoint: 40, grow: 1.4 },
			{ breakpoint: 60, grow: 1.6 },
			{ breakpoint: 99, grow: 1.99 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}

	override toString(): string {
		return (this.getTotal() * 100).toFixed();
	}
}
