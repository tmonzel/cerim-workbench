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
	modifiers?: Record<ModifierType, ModifierData>;
	config?: ItemConfig;
	affinities?: Partial<Record<AffinityType, ItemConfig>>;
	upgrades?: ItemUpgrade[];
	attackInfo?: ItemAttackInfo;
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

export type ItemAttackInfo = {
	damage: DamageType[];
	crit: number;
};

export type ItemUpgrade = {
	iconUrl?: string;
	modifiers?: Record<ModifierType, ModifierData>;
};

export type ItemRequirements = {
	attributes?: Partial<Record<AttributeType, number>>;
};

export type ItemAttributeScaling = Partial<
	Record<AttributeType, { base: number; attackTypes: AttackType[] }>
>;

export type ItemConfig = {
	attack?: Partial<Record<AttackType, number>>;
	guard?: Guard;
	scaling?: ScalingBase;
	schema?: string;
	mutations?: GraphMutation[] | number | Partial<Record<AttackType, string>>;
	cast?: 'sorceries' | 'incantations';
	effects?: Record<number, number>;
	attackCorrectId?: string;
};
