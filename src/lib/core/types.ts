import type { AttributeType } from './attributes';
import type { DamageType } from './damage';
import type { DynamicValue } from './DynamicValue';

export type DynamicNumber = {
	base: number;
	offset: number;
	multiplier: number;
};

export type Modifier = {
	operation: 'multiply' | 'add';
	value: number;
};

export type GraphMutation = {
	breakpoint: number;
	grow: number;
	exp?: number;
};

export enum AttackType {
	PHYSICAL = 'phy',
	MAGIC = 'mag',
	FIRE = 'fir',
	LIGHTNING = 'lit',
	HOLY = 'hol',
	STAMINA = 'sta',
	SORCERY = 'sor',
	INCANTATION = 'inc'
}

export enum StatusEffectType {
	FROSTBITE = 'frb',
	POISON = 'poi',
	HEMORRHAGE = 'hem',
	SLEEP = 'slp',
	ROT = 'rot',
	DEATH = 'dth',
	MADNESS = 'mad'
}

export type ResistanceType = 'immunity' | 'robustness' | 'focus' | 'vitality';

export enum GuardType {
	PHYSICAL = 'phy',
	MAGIC = 'mag',
	FIRE = 'fir',
	LIGHTNING = 'lit',
	HOLY = 'hol',
	STABILITY = 'sta',
	RESISTANCE = 'res'
}

export type Resistance = Record<ResistanceType, number>;
export type Guard = Record<GuardType, number>;
export type Defense = Record<DamageType, number>;
export type DamageNegation = Record<DamageType, number>;
export type Attack = Partial<Record<AttackType, number>>;

export type AttackCorrect = Record<string, AttackType[]>;

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

export enum AttackStatusType {
	NONE = 0,
	MAGIC = 10,
	FIRE = 11,
	LIGHTNING = 12,
	HOLY = 13,
	POISON = 20,
	SCARLET_ROT = 21,
	HEMORRHAGE = 22,
	FROSTBITE = 23,
	SLEEP = 24,
	MADNESS = 25,
	BLIGHT = 26
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

export type Hero = {
	level: number;
	attributePoints: number;

	progress: number;
	souls: number;

	weight: number;
	poise: number;

	attack: Record<AttackType, DynamicNumber>;
	attributes: Record<AttributeType, number>;
	damageNegation: Record<string, DynamicValue>;
	stats: Record<string, DynamicValue>;
};

export type HeroType = {
	id: string;
	name: string;
	level: number;
	attributes: Record<AttributeType, number>;
};

export type Weapon = {
	name: string;
	requirements: Partial<Record<AttributeType, number>>;
	attack: Partial<Record<AttackType, number>>;
};
