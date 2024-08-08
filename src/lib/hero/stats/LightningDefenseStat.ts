import type { AttributeType } from '$lib/core';
import type { HeroStat } from '../types';
import { DynamicStat } from './DynamicStat';

export class LightningDefenseStat extends DynamicStat implements HeroStat {
	readonly label = 'Lightning Defense';
	update(attributes: Record<AttributeType, number>): void {}
}
