import { AttackType, StatusEffectType } from '$lib';
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

	if (row.changeDiseaseResistPoint || row.changePoisonResistPoint) {
		modifiers.push({
			type: 'flat',
			group: 'resistance',
			prop: 'immunity',
			value: row.changeDiseaseResistPoint ?? row.changePoisonResistPoint
		});
	}

	if (row.changeFreezeResistPoint || row.changeBloodResistPoint) {
		modifiers.push({
			type: 'flat',
			group: 'resistance',
			prop: 'robustness',
			value: row.changeFreezeResistPoint ?? row.changeBloodResistPoint
		});
	}

	if (row.changeCurseResistPoint) {
		modifiers.push({
			type: 'flat',
			group: 'resistance',
			prop: 'vitality',
			value: row.changeCurseResistPoint
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

	if (row.neutralDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'standard',
			value: row.neutralDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.slashDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'slash',
			value: row.slashDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.blowDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'strike',
			value: row.blowDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.thrustDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'pierce',
			value: row.thrustDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.toughnessDamageCutRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'poise',
			value: row.toughnessDamageCutRate
		});
	}

	if (row.magicDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Magic !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'mag',
			value: row.magicDamageCutRate * row.defEnemyDmgCorrectRate_Magic
		});
	}

	if (row.fireDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Fire !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'fir',
			value: row.fireDamageCutRate * row.defEnemyDmgCorrectRate_Fire
		});
	}

	if (row.darkDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Dark !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'hol',
			value: row.darkDamageCutRate * row.defEnemyDmgCorrectRate_Dark
		});
	}

	if (row.thunderDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Thunder !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'damageNegation',
			prop: 'lit',
			value: row.thunderDamageCutRate * row.defEnemyDmgCorrectRate_Thunder
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

	if (row.itemDropRate) {
		modifiers.push({
			type: 'flat',
			prop: 'discovery',
			value: row.itemDropRate
		});
	}

	if (row.staminaRecoverChangeSpeed) {
		modifiers.push({
			type: 'flat',
			prop: 'staminaRecoverySpeed',
			value: row.staminaRecoverChangeSpeed
		});
	}

	if (row.soulRate !== 1) {
		modifiers.push({
			type: 'percentual',
			prop: 'runeAcquisitionRate',
			value: row.soulRate
		});
	}

	if (row.changeMagicSlot) {
		modifiers.push({
			type: 'flat',
			prop: 'magicSlots',
			value: row.changeMagicSlot
		});
	}

	if (row.physicsAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.PHYSICAL,
			value: row.physicsAttackRate * row.atkEnemyDmgCorrectRate_Physics
		});
	}

	if (row.magicAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Magic !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.MAGIC,
			value: row.magicAttackRate * row.atkEnemyDmgCorrectRate_Magic
		});
	}

	if (row.fireAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Fire !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.FIRE,
			value: row.fireAttackRate * row.atkEnemyDmgCorrectRate_Fire
		});
	}

	if (row.thunderAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Thunder !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.LIGHTNING,
			value: row.thunderAttackRate * row.atkEnemyDmgCorrectRate_Thunder
		});
	}

	if (row.darkAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Dark !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.HOLY,
			value: row.darkAttackRate * row.atkEnemyDmgCorrectRate_Dark
		});
	}

	if (row.staminaAttackRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: AttackType.STAMINA,
			value: row.staminaAttackRate
		});
	}

	if (row.slashAttackRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: 'slash',
			value: row.slashAttackRate
		});
	}

	if (row.blowAttackRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: 'strike',
			value: row.blowAttackRate
		});
	}

	if (row.thrustAttackRate !== 1) {
		modifiers.push({
			type: 'percentual',
			group: 'attack',
			prop: 'pierce',
			value: row.thrustAttackRate
		});
	}

	if (row.changeHpEstusFlaskCorrectRate !== 1) {
		modifiers.push({
			type: 'percentual',
			prop: 'hpFlaskReg',
			value: row.changeHpEstusFlaskCorrectRate
		});
	}

	if (row.changeMpEstusFlaskCorrectRate !== 1) {
		modifiers.push({
			type: 'percentual',
			prop: 'fpFlaskReg',
			value: row.changeMpEstusFlaskCorrectRate
		});
	}

	if (row.changeHpPoint) {
		modifiers.push({
			type: 'flat',
			prop: 'hpRestoration',
			value: row.changeHpPoint
		});
	}

	if (row.changeMpPoint) {
		modifiers.push({
			type: 'flat',
			prop: 'fpRestoration',
			value: row.changeMpPoint
		});
	}

	const conditions: number[] = [];

	if (row.magicSubCategoryChange1) {
		conditions.push(row.magicSubCategoryChange1);
	}

	if (row.magicSubCategoryChange2) {
		conditions.push(row.magicSubCategoryChange2);
	}

	if (row.magicSubCategoryChange3) {
		conditions.push(row.magicSubCategoryChange3);
	}

	const affectedSpellTypes: string[] = [];

	if (row.magParamChange) {
		affectedSpellTypes.push('sor');
	}

	if (row.miracleParamChange) {
		affectedSpellTypes.push('inc');
	}

	if (row.shamanParamChange) {
		affectedSpellTypes.push('pyr');
	}

	const effect: SpEffect = {
		id: row.id,
		duration: row.effectEndurance,

		trigger: {
			interval: row.motionInterval,
			onBelowHp: row.conditionHp,
			onAboveHp: row.conditionHpRate
		}
	};

	if (modifiers.length > 0) {
		effect.modifiers = modifiers;
	}

	if (conditions.length > 0) {
		effect.conditions = conditions;
	}

	if (affectedSpellTypes.length > 0) {
		effect.affectedSpellTypes = affectedSpellTypes;
	}

	if (row.accumuOverFireId) {
		effect.accumulatorEffectId = row.accumuOverFireId;
	}

	return effect;
}
