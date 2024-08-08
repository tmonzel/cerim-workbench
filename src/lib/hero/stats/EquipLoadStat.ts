import { AttributeType, calcCorrect } from '$lib/core';
import type { AttributeScaling } from '../attributes';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class EquipLoadStat extends DynamicStat implements HeroStat {
	readonly label = 'Equip Load';
	readonly attributeScaling: AttributeScaling = {
		type: AttributeType.ENDURANCE,
		mutations: [
			{ breakpoint: 1, grow: 45 },
			{ breakpoint: 8, grow: 45 },
			{ breakpoint: 25, grow: 72, exp: 1.1 },
			{ breakpoint: 60, grow: 120 },
			{ breakpoint: 99, grow: 160 }
		]
	};

	update(attributes: Record<AttributeType, number>): void {
		this._base += calcCorrect(attributes[this.attributeScaling.type], this.attributeScaling.mutations);
	}
}
