import type { AccessoryItem } from '$lib/accessory';
import type { ProtectItem } from '$lib/armor';
import type { AttackItem } from '$lib/weapon';
import { writable } from 'svelte/store';

export type EquipState = {
	mainHand: AttackItem | null;
	offHand: AttackItem | null;

	head: ProtectItem | null;
	chest: ProtectItem | null;
	legs: ProtectItem | null;
	arms: ProtectItem | null;

	pouch: AccessoryItem | null;
	pouch2: AccessoryItem | null;
	pouch3: AccessoryItem | null;
	pouch4: AccessoryItem | null;

	rune: AccessoryItem | null;
};

export const equipStore = writable<EquipState>({
	mainHand: null,
	offHand: null,

	head: null,
	chest: null,
	legs: null,
	arms: null,

	pouch: null,
	pouch2: null,
	pouch3: null,
	pouch4: null,

	rune: null
});
