import type { AttributeType } from '$lib/attribute';
import type { AffinityType, DamageNegation, Guard, Resistance } from '$lib/core';
import type { ArmorWeightClass, AttackInfo, ItemEntity, WeaponConfig } from './types';

export interface ArmorEntity extends ItemEntity {
	resistance: Resistance;
	damageNegation: DamageNegation;
	poise: number;
	weightClass: ArmorWeightClass;
}

export interface GoodEntity extends ItemEntity {
	effectInfo?: string;
}

export interface AccessoryEntity extends ItemEntity {
	effectInfo?: string;
}

export interface WeaponEntity extends ItemEntity {
	requirements: Partial<Record<AttributeType, number>>;
	guard?: Guard;
	affinity?: AffinityType;
	affinities?: Partial<Record<AffinityType, WeaponConfig>>;
	attackInfo: AttackInfo;
	config?: WeaponConfig;

	isLightSource: boolean;
	upgradePrice?: number;
}
