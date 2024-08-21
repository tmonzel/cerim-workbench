import { derived, writable, type Readable, type Writable } from 'svelte/store';

export type CollectionFilter<T, V = never> = (item: T, value: V) => boolean;
export type CollectionSorter<T> = (item: T) => number;

export type CollectionConfig<T> = {
	filters?: Record<string, CollectionFilter<T>>;
	sort?: Record<string, CollectionSorter<T>>;
};

export enum SortState {
	NONE = 0,
	ASC = 1,
	DESC = 2
}

export type CollectionFindResult<T> = {
	totalItems: number;
	items: T[];
};

export type CollectionPagination = {
	itemsPerPage: number;
	page: number;
};

export type Collection<T, F = Record<string, unknown>> = {
	sort: Writable<Record<string, SortState>>;
	filters: Writable<F>;
	pagination: Writable<CollectionPagination>;
	result: Readable<CollectionFindResult<T>>;
};

export type CollectionState<FSchema> = {
	filters: FSchema;
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

export function createCollection<T, F = Record<string, unknown>>(
	items: T[],
	defaults: Partial<CollectionState<F>>,
	config: CollectionConfig<T> = {}
): Collection<T, F> {
	const sortState: Record<string, SortState> = defaults.sort ?? {};
	const filtersState: F = defaults.filters ?? ({} as F);

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

	let filteredItems = [...items];
	const pagination = writable({
		itemsPerPage: 50,
		page: 1
	});

	const sort = writable(sortState);
	const { set, update, subscribe } = writable<F>(filtersState);

	function setFilter(state: F): void {
		let r = [...items];

		if (config.filters) {
			for (const [prop, filter] of Object.entries(config.filters)) {
				r = r.filter((item) => filter(item, state[prop]));
			}
		}

		filteredItems = r;
		pagination.update((p) => ({ ...p, page: 1 }));
		set(state);
	}

	const result = derived([sort, pagination], ([s, p]) => {
		const r = filteredItems;
		const page = p.page;

		/*if (config.filters) {
			for (const [prop, filter] of Object.entries(config.filters)) {
				r = r.filter((item) => filter(item, f[prop]));
			}
		}*/

		for (const sorter of sorters) {
			sorter.sort(r, s[sorter.prop]);
		}

		const startIndex = (page - 1) * p.itemsPerPage;

		return {
			totalItems: r.length,
			items: r.slice(startIndex, startIndex + p.itemsPerPage)
		};
	});

	return {
		sort,
		filters: { set: setFilter, update, subscribe },
		pagination,
		result
	};
}
