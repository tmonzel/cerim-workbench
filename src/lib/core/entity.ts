import { derived, writable, type Readable, type Writable } from 'svelte/store';

export type EntityState<T> = {
	loaded: boolean;
	entities: Record<string, T>;
	ids: string[];
};

export interface EntityStore<T> extends Writable<EntityState<T>> {
	all: Readable<T[]>;
	loadAll(entities: Record<string, T>): void;
	updateEntity(id: string, entity: T): void;
}

export function createEntityStore<T>(state: EntityState<T> = { loaded: false, entities: {}, ids: [] }): EntityStore<T> {
	const store = writable<EntityState<T>>(state);

	const updateEntity = (id: string, entity: T): void => {
		store.update((s) => ({ ...s, entities: { ...s.entities, [id]: entity } }));
	};

	const all = derived(store, (s) => s.ids.map((id) => s.entities[id]));

	const loadAll = (entities: Record<string, T>): void => {
		store.set({
			loaded: true,
			entities,
			ids: Object.keys(entities)
		});
	};

	return {
		all,
		loadAll,
		updateEntity,
		...store
	};
}
