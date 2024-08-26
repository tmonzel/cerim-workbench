import { createDynamicNumber } from '$lib/core';
import { AttackType } from './types';

export function createDynamicAttack() {
	return {
		[AttackType.PHYSICAL]: createDynamicNumber(0),
		[AttackType.MAGIC]: createDynamicNumber(0),
		[AttackType.FIRE]: createDynamicNumber(0),
		[AttackType.LIGHTNING]: createDynamicNumber(0),
		[AttackType.HOLY]: createDynamicNumber(0),
		[AttackType.STAMINA]: createDynamicNumber(0),
		[AttackType.SORCERY]: createDynamicNumber(0),
		[AttackType.INCANTATION]: createDynamicNumber(0)
	};
}
