import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import type { ResistanceType } from './types';

export class DynamicResistance extends DynamicGroup<ResistanceType> {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			immunity: new DynamicNumber(value?.immunity),
			robustness: new DynamicNumber(value?.robustness),
			focus: new DynamicNumber(value?.focus),
			vitality: new DynamicNumber(value?.vitality)
		});
	}
}
