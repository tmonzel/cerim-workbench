import type { DamageNegation, Resistance } from '$lib/core';
import type { ItemData } from '$lib/item';

export interface ArmorEntity extends ItemData {
	resistance: Resistance;
	damageNegation: DamageNegation;
	poise: number;
}
