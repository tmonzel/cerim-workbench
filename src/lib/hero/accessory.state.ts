import { derived, writable } from 'svelte/store';
import type { AccessoryItem } from '$lib/item';
import { accessoryStore } from '$lib/stores';

export type AccessoryEquipState = {
	rune: string | null;
	pouch: string | null;
	pouch2: string | null;
	pouch3: string | null;
	pouch4: string | null;
};

export const accessoryEquip = writable<AccessoryEquipState>({
	rune: null,
	pouch: 'talisman:crimson-amber',
	pouch2: null,
	pouch3: null,
	pouch4: null
});

export const accessoryState = derived([accessoryEquip, accessoryStore], ([equip, store]) => {
	const accessories: AccessoryItem[] = [];

	for (const id of Object.values(equip)) {
		if (!id || !store.entities[id]) {
			continue;
		}

		accessories.push(store.entities[id]);
	}

	return accessories;
});
