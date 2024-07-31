import { derived, writable } from 'svelte/store';

export type CollectionFilter<T, V = never> = (item: T, value: V) => boolean;
export type CollectionSorter<T> = (item: T) => number;

export type CollectionConfig<T> = {
	filters?: Record<string, CollectionFilter<T>>;
	sort?: Record<string, CollectionSorter<T>>;
};

enum SortState {
	NONE = 0,
	ASC = 1,
	DESC = 2
}

export type CollectionState = {
	filters: Record<string, any>;
	sort: Record<string, SortState>;
};

type Sorter<T> = {
	prop: string;
	sort(items: T[], state: SortState): void;
};

const createSorter = <T>(prop: string, getProp: (item: T) => number): Sorter<T> => {
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

	const sort = (items: T[], state: SortState) => {
		switch (state) {
			case SortState.ASC:
				return items.sort(sortAsc);
			case SortState.DESC:
				return items.sort(sortDesc);
		}

		return items;
	};

	return {
		prop,
		sort
	};
};

export function createCollection<T>(items: T[], defaults: Partial<CollectionState>, config: CollectionConfig<T> = {}) {
	const sortState: Record<string, SortState> = defaults.sort ?? {};
	const filtersState: Record<string, any> = defaults.filters ?? {};

	const sorters: Sorter<T>[] = [];

	if (config.sort) {
		for (const [prop, fn] of Object.entries(config.sort)) {
			const sorter = createSorter<T>(prop, fn);
			sorters.push(sorter);

			if (sortState[prop] === undefined) {
				sortState[prop] = 0;
			}
		}
	}

	const sort = writable(sortState);
	const filters = writable(filtersState);

	const result = derived([sort, filters], ([s, f]) => {
		let r = [...items];

		if (config.filters) {
			for (const [prop, filter] of Object.entries(config.filters)) {
				r = r.filter((item) => filter(item, f[prop]));
			}
		}

		for (const sorter of sorters) {
			sorter.sort(r, s[sorter.prop]);
		}

		return r;
	});

	return {
		sort,
		filters,
		result
	};
}
