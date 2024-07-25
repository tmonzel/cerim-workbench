import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';

export class DynamicStats extends DynamicGroup {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			hp: new DynamicNumber(value?.hp),
			fp: new DynamicNumber(value?.fp),
			stamina: new DynamicNumber(value?.stamina),
			discovery: new DynamicNumber(value?.discovery),
			weight: new DynamicNumber(value?.weight),
			equipLoad: new DynamicNumber(value?.equipLoad),
			attackSpeed: new DynamicNumber(value?.attackSpeed),
			poise: new DynamicNumber(value?.poise)
		});
	}
}
