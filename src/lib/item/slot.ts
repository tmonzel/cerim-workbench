import { writable } from 'svelte/store';
import type { Item } from './Item';

export type EquipSlot<T> = {
	update(item: T): void;
};

export function createSlot<T extends Item>(): EquipSlot<T> {
	const equippedItem = writable<T | null>(null);

	const update = (item: T) => {
		equippedItem.set(item);
	};

	return {
		update
	};
}
