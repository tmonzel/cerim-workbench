import { derived, writable } from 'svelte/store';
import { createEntityStore, DynamicNumber } from '$lib/core';
import type { Armor } from './Armor';

export type ProtectionEquipState = {
	head: string | null;
	chest: string | null;
	legs: string | null;
	arms: string | null;
};

export type ProtectionState = {
	poise: DynamicNumber;
};

export const protectionEquip = writable<ProtectionEquipState>({
	head: null,
	chest: null,
	legs: null,
	arms: null
});

export const armorStore = createEntityStore<Armor>({
	loaded: false,
	entities: {},
	ids: []
});

export const protectionState = derived([armorStore, protectionEquip], ([store, equip]) => {
	const armors: Armor[] = [];

	for (const id of Object.values(equip)) {
		if (!id || !store.entities[id]) {
			continue;
		}

		armors.push(store.entities[id]);
	}

	return armors;
});
