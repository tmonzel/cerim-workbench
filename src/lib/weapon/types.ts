import type { AttackType, AttributeType, DamageType, Guard, GuardType } from '$lib/core';
import type { ItemConfig, ItemData, ModifierData, ModifierType } from '$lib/item';
import type { AffinityType } from './affinity';

export interface WeaponEntity extends ItemData {
	requirements: WeaponRequirements;
	guard?: Guard;
	affinity?: AffinityType;
	affinities?: Partial<Record<AffinityType, ItemConfig>>;
	attackInfo: AttackInfo;

	isLightSource: boolean;
	upgradePrice?: number;
}

export type WeaponRequirements = Partial<Record<AttributeType, number>>;
export type WeaponScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

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
