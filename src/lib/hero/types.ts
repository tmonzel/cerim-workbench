import type {
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicGuard,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import type { AttributeType } from '$lib/core/types';
import type { Item } from '$lib/item';
import type { HeroEquipSlot } from './HeroEquipSlot';
import type { AttributeModifier } from './modifiers';

export type SlotState = Record<keyof EquipState, HeroEquipSlot>;

export type HeroState = {
	type: HeroType;
	level: number;
	progress: number;
	souls: number;
	attributePoints: number;
	equip: EquipState;
	weightRatio: number;
	effects: string[];
	stats: DynamicStats;
	attributes: DynamicAttributes;
	attack: DynamicAttack;
	resistance: DynamicResistance;
	defense: DynamicDefense;
	damageNegation: DynamicDamageNegation;
	guard: DynamicGuard;
};

export type HeroType = {
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
