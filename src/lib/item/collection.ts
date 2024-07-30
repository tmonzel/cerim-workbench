import { AttributeType } from '$lib/core';
import { derived, writable } from 'svelte/store';
import type { Item } from './Item';

export type ItemCollectionState = {
	search: string;
	attributes: Partial<Record<AttributeType, boolean>>;
	sort: Record<string, ItemPropSortState>;
};

export type ItemCollectionConfig<T> = {
	attributes?: boolean;
	sort?: Record<string, (item: T) => number>;
};

export type ItemCollectionSorter<T> = (item: T) => number;

enum ItemPropSortState {
	NONE = 0,
	ASC = 1,
	DESC = 2
}

type Sorter<T> = {
	prop: string;
	sort(items: T[], state: ItemPropSortState): void;
};

export function createItemCollection<T extends Item>(items: T[], config: ItemCollectionConfig<T> = {}) {
	const createSorter = (prop: string, getProp: (item: T) => number): Sorter<T> => {
		const sortAsc = (a: T, b: T): number => {
			const aProp = getProp(a);
			const bProp = getProp(b);

			return bProp - aProp;
		};

		const sortDesc = (a: T, b: T): number => {
			const aProp = getProp(a);
			const bProp = getProp(b);

			return aProp - bProp;
		};

		const sort = (items: T[], state: ItemPropSortState) => {
			switch (state) {
				case ItemPropSortState.ASC:
					return items.sort(sortAsc);
				case ItemPropSortState.DESC:
					return items.sort(sortDesc);
			}

			return items;
		};

		return {
			prop,
			sort
		};
	};

	const initialState: ItemCollectionState = {
		search: '',
		attributes: {},
		sort: {}
	};

	const sorters: Sorter<T>[] = [];

	if (config.sort) {
		for (const [prop, fn] of Object.entries(config.sort)) {
			const sorter = createSorter(prop, fn);
			sorters.push(sorter);

			initialState.sort[prop] = 0;
		}
	}

	const state = writable(initialState);

	const result = derived(state, (s) => {
		let r = [...items];

		if (s.search !== '') {
			r = r.filter((item) => item.name.toLowerCase().indexOf(s.search.toLocaleLowerCase()) !== -1);
		}

		for (const sorter of sorters) {
			sorter.sort(r, s.sort[sorter.prop]);
		}

		return r;
	});

	return {
		state,
		result
	};
}
