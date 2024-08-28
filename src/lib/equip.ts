import { writable } from 'svelte/store';
import { AccessoryItem, createSlot, type AttackItem, type InventoryItem, type ProtectItem } from './item';

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

	greatRune: InventoryItem | null;
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
	greatRune: null
});

export const pouchSlot = createSlot<AccessoryItem>();
