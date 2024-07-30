import type { Item, ItemStoreState } from '$lib/item';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

export interface ItemStore<T extends Item> extends Writable<ItemStoreState<T>> {
	all: Readable<T[]>;
	findByType: (type: string) => Readable<T[]>;
	loadAll(entities: Record<string, T>): void;
	updateEntity(id: string, entity: T): void;
}

export function createItemStore<T extends Item>(): ItemStore<T> {
	const store = writable<ItemStoreState<T>>({ loaded: false, entities: {}, ids: [] });

	const updateEntity = (id: string, entity: T): void => {
		store.update((s) => ({ ...s, entities: { ...s.entities, [id]: entity } }));
	};

	const all = derived(store, (s) => s.ids.map((id) => s.entities[id]));

	const findByType = (type: string) => {
		return derived(all, (items) => items.filter((item) => item.type === type));
	};

	const loadAll = (entities: Record<string, T>): void => {
		store.set({
			loaded: true,
			entities,
			ids: Object.keys(entities)
		});
	};

	return {
		all,
		findByType,
		loadAll,
		updateEntity,
		...store
	};
}
