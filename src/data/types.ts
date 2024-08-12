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
	MADNESS = 437,
	ACCUMULATOR_3 = 305
}

export interface SpEffectParam extends DataRow {
	stateInfo: SpEffectType;
	spCategory: number;
	iconId: number;
	paramdexName: string;

	effectEndurance: number; // -1 for permanent, 0 for one moment only
	motionInterval: number; // How many second it occurs

	conditionHp: number; // Trigger at hp below %
	conditionHpRate: number; // Trigger at hp above % (-1)

	magParamChange: number; // Affects Sorcery
	miracleParamChange: number; // Affects Incantations
	shamanParamChange: number; // Affects Pyromancy
	throwAttackParamChange: number; // Affects throw attacks

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
	changeCurseResistPoint: number;

	maxHpRate: number;
	maxMpRate: number;
	maxStaminaRate: number;
	equipWeightChangeRate: number;
	hpRecoverRate: number;

	neutralDamageCutRate: number;
	slashDamageCutRate: number;
	blowDamageCutRate: number;
	thrustDamageCutRate: number;
	magicDamageCutRate: number;
	fireDamageCutRate: number;
	thunderDamageCutRate: number;
	darkDamageCutRate: number;
	toughnessDamageCutRate: number; // Poise

	atkEnemyDmgCorrectRate_Physics: number;
	atkEnemyDmgCorrectRate_Magic: number;
	atkEnemyDmgCorrectRate_Fire: number;
	atkEnemyDmgCorrectRate_Thunder: number;
	atkEnemyDmgCorrectRate_Dark: number;

	defEnemyDmgCorrectRate_Physics: number;
	defEnemyDmgCorrectRate_Magic: number;
	defEnemyDmgCorrectRate_Fire: number;
	defEnemyDmgCorrectRate_Thunder: number;
	defEnemyDmgCorrectRate_Dark: number;
	defObjectAttackPowerRate: number;
	defObjDmgCorrectRate: number;
	saReceiveDamageRate: number;

	staminaRecoverChangeSpeed: number;
	itemDropRate: number;
	soulRate: number;
	changeMagicSlot: number;

	physicsAttackRate: number;
	magicAttackRate: number;
	fireAttackRate: number;
	thunderAttackRate: number;
	darkAttackRate: number;
	staminaAttackRate: number;
	slashAttackRate: number;
	blowAttackRate: number;
	thrustAttackRate: number;
	neutralAttackRate: number;

	// Conditions
	magicSubCategoryChange1: number;
	magicSubCategoryChange2: number;
	magicSubCategoryChange3: number;

	// Flask restore
	changeHpEstusFlaskCorrectRate: number;
	changeMpEstusFlaskCorrectRate: number;

	changeHpPoint: number; // Flat hp per sec
	changeMpPoint: number; // Flat fp per sec

	// Accumulator
	accumuOverFireId: number; // Ref SpEffect for accumulation
	accumuUnderFireId: number;
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

	equipModelId: number;
	equipModelCategory: EquipModelCategory;

	// Name
	paramdexName: string;

	rarity: ItemRarity;

	reinforceTypeId: number;

	// SpEffects
	residentSpEffectId: number;
	residentSpEffectId1: number;
	residentSpEffectId2: number;
	residentSpEffectId3: number;
	residentSpEffectId4: number;

	sortGroupId: number;
}
