import type { ItemRarity } from '$lib/item/types';

export type DataField = {
	name: string;
	defaultValue: unknown;
};

export interface DataRow {
	id: number;
}

export enum EquipModelCategory {
	NONE = 0,
	ARMS = 1,
	BODY = 2,
	HAIR = 4,
	HEAD = 5,
	LEGS = 6,
	WEAPON = 7
}

export enum SpEffectType {
	NONE = 0,
	HEMORRHAGE = 6,
	ROT = 5,
	POISON = 2,
	BLIGHT = 116,
	FROSTBITE = 260,
	SLEEP = 436,
	MADNESS = 437
}

export interface SpEffectParam extends DataRow {
	stateInfo: SpEffectType;
	iconId: number;
	paramdexName: string;
	bloodAttackPower: number;
	sleepAttackPower: number;
	curseAttackPower: number;
	diseaseAttackPower: number;
	poizonAttackPower: number;
	freezeAttackPower: number;
	madnessAttackPower: number;

	addLifeForceStatus: number; // +Vigor
	addWillpowerStatus: number; // +Mind
	addEndureStatus: number; // +Endurance
	addVitalityStatus: number; // +Vitality Resistance
	addStrengthStatus: number; // +Strength
	addDexterityStatus: number; // +Dexterity
	addMagicStatus: number; // +Intelligence
	addFaithStatus: number; // +Faith
	addLuckStatus: number; // +Arcance

	changePoisonResistPoint: number;
	changeDiseaseResistPoint: number;
	changeBloodResistPoint: number;
	changeFreezeResistPoint: number;
	changeSleepResistPoint: number;
	changeMadnessResistPoint: number;

	maxHpRate: number;
	maxMpRate: number;
	maxStaminaRate: number;
	equipWeightChangeRate: number;
	hpRecoverRate: number;
}

export interface AttackCorrectParam extends DataRow {
	isStrengthCorrect_byPhysics: number;
	isDexterityCorrect_byPhysics: number;
	isMagicCorrect_byPhysics: number;
	isFaithCorrect_byPhysics: number;
	isLuckCorrect_byPhysics: number;

	isStrengthCorrect_byMagic: number;
	isDexterityCorrect_byMagic: number;
	isMagicCorrect_byMagic: number;
	isFaithCorrect_byMagic: number;
	isLuckCorrect_byMagic: number;

	isStrengthCorrect_byFire: number;
	isDexterityCorrect_byFire: number;
	isMagicCorrect_byFire: number;
	isFaithCorrect_byFire: number;
	isLuckCorrect_byFire: number;

	isStrengthCorrect_byThunder: number;
	isDexterityCorrect_byThunder: number;
	isMagicCorrect_byThunder: number;
	isFaithCorrect_byThunder: number;
	isLuckCorrect_byThunder: number;

	isStrengthCorrect_byDark: number;
	isDexterityCorrect_byDark: number;
	isMagicCorrect_byDark: number;
	isFaithCorrect_byDark: number;
	isLuckCorrect_byDark: number;
}

export interface CalcCorrectParam extends DataRow {
	stageMaxVal0: number;
	stageMaxVal1: number;
	stageMaxVal2: number;
	stageMaxVal3: number;
	stageMaxVal4: number;

	stageMaxGrowVal0: number;
	stageMaxGrowVal1: number;
	stageMaxGrowVal2: number;
	stageMaxGrowVal3: number;
	stageMaxGrowVal4: number;

	adjPt_maxGrowVal0: number;
	adjPt_maxGrowVal1: number;
	adjPt_maxGrowVal2: number;
	adjPt_maxGrowVal3: number;
	adjPt_maxGrowVal4: number;
}

export interface ReinforceParam extends DataRow {
	paramdexName: string;

	// Attack
	physicsAtkRate: number;
	magicAtkRate: number;
	fireAtkRate: number;
	thunderAtkRate: number;
	darkAtkRate: number;
	staminaAtkRate: number;
	saWeaponAtkRate: number;

	// Scaling
	correctStrengthRate: number;
	correctAgilityRate: number;
	correctMagicRate: number;
	correctFaithRate: number;
	correctLuckRate: number;

	// Guard
	physicsGuardCutRate: number;
	magicGuardCutRate: number;
	fireGuardCutRate: number;
	thunderGuardCutRate: number;
	darkGuardCutRate: number;

	poisonGuardResistRate: number;
	diseaseGuardResistRate: number;
	bloodGuardResistRate: number;
	curseGuardResistRate: number;
	staminaGuardDefRate: number;
	freezeGuardDefRate: number;
	sleepGuardDefRate: number;
	madnessGuardDefRate: number;

	maxReinforceLevel: number;

	// Offsets
	spEffectId1: number;
	spEffectId2: number;
	spEffectId3: number;

	residentSpEffectId1: number;
	residentSpEffectId2: number;
	residentSpEffectId3: number;
}

export interface ItemRow extends DataRow {
	weight: number;
	iconId: number;
	iconIdF: number;
	iconIdM: number;

	reinforceTypeId: number;
	attackElementCorrectId: number;
	equipModelCategory: EquipModelCategory;
	originEquipWep: number;

	// Type
	wepType: number;

	// Name
	paramdexName: string;

	rarity: ItemRarity;

	// CalcCorrect_IDs
	correctType_Physics: number;
	correctType_Magic: number;
	correctType_Fire: number;
	correctType_Thunder: number;
	correctType_Dark: number;
	correctType_Poison: number;
	correctType_Sleep: number;
	correctType_Madness: number;

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

	// Scaling
	correctStrength: number;
	correctAgility: number;
	correctMagic: number;
	correctFaith: number;
	correctLuck: number;

	// Guard
	physGuardCutRate: number;
	magGuardCutRate: number;
	fireGuardCutRate: number;
	thunGuardCutRate: number;
	darkGuardCutRate: number;
	staminaGuardDef: number;

	isNormalAttackType: number;
	isBlowAttackType: number;
	isSlashAttackType: number;
	isThrustAttackType: number;

	// Crit
	throwAtkRate: number;

	// Defense
	defensePhysics: number;
	defenseMagic: number;
	defenseFire: number;
	defenseThunder: number;
	defenseDark: number;
	defenseSlash: number;
	defenseBlow: number;
	defenseThrust: number;

	// Damage Neg
	neutralDamageCutRate: number;
	slashDamageCutRate: number;
	blowDamageCutRate: number;
	thrustDamageCutRate: number;
	magicDamageCutRate: number;
	fireDamageCutRate: number;
	thunderDamageCutRate: number;
	darkDamageCutRate: number;

	poisonGuardResist: number;
	diseaseGuardResist: number;
	bloodGuardResist: number;
	curseGuardResist: number;
	sleepGuardResist: number;
	madnessGuardResist: number;
	freezeGuardResist: number;

	// Poise
	toughnessCorrectRate: number;

	// Immunity
	resistPoison: number;
	resistDisease: number;

	// Robustness
	resistBlood: number;
	resistFreeze: number;

	// Vitality
	resistCurse: number;

	// Focus
	resistSleep: number;
	resistMadness: number;

	// SpEffects Behaviors
	spEffectBehaviorId0: number;
	spEffectBehaviorId1: number;
	spEffectBehaviorId2: number;

	// SpEffects
	residentSpEffectId: number;
	residentSpEffectId2: number;
	residentSpEffectId3: number;

	enableMagic: number;
	enableMiracle: number;

	isDualBlade: number;
	bothHandEquipable: number;
	isEnhance: number; // Can it be strengthened with pine fat?
}
