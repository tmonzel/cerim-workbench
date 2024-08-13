import { fetchData, itemMap } from '$lib/data';
import { writable } from 'svelte/store';
import type { GoodEntity } from './types';
import { InventoryItem } from './InventoryItem';

export const inventoryStore = writable<Record<string, InventoryItem>>({});

export async function loadInventory() {
	const { data } = await fetchData<{ data: Record<string, GoodEntity> }>(`/goods.json`);

	const items: Record<string, InventoryItem> = {};

	for (const id in data) {
		items[id] = new InventoryItem(id, data[id]);
		itemMap.set(id, items[id]);
	}

	inventoryStore.set(items);
}
