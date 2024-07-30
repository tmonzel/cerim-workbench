import type {
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import type { AttributeType } from '$lib/core/types';
import type { Item } from '$lib/item';
import type { AttributeModifier } from './modifiers';

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
	weightRatio: number;
	totalAttributes: Record<string, number>;

	stats: DynamicStats;
	attributes: DynamicAttributes;
	defense: DynamicDefense;
	resistance: DynamicResistance;
	damageNegation: DynamicDamageNegation;

	mainHandAttack: DynamicAttack;
	offHandAttack: DynamicAttack;
};

export type HeroType = {
	id: string;
	name: string;
	level: number;
	attributes: Record<AttributeType, number>;
};

export type EquipState = {
	rune: Item | null;
	pouch: Item | null;
	pouch2: Item | null;
	pouch3: Item | null;
	pouch4: Item | null;
	head: Item | null;
	chest: Item | null;
	legs: Item | null;
	hand: Item | null;
	mainHand: Item | null;
	offHand: Item | null;
};

export type HeroBodyState = {
	guardInfo: boolean;
	scalingInfo: boolean;
};

export type HeroStateModifier = {
	modify(hero: HeroState): void;
};

export type HeroAttribute = {
	name: string;
	color: string;
	modifier?: AttributeModifier;
};

export type AttributeState = Record<AttributeType, number>;
