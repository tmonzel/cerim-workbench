import type { AttributeType } from '$lib/attribute';
import type { AttackType, DamageType, GraphMutation, Guard, GuardType } from '$lib/core';
import type { SpEffectCategory, SpEffectCondition, SpEffectModifier } from '$lib/effect/types';
import type { Item } from './Item';

export interface Upgradable {
	tier: number;
	possibleUpgrades: number;
	upgrade(tier: number): void;
}

export type ItemEntity = {
	id: number;
	name: string;
	type: number;
	rarity: ItemRarity;
	weight: number;
	tier?: number;
	description?: string;
	iconId: string;
	effects?: number[];
	modifiers?: SpEffectModifier[];
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

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;

export type ItemRequirements = {
	attributes?: Partial<Record<AttributeType, number>>;
};

export type ItemAttributeScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

export type ItemUpgrade = {
	iconId: string;
	effects?: number[];
	effectInfo?: string;
};

export type ItemEffect = {
	target: string;
	category: SpEffectCategory;
	duration: number;
	affectedSpellTypes?: string[];
	conditions?: SpEffectCondition[];
	modifiers?: SpEffectModifier[];
	activated: boolean;
};

export type ModifierType = 'flat' | 'percentual';
export type ModifierData = Record<string, ModifierConfig>;
export type ModifierConfig = {
	name?: string;
	multiplier?: 'offset' | 'total';
	modify: Record<string, number>;
};

export type ItemStoreState<T extends Item> = {
	loaded: boolean;
	entities: Record<string, T>;
	ids: string[];
};

export enum ActivateCondition {
	SKILL_ATTACK = 112,
	CHARGED_SKILL_ATTACK = 111
}

export enum ArmorWeightClass {
	LIGHT = 1,
	MEDIUM = 2,
	HEAVY = 3
}

export type WeaponScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

export type AttackInfo = {
	damage: DamageType[];
	crit: number;
	poise: number;
	vsGhost: boolean;
	vsDragon: boolean;
};

export type UpgradeSchema = {
	tiers: number;
	attack: Record<string, number[]>;
	scaling: Record<string, number[]>;
	guard: Record<GuardType, number[]>;
	effects: Record<number, number[]>;
};

export type WeaponConfig = {
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
