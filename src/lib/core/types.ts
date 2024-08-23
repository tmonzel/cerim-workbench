import type { DamageType } from './damage';

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
