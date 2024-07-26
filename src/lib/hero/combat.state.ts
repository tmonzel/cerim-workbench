import { weaponStore } from '$lib/stores';
import { derived, writable } from 'svelte/store';

export type CombatEquipState = {
	mainHand: string | null;
	offHand: string | null;
};

export const combatEquip = writable<CombatEquipState>({
	mainHand: null,
	offHand: null
});

export const combatState = derived([weaponStore, combatEquip], ([store, equip]) => {
	return {
		mainHand: equip.mainHand ? store.entities[equip.mainHand] : null,
		offHand: equip.offHand ? store.entities[equip.offHand] : null
	};
});
