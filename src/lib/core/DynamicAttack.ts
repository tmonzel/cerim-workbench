import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import { AttackType } from './types';

export class DynamicAttack extends DynamicGroup {
	constructor(value?: Partial<Record<string, DynamicNumber>>) {
		super({
			[AttackType.PHYSICAL]: new DynamicNumber(),
			[AttackType.MAGIC]: new DynamicNumber(),
			[AttackType.FIRE]: new DynamicNumber(),
			[AttackType.LIGHTNING]: new DynamicNumber(),
			[AttackType.HOLY]: new DynamicNumber(),
			[AttackType.STAMINA]: new DynamicNumber(),
			[AttackType.SORCERY]: new DynamicNumber(),
			[AttackType.INCANTATION]: new DynamicNumber(),
			...value
		});
	}
}
