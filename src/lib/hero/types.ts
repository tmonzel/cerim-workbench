import type {
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicNumber,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import type { AttributeType } from '$lib/core/types';

export type HeroContext = {
	id: string;
	name: string;
};

export type HeroState = {
	type: HeroType;
	level: number;
	progress: number;
	souls: number;
	attributePoints: number;
	weight: number;
	weightRatio: number;
	totalAttributes: Record<string, number>;

	attack: DynamicAttack;
	stats: DynamicStats;
	attributes: DynamicAttributes;
	defense: DynamicDefense;
	resistance: DynamicResistance;
	damageNegation: DynamicDamageNegation;

	/*staminaRecoverySpeed: number; // Per Second

	hpFlaskRestorationRate: DynamicNumber;
	hpRestoration: DynamicNumber;

	fpFlaskRestorationRate: DynamicNumber;
	fpRestoration: DynamicNumber;

	runeGainRate: DynamicNumber;
	sorcerySlots: DynamicNumber;*/
};

export type HeroType = {
	id: string;
	name: string;
	level: number;
	attributes: Record<AttributeType, number>;
};

export enum HeroStat {
	HP = 'hp',
	FP = 'fp',
	STAMINA = 'stamina',
	DISCOVERY = 'discovery',
	WEIGHT = 'weight',
	EQUIP_LOAD = 'equipLoad',
	POISE = 'poise',

	IMMUNITY = 'immunity',
	ROBUSTNESS = 'robustness',
	FOCUS = 'focus',
	VITALITY = 'vitality',

	DEFENSE_STANDARD = 'def:standard',
	DEFENSE_STRIKE = 'def:strike'
}

export type HeroBodyState = {
	guardInfo: boolean;
	scalingInfo: boolean;
};

export type HeroStateModifier = {
	modify(hero: HeroState): void;
};
