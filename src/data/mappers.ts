import { AttackType, DamageType, StatusEffectType, type SpEffect, type SpEffectModifier } from '$lib';
import { type SpEffectParam } from './types';

export function mapSpEffect(row: SpEffectParam): SpEffect {
	const modifiers: SpEffectModifier[] = [];

	if (row.addLifeForceStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'vig',
			value: row.addLifeForceStatus
		});
	}

	if (row.addEndureStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'end',
			value: row.addEndureStatus
		});
	}

	if (row.addStrengthStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'str',
			value: row.addStrengthStatus
		});
	}

	if (row.addDexterityStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'dex',
			value: row.addDexterityStatus
		});
	}

	if (row.addWillpowerStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'mnd',
			value: row.addWillpowerStatus
		});
	}

	if (row.addMagicStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'int',
			value: row.addMagicStatus
		});
	}

	if (row.addFaithStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'fth',
			value: row.addFaithStatus
		});
	}

	if (row.addLuckStatus) {
		modifiers.push({
			type: 'attributes',
			key: 'arc',
			value: row.addLuckStatus
		});
	}

	if (row.changeSleepResistPoint || row.changeMadnessResistPoint) {
		modifiers.push({
			type: 'stats',
			key: 'focus',
			value: row.changeSleepResistPoint ?? row.changeMadnessResistPoint
		});
	}

	if (row.changeDiseaseResistPoint || row.changePoisonResistPoint) {
		modifiers.push({
			type: 'stats',
			key: 'immunity',
			value: row.changeDiseaseResistPoint ?? row.changePoisonResistPoint
		});
	}

	if (row.changeFreezeResistPoint || row.changeBloodResistPoint) {
		modifiers.push({
			type: 'stats',
			key: 'robustness',
			value: row.changeFreezeResistPoint ?? row.changeBloodResistPoint
		});
	}

	if (row.changeCurseResistPoint) {
		modifiers.push({
			type: 'stats',
			key: 'vitality',
			value: row.changeCurseResistPoint
		});
	}

	if (row.maxHpRate !== 1) {
		modifiers.push({
			type: 'stats',
			operation: 'multiply',
			key: 'hp',
			value: row.maxHpRate
		});
	}

	if (row.maxMpRate !== 1) {
		modifiers.push({
			type: 'stats',
			operation: 'multiply',
			key: 'fp',
			value: row.maxMpRate
		});
	}

	if (row.maxStaminaRate !== 1) {
		modifiers.push({
			type: 'stats',
			operation: 'multiply',
			key: 'stamina',
			value: row.maxStaminaRate
		});
	}

	if (row.equipWeightChangeRate !== 1) {
		modifiers.push({
			type: 'stats',
			operation: 'multiply',
			key: 'equipLoad',
			value: row.equipWeightChangeRate
		});
	}

	if (row.neutralDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'standard',
			value: row.neutralDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.slashDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'slash',
			value: row.slashDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.blowDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'strike',
			value: row.blowDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.thrustDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'pierce',
			value: row.thrustDamageCutRate * row.defEnemyDmgCorrectRate_Physics
		});
	}

	if (row.toughnessDamageCutRate !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'poise',
			value: row.toughnessDamageCutRate
		});
	}

	if (row.magicDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Magic !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'mag',
			value: row.magicDamageCutRate * row.defEnemyDmgCorrectRate_Magic
		});
	}

	if (row.fireDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Fire !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'fir',
			value: row.fireDamageCutRate * row.defEnemyDmgCorrectRate_Fire
		});
	}

	if (row.thunderDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Thunder !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'lit',
			value: row.thunderDamageCutRate * row.defEnemyDmgCorrectRate_Thunder
		});
	}

	if (row.darkDamageCutRate !== 1 || row.defEnemyDmgCorrectRate_Dark !== 1) {
		modifiers.push({
			type: 'absorption',
			key: 'hol',
			value: row.darkDamageCutRate * row.defEnemyDmgCorrectRate_Dark
		});
	}

	if (row.bloodAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.HEMORRHAGE,
			value: row.bloodAttackPower
		});
	}

	if (row.diseaseAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.ROT,
			value: row.diseaseAttackPower
		});
	}

	if (row.freezeAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.FROSTBITE,
			value: row.freezeAttackPower
		});
	}

	if (row.madnessAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.MADNESS,
			value: row.madnessAttackPower
		});
	}

	if (row.poizonAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.POISON,
			value: row.poizonAttackPower
		});
	}

	if (row.curseAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.DEATH,
			value: row.curseAttackPower
		});
	}

	if (row.sleepAttackPower) {
		modifiers.push({
			type: 'attackStatus',
			key: StatusEffectType.SLEEP,
			value: row.sleepAttackPower
		});
	}

	if (row.itemDropRate) {
		modifiers.push({
			type: 'stats',
			key: 'discovery',
			value: row.itemDropRate
		});
	}

	if (row.staminaRecoverChangeSpeed) {
		modifiers.push({
			type: 'stats',
			key: 'staminaRecoverySpeed',
			value: row.staminaRecoverChangeSpeed
		});
	}

	if (row.soulRate !== 1) {
		modifiers.push({
			type: 'stats',
			key: 'runeAcquisitionRate',
			value: row.soulRate
		});
	}

	if (row.changeMagicSlot) {
		modifiers.push({
			type: 'stats',
			key: 'magicSlots',
			value: row.changeMagicSlot
		});
	}

	if (row.physicsAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Physics !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.PHYSICAL,
			value: row.physicsAttackRate * row.atkEnemyDmgCorrectRate_Physics
		});
	}

	if (row.magicAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Magic !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.MAGIC,
			value: row.magicAttackRate * row.atkEnemyDmgCorrectRate_Magic
		});
	}

	if (row.fireAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Fire !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.FIRE,
			value: row.fireAttackRate * row.atkEnemyDmgCorrectRate_Fire
		});
	}

	if (row.thunderAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Thunder !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.LIGHTNING,
			value: row.thunderAttackRate * row.atkEnemyDmgCorrectRate_Thunder
		});
	}

	if (row.darkAttackRate !== 1 || row.atkEnemyDmgCorrectRate_Dark !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.HOLY,
			value: row.darkAttackRate * row.atkEnemyDmgCorrectRate_Dark
		});
	}

	if (row.staminaAttackRate !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: AttackType.STAMINA,
			value: row.staminaAttackRate
		});
	}

	if (row.slashAttackRate !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: DamageType.SLASH,
			value: row.slashAttackRate
		});
	}

	if (row.blowAttackRate !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: DamageType.STRIKE,
			value: row.blowAttackRate
		});
	}

	if (row.thrustAttackRate !== 1) {
		modifiers.push({
			type: 'attack',
			operation: 'multiply',
			key: DamageType.PIERCE,
			value: row.thrustAttackRate
		});
	}

	if (row.changeHpEstusFlaskCorrectRate !== 1) {
		modifiers.push({
			type: 'trigger',
			key: 'hpFlaskRecoveryRate',
			value: row.changeHpEstusFlaskCorrectRate
		});
	}

	if (row.changeMpEstusFlaskCorrectRate !== 1) {
		modifiers.push({
			type: 'trigger',
			key: 'fpFlaskRecoveryRate',
			value: row.changeMpEstusFlaskCorrectRate
		});
	}

	if (row.changeHpPoint) {
		modifiers.push({
			type: 'trigger',
			key: 'hpRestore',
			value: row.changeHpPoint
		});
	}

	if (row.changeMpPoint) {
		modifiers.push({
			type: 'trigger',
			key: 'fpRestore',
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
		category: row.spCategory,
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
