import { writable } from 'svelte/store';

export type WeaponAttackState = {
	twoHanding: boolean;
};

export type CombatState = {
	activeHand: 'mainHand' | 'offHand';
	twoHanding: boolean;
};

export const combatStore = writable<CombatState>({
	activeHand: 'mainHand',
	twoHanding: false
});
