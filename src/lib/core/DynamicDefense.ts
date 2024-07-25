import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import { DamageType } from './types';

export class DynamicDefense extends DynamicGroup<DamageType> {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			[DamageType.STANDARD]: new DynamicNumber(value?.standard),
			[DamageType.STRIKE]: new DynamicNumber(value?.strike),
			[DamageType.SLASH]: new DynamicNumber(value?.slash),
			[DamageType.PIERCE]: new DynamicNumber(value?.pierce),
			[DamageType.MAGIC]: new DynamicNumber(value?.mag),
			[DamageType.HOLY]: new DynamicNumber(value?.hol),
			[DamageType.LIGHTNING]: new DynamicNumber(value?.lit),
			[DamageType.FIRE]: new DynamicNumber(value?.fir)
		});
	}
}
