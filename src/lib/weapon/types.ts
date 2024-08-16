import type { AttackType, AttributeType, DamageType, GraphMutation, Guard, GuardType } from '$lib/core';
import type { ItemData, ScalingBase } from '$lib/item';
import type { AffinityType } from './affinity';

export interface WeaponEntity extends ItemData {
	requirements: Partial<Record<AttributeType, number>>;
	guard?: Guard;
	affinity?: AffinityType;
	affinities?: Partial<Record<AffinityType, WeaponConfig>>;
	attackInfo: AttackInfo;
	config?: WeaponConfig;

	isLightSource: boolean;
	upgradePrice?: number;
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
