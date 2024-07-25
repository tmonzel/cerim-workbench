import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import { AttributeType } from './types';

export class DynamicAttributes extends DynamicGroup {
	constructor(value?: Partial<Record<string, number>>) {
		super({
			[AttributeType.VIGOR]: new DynamicNumber(value?.vig),
			[AttributeType.ENDURANCE]: new DynamicNumber(value?.end),
			[AttributeType.STRENGTH]: new DynamicNumber(value?.str),
			[AttributeType.DEXTERITY]: new DynamicNumber(value?.dex),
			[AttributeType.MIND]: new DynamicNumber(value?.mnd),
			[AttributeType.INTELLIGENCE]: new DynamicNumber(value?.int),
			[AttributeType.FAITH]: new DynamicNumber(value?.fth),
			[AttributeType.ARCANE]: new DynamicNumber(value?.arc)
		});
	}
}
