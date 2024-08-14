import type { AttributeType, DynamicAttack, DynamicValue } from '$lib/core';

export type HeroContext = {
	id: string;
	name: string;
};

export type HeroState = {
	level: number;
	attributePoints: number;

	progress: number;
	souls: number;

	weight: number;
	poise: number;

	attack: DynamicAttack;
	attributes: Record<string, number>;
	damageNegation: Record<string, DynamicValue>;
	stats: Record<string, DynamicValue>;
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
