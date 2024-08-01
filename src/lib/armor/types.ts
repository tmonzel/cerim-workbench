import type { DamageNegation, Resistance } from '$lib/core';
import type { ItemData } from '$lib/item';

export enum ArmorWeightClass {
	LIGHT = 1,
	MEDIUM = 2,
	HEAVY = 3
}

export interface ArmorEntity extends ItemData {
	resistance: Resistance;
	damageNegation: DamageNegation;
	poise: number;
	weightClass: ArmorWeightClass;
}
