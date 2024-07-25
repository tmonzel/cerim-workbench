import { derived, writable } from 'svelte/store';
import { createEntityStore } from '$lib/core';
import { Weapon } from './Weapon';

export type CombatEquipState = {
	mainHand: string | null;
	offHand: string | null;
};

export const combatEquip = writable<CombatEquipState>({
	mainHand: null,
	offHand: null
});

export const weaponStore = createEntityStore<Weapon>({ loaded: false, entities: {}, ids: [] });

export const combatState = derived([weaponStore, combatEquip], ([store, equip]) => {
	return {
		mainHand: equip.mainHand ? store.entities[equip.mainHand] : null,
		offHand: equip.offHand ? store.entities[equip.offHand] : null
	};
});
