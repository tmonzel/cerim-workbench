import type { AttackStatusType } from '$lib/core';

export enum SpEffectCategory {
	NONE = 0,
	PERSIST_THROUGH_DEATH = 1,
	STACK_SELF = 10,
	RESET_ON_APPLY = 20,
	APPLY_FIRST = 10000
}

export enum SpEffectCondition {
	NONE = 0,
	MOON_SORC = 1,
	CARIAN_SWORD_SORC = 2,
	GLINTBLADE_SORC = 3,
	STONEDIGGER_SORC = 4,
	CRYSTALIAN_SORC = 5,
	AZUR_ACADEMY_SORC = 6,
	LUSAT_ACADEMY_SORC = 7,
	MAGMA_SORC = 8,
	THORN_SORC = 9,
	DEATH_SORC = 10,
	GRAVITY_SORC = 11,
	NIGHT_SORC = 12,
	COLD_SORC = 13,
	AZUR_PRIMEVAL_SORC = 14,
	LUSAT_PRIMEVAL_SORC = 15,
	YMIR_SORC = 16,

	BLACKFLAME_INC = 20,
	GIANTSFLAME_INC = 21
}

export type SpEffect = {
	id: number;

	attackType: number;
	attackStatus: AttackStatusType;

	category: SpEffectCategory;
	duration: number;
	trigger: {
		interval: number;
		onBelowHp: number;
		onAboveHp: number;
	};
	accumulatorEffectId?: number;
	affectedSpellTypes?: string[];
	conditions?: SpEffectCondition[];
	modifiers?: SpEffectModifier[];
};

export type SpEffectModifier = {
	type?: string;
	operation?: 'add' | 'multiply';
	key: string;
	value: number;
};
