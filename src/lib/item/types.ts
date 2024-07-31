import type { AttackType, AttributeType, GraphMutation, Guard } from '$lib/core';
import type { Item } from './Item';

export interface Upgradable {
	upgrade(tier: number): void;
}

export type ItemData = {
	id: number;
	name: string;
	type: number;
	category: ItemCategory;
	rarity: ItemRarity;
	weight: number;
	tier?: number;
	description?: string;
	iconUrl?: string;
	effects?: number[];
	modifiers?: SpEffectModifier[];
	config?: ItemConfig;
	upgrades?: ItemUpgrade[];
};

export enum ItemCategory {
	WEAPON = 1,
	HELMET = 2,
	ARMOR = 3,
	LEGS = 4,
	ARMS = 5,
	RUNE = 6,
	TALISMAN = 7
}

export enum ItemRarity {
	DEFAULT = 0,
	COMMON = 1,
	RARE = 2,
	LEGENDARY = 3
}

export type ItemConfig = {
	attack?: Partial<Record<AttackType, number>>;
	guard?: Guard;
	scaling?: ScalingBase;
	schema?: string;
	mutations?: GraphMutation[] | number | Partial<Record<AttackType, string>>;
	cast?: 'sorceries' | 'incantations';
	effects?: Record<number, number>;
	attackCorrectId?: string;

	buffable?: boolean;
};

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;

export type ItemRequirements = {
	attributes?: Partial<Record<AttributeType, number>>;
};

export type ItemAttributeScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

export type ItemUpgrade = {
	iconUrl?: string;
	modifiers?: Record<ModifierType, ModifierData>;
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
	modifiers?: SpEffectModifier[];
};

export type SpEffectModifier = {
	group: 'stats' | 'resistance' | 'damageNegation' | 'attributes' | 'status';
	type: 'flat' | 'percentual';

	prop: string;
	value: number;
};

export type ItemStoreState<T extends Item> = {
	loaded: boolean;
	entities: Record<string, T>;
	ids: string[];
};
