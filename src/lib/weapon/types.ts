import type { AffinityType, AttackType, AttributeType, DamageType, Guard, GuardType } from '$lib/core';
import type { ItemConfig, ItemData, ModifierData, ModifierType } from '$lib/item';

export interface WeaponEntity extends ItemData {
	type: string;
	group: string;
	poise?: number;
	armor?: number;
	tier?: number;
	attackSpeed?: number;
	requirements?: ItemRequirements;
	guard?: Guard;
	affinity?: AffinityType;
	affinities?: Partial<Record<AffinityType, ItemConfig>>;
	attackInfo: AttackInfo;

	isLightSource: boolean;
	upgradePrice?: number;
}

export type ItemRequirements = {
	attributes?: Partial<Record<AttributeType, number>>;
};

export type ItemAttributeScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

export type AttackInfo = {
	damage: DamageType[];
	crit: number;
	poise: number;
	vsGhost: boolean;
	vsDragon: boolean;
};

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
