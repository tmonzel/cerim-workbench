import type { AttributeType, DynamicAttack, DynamicAttributes, DynamicDamageNegation, DynamicValue } from '$lib/core';
import type { AttributeScaling } from './attributes';

export type HeroContext = {
	id: string;
	name: string;
};

export type HeroStat = {
	name: string;
	attributeScaling?: AttributeScaling;
	renderer?: (value: number) => string;
};

export type HeroState = {
	type: HeroType;
	level: number;
	attributePoints: number;

	progress: number;
	souls: number;

	weight: number;
	poise: number;
	totalAttributes: Record<string, number>;

	attack: DynamicAttack;
	attributes: DynamicAttributes;
	damageNegation: DynamicDamageNegation;
	stats: Record<string, DynamicValue>;

	/* 

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

export type HeroBodyState = {
	guardInfo: boolean;
	scalingInfo: boolean;
};

export type HeroStateModifier = {
	modify(hero: HeroState): void;
};
