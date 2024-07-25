import type {
	AffinityType,
	AttackType,
	AttributeType,
	DamageType,
	GraphMutation,
	Guard,
	ModifierData,
	ModifierType,
	ScalingBase
} from '$lib/core';
import type { ItemData } from '$lib/item/types';

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
	attackInfo?: ItemAttackInfo;

	isLightSource: boolean;
	upgradePrice?: number;
}

export type ItemAttackInfo = {
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

export type ItemRequirements = {
	attributes?: Partial<Record<AttributeType, number>>;
};

export type ItemAttributeScaling = Record<string, { base: number; attackTypes: AttackType[] }>;

export type ItemUpgrade = {
	iconUrl?: string;
	modifiers?: Record<ModifierType, ModifierData>;
};
