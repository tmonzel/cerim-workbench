import { AttributeType } from '$lib/core';
import { writable } from 'svelte/store';

export type AttributeState = Record<AttributeType, number>;

export const attributeStore = writable<AttributeState>({
	[AttributeType.VIGOR]: 0,
	[AttributeType.ENDURANCE]: 0,
	[AttributeType.STRENGTH]: 0,
	[AttributeType.DEXTERITY]: 0,
	[AttributeType.MIND]: 0,
	[AttributeType.INTELLIGENCE]: 0,
	[AttributeType.FAITH]: 0,
	[AttributeType.ARCANE]: 0
});
