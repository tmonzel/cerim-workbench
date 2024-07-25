import type { ItemRow } from '../types';

export interface WeaponRow extends ItemRow {
	wepType: number;
	wepRegainHp: number; // Regain HP

	iconId: number;
	weaponWeightRate: number; // Weight ratio
	weaponCategory: number;

	isNormalAttackType: number;
	isBlowAttackType: number;
	isSlashAttackType: number;
	isThrustAttackType: number;
	isVersusGhostWep: number; // Can hit ghosts?
	isDualBlade: number;
	isEnhance: number; // Can it be strengthened with pine fat?
	isDragonSlayer: number; // Anti Dragon?
	isCustom: number; // Reinforcable?

	lanternWep: number; // Is a light source?

	reinforcePrice: number;

	// Requirements
	properStrength: number;
	properAgility: number;
	properMagic: number;
	properFaith: number;

	// Attack bases
	attackBasePhysics: number;
	attackBaseMagic: number;
	attackBaseFire: number;
	attackBaseThunder: number;
	attackBaseDark: number;
	attackBaseStamina: number;

	attackElementCorrectId: number;

	// Critical Attack Multiplier
	throwAtkRate: number;

	// Stealth Attack Multiplier
	//stealthAtkRate: number;

	// Poise Damage
	saWeaponDamage: number;

	// Guard poise damage absorption
	saGuardCutRate: number;

	// Throw Escape Damage
	attackThrowEscape: number;

	// Parry Occurrence Duration
	parryDamageLife: number;

	// Guard angle
	guardAngle: number;

	// Bow distance %
	bowDistRate: number;

	// Basic value to defeat the enemys parry
	attackBaseParry: number;

	// Used to judge whether to be a parry or a guard at the time of parry judgement
	defenseBaseParry: number;

	rightHandEquipable: number;
	leftHandEquipable: number;
	bothHandEquipable: number;
	arrowSlotEquipable: number;
	boltSlotEquipable: number;

	enableGuard: number;
	enableParry: number;
	enableMagic: number;
	enableSorcery: number;
	enableMiracle: number;
	enableVowMagic: number;
	enableThrow: number; // Throwable weapon

	// Scaling
	correctStrength: number;
	correctAgility: number;
	correctMagic: number;
	correctFaith: number;
	correctLuck: number;

	// CalcCorrect_IDs
	correctType_Physics: number;
	correctType_Magic: number;
	correctType_Fire: number;
	correctType_Thunder: number;
	correctType_Dark: number;
	correctType_Poison: number;
	correctType_Sleep: number;
	correctType_Madness: number;

	// Guard
	physGuardCutRate: number;
	magGuardCutRate: number;
	fireGuardCutRate: number;
	thunGuardCutRate: number;
	darkGuardCutRate: number;
	staminaGuardDef: number;

	poisonGuardResist: number;
	diseaseGuardResist: number;
	bloodGuardResist: number;
	curseGuardResist: number;
	sleepGuardResist: number;
	madnessGuardResist: number;
	freezeGuardResist: number;

	slashGuardCutRate: number;
	blowGuardCutRate: number;
	thrustGuardCutRate: number;

	// SpEffects Behaviors
	spEffectBehaviorId0: number;
	spEffectBehaviorId1: number;
	spEffectBehaviorId2: number;

	// Messages
	spEffectMsgId0: number;
	spEffectMsgId1: number;
	spEffectMsgId2: number;

	// Poise
	//toughnessCorrectRate: number;
	originEquipWep: number;
}
