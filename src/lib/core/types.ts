export type Maybe<T> = T | null | undefined;

export type Stat = {
	name: string;
};

export enum StatType {
	HEALTH = 'hp',
	FOCUS_POINTS = 'fp',
	STAMINA = 'stamina',
	DISCOVERY = 'discovery',
	WEIGHT = 'weight',
	EQUIP_LOAD = 'equipLoad',
	ATTACK_SPEED = 'attackSpeed',
	POISE = 'poise'
}

export enum DamageType {
	STANDARD = 'standard',
	STRIKE = 'strike',
	SLASH = 'slash',
	PIERCE = 'pierce',
	HOLY = 'hol',
	LIGHTNING = 'lit',
	FIRE = 'fir',
	MAGIC = 'mag'
}

export type GraphMutation = {
	breakpoint: number;
	grow: number;
	exp?: number;
};

export enum AttributeType {
	VIGOR = 'vig',
	ENDURANCE = 'end',
	STRENGTH = 'str',
	DEXTERITY = 'dex',
	MIND = 'mnd',
	INTELLIGENCE = 'int',
	FAITH = 'fth',
	ARCANE = 'arc'
}

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

export enum AffinityType {
	STANDARD = 'standard',
	HEAVY = 'heavy',
	KEEN = 'keen',
	QUALITY = 'quality',
	FIRE = 'fire',
	FLAME = 'flame',
	LIGHTNING = 'lightning',
	SACRED = 'sacred',
	MAGIC = 'magic',
	COLD = 'cold',
	POISON = 'poison',
	BLOOD = 'blood',
	OCCULT = 'occult'
}

export type Affinity = {
	name: string;
	schema: string;
	iconUrl: string;
};

export type Resistance = Record<ResistanceType, number>;
export type Guard = Record<GuardType, number>;
export type Defense = Record<DamageType, number>;
export type DamageNegation = Record<DamageType, number>;
export type Attack = Partial<Record<AttackType, number>>;

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;

export type AttackCorrect = Record<string, AttackType[]>;

export type UpgradeSchema = {
	tiers: number;
	attack: Record<string, number[]>;
	scaling: Record<string, number[]>;
	guard: Record<GuardType, number[]>;
};

export type ModifierType = 'flat' | 'percentual';
export type ModifierData = Record<string, ModifierConfig>;
export type ModifierConfig = {
	name?: string;
	multiplier?: 'offset' | 'total';
	modify: Record<string, number>;
};

export type SpEffect = {
	id: number;
	statusTypes?: Record<string, number | number[]>;
	modifiers?: Partial<Record<ModifierType, ModifierData>>;
};
