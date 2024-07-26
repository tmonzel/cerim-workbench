import type {
	AffinityType,
	AttackType,
	AttributeType,
	DamageNegation,
	DamageType,
	GraphMutation,
	Guard,
	GuardType,
	Resistance
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
	attackInfo?: AttackInfo;

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

export type Affinity = {
	name: string;
	schema: string;
	iconUrl: string;
};

export interface WeaponEntity extends ItemData {
	type: string;
	group: string;
	poise?: number;
	weight?: number;
	armor?: number;
	tier?: number;
	attackSpeed?: number;
	requirements?: ItemRequirements;
	guard?: Guard;
	affinity?: AffinityType;
	iconUrl?: string;
	effects?: string[];
	effectInfo?: string[];
	modifiers?: Record<ModifierType, ModifierData>;
	config?: ItemConfig;
	affinities?: Partial<Record<AffinityType, ItemConfig>>;
	upgrades?: ItemUpgrade[];
	attackInfo?: AttackInfo;

	isLightSource: boolean;
	upgradePrice?: number;
}

export type AttackInfo = {
	damage: DamageType[];
	crit: number;
	poise: number;
	vsGhost: boolean;
	vsDragon: boolean;
};

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

export type UpgradeSchema = {
	tiers: number;
	attack: Record<string, number[]>;
	scaling: Record<string, number[]>;
	guard: Record<GuardType, number[]>;
	effects: Record<number, number[]>;
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
	statusTypes?: Record<string, number | number[]>;
	modifiers?: Partial<Record<ModifierType, ModifierData>>;
};
