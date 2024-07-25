import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';

export class DynamicGuard extends DynamicGroup {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			phy: new DynamicNumber(value?.phy),
			fir: new DynamicNumber(value?.fir),
			hol: new DynamicNumber(value?.hol),
			lit: new DynamicNumber(value?.lit),
			mag: new DynamicNumber(value?.mag),
			res: new DynamicNumber(value?.res),
			sta: new DynamicNumber(value?.sta)
		});
	}
}
