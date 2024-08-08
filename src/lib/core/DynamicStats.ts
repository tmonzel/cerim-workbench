import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';

export class DynamicStats extends DynamicGroup {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			hp: new DynamicNumber(value?.hp),
			fp: new DynamicNumber(value?.fp),
			stamina: new DynamicNumber(value?.stamina),
			discovery: new DynamicNumber(value?.discovery),
			equipLoad: new DynamicNumber(value?.equipLoad)
		});
	}
}
