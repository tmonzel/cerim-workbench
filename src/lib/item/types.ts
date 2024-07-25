import type {
	AffinityType,
	AttackType,
	AttributeType,
	DamageNegation,
	DamageType,
	GraphMutation,
	Guard,
	ModifierData,
	ModifierType,
	Resistance,
	ScalingBase
} from '$lib/core';

export type ItemData = {
	id: number;
	name: string;
	type: string;
	category: ItemCategory;
	group: string;
	rarity: ItemRarity;
	poise?: number;
	weight?: number;
	armor?: number;
	tier?: number;
	attackSpeed?: number;
	description?: string;
	requirements?: ItemRequirements;
	resistance?: Resistance;
	damageNegation?: DamageNegation;
	guard?: Guard;
	affinity?: AffinityType;
	iconUrl?: string;
	effects?: string[];
	effectInfo?: string[];
	modifiers?: Record<ModifierType, ModifierData>;
	config?: ItemConfig;
	affinities?: Partial<Record<AffinityType, ItemConfig>>;
	upgrades?: ItemUpgrade[];
	attackInfo?: ItemAttackInfo;

	isLightSource: boolean;
	upgradePrice?: number;
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
