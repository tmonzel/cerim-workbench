import type { ItemData } from '$lib/item';

export enum ActivateCondition {
	SKILL_ATTACK = 112,
	CHARGED_SKILL_ATTACK = 111
}

export interface AccessoryEntity extends ItemData {
	effectInfo?: string;
}
