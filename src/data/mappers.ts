import { StatusEffectType } from '$lib';
import type { SpEffect, SpEffectModifier } from '$lib/item/types';
import { type SpEffectParam } from './types';

export function mapSpEffect(row: SpEffectParam): SpEffect {
	const modifiers: SpEffectModifier[] = [];

	if (row.addLifeForceStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'vig',
			value: row.addLifeForceStatus
		});
	}

	if (row.addEndureStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'end',
			value: row.addEndureStatus
		});
	}

	if (row.addStrengthStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'str',
			value: row.addStrengthStatus
		});
	}

	if (row.addDexterityStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'dex',
			value: row.addDexterityStatus
		});
	}

	if (row.addWillpowerStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'mnd',
			value: row.addWillpowerStatus
		});
	}

	if (row.addMagicStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'int',
			value: row.addMagicStatus
		});
	}

	if (row.addFaithStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'fth',
			value: row.addFaithStatus
		});
	}

	if (row.addLuckStatus) {
		modifiers.push({
			type: 'flat',
			group: 'attributes',
			prop: 'arc',
			value: row.addLuckStatus
		});
	}

	if (row.changeSleepResistPoint || row.changeMadnessResistPoint) {
		modifiers.push({
			type: 'flat',
			group: 'resistance',
			prop: 'focus',
			value: row.changeSleepResistPoint ?? row.changeMadnessResistPoint
		});
	}

	if (row.maxHpRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'stats',
			prop: 'hp',
			value: row.maxHpRate
		});
	}

	if (row.maxMpRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'stats',
			prop: 'fp',
			value: row.maxMpRate
		});
	}

	if (row.maxStaminaRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'stats',
			prop: 'stamina',
			value: row.maxStaminaRate
		});
	}

	if (row.equipWeightChangeRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'stats',
			prop: 'equipLoad',
			value: row.equipWeightChangeRate
		});
	}

	if (row.slashDamageCutRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'slash',
			value: row.slashDamageCutRate
		});
	}

	if (row.bloodAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.HEMORRHAGE,
			value: row.bloodAttackPower
		});
	}

	if (row.diseaseAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.ROT,
			value: row.diseaseAttackPower
		});
	}

	if (row.freezeAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.FROSTBITE,
			value: row.freezeAttackPower
		});
	}

	if (row.madnessAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.MADNESS,
			value: row.madnessAttackPower
		});
	}

	if (row.poizonAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.POISON,
			value: row.poizonAttackPower
		});
	}

	if (row.curseAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.DEATH,
			value: row.curseAttackPower
		});
	}

	if (row.sleepAttackPower) {
		modifiers.push({
			type: 'flat',
			group: 'status',
			prop: StatusEffectType.SLEEP,
			value: row.sleepAttackPower
		});
	}

	const effect: SpEffect = {
		id: row.id
	};

	if (modifiers.length > 0) {
		effect.modifiers = modifiers;
	}

	return effect;
}
