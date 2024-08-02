export enum StatType {
	HEALTH = 'hp',
	FOCUS_POINTS = 'fp',
	STAMINA = 'stamina',
	DISCOVERY = 'discovery',
	WEIGHT = 'weight',
	EQUIP_LOAD = 'equipLoad'
}

export enum DamageType {
	STANDARD = 'standard',
	STRIKE = 'strike',
	SLASH = 'slash',
	PIERCE = 'pierce',
	HOLY = 'hol',
	LIGHTNING = 'lit',
	FIRE = 'fir',
	MAGIC = 'mag',
	POISE = 'poise'
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

export type Resistance = Record<ResistanceType, number>;
export type Guard = Record<GuardType, number>;
export type Defense = Record<DamageType, number>;
export type DamageNegation = Record<DamageType, number>;
export type Attack = Partial<Record<AttackType, number>>;

export type AttackCorrect = Record<string, AttackType[]>;
