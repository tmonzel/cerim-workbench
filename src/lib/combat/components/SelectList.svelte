<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import type { Item } from '../../item/Item';
	import ItemListCard from './ItemListCard.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { itemGroupRecord } from '$lib/records';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';

	export let items: Item[];
	export let selectedItemId: string | null = null;

	let groupSelectItems: { id: string; name: string }[] = [];

	type FilterState = {
		search: string;
		scaling: Record<string, boolean>;
	};

	const selectedGroup = writable<string | null>(null);
	const filters = writable<FilterState>({
		search: '',
		scaling: {
			str: false,
			dex: false,
			int: false,
			fth: false,
			arc: false
		}
	});

	let availableGroups: string[] = [];

	$: {
		availableGroups = [];
		let selectedItem = null;

		for (const item of items) {
			if (item.id === selectedItemId) {
				selectedItem = item;
			}

			if (availableGroups.includes(item.group)) {
				continue;
			}

			availableGroups.push(item.group);
		}

		groupSelectItems = availableGroups.map((t) => ({ name: itemGroupRecord[t].name, id: t }));

		if (selectedItem) {
			selectedGroup.set(selectedItem.group);
		} else {
			selectedGroup.set(availableGroups[0]);
		}
	}

	const groupedItems = derived(selectedGroup, (group) => {
		return items.filter((item) => item.group === group);
	});

	const filteredItems = derived([groupedItems, filters], ([items, f]) => {
		return items.filter((item) => {
			const isSearch = f.search !== '' ? item.name.toLowerCase().indexOf(f.search.toLocaleLowerCase()) !== -1 : true;

			let isStrScaling = true;
			let isDexScaling = true;
			let isIntScaling = true;
			let isFaithScaling = true;
			let isArcaneScaling = true;

			if (item.config && item.config.scaling) {
				if (f.scaling.str && item.config.scaling.str === undefined) {
					isStrScaling = false;
				}

				if (f.scaling.dex && item.config.scaling.dex === undefined) {
					isDexScaling = false;
				}

				if (f.scaling.int && item.config.scaling.int === undefined) {
					isIntScaling = false;
				}

				if (f.scaling.fth && item.config.scaling.fth === undefined) {
					isFaithScaling = false;
				}

				if (f.scaling.arc && item.config.scaling.arc === undefined) {
					isArcaneScaling = false;
				}
			}

			return isSearch && isStrScaling && isDexScaling && isIntScaling && isFaithScaling && isArcaneScaling;
		});
	});

	const dispatch = createEventDispatcher<{ selectItem: Item | null }>();

	export function selectItem(item: Item | null): void {
		selectedItemId = item ? item.id : null;
		dispatch('selectItem', item);
	}
</script>

<div class="sticky top-0 px-5 py-3 item-list-header z-50 bg-neutral-800">
	<div class="flex gap-x-3">
		<div>
			<SelectControl options={groupSelectItems} bind:value={$selectedGroup} let:item>
				<svelte:fragment slot="selected" let:item>
					{#if item}
						<div class="p-0.5">
							{item.name}
						</div>
					{/if}
				</svelte:fragment>

				<span>{item.name}</span>
			</SelectControl>
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<div class="grow">
			<input
				type="text"
				class="bg-neutral-700/40 w-full py-1 shadow-md border-0 text-md text-zinc-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
				placeholder="Search {$selectedGroup}..."
				bind:value={$filters.search}
				autofocus
			/>
		</div>
	</div>
	<div class="pt-2">
		<div class="text-sm my-2 text-zinc-300">Attribute Scaling</div>
		<div class="flex gap-5">
			<CheckboxControl bind:checked={$filters.scaling.str}>Strength</CheckboxControl>
			<CheckboxControl bind:checked={$filters.scaling.dex}>Dexterity</CheckboxControl>
			<CheckboxControl bind:checked={$filters.scaling.int}>Intelligence</CheckboxControl>
			<CheckboxControl bind:checked={$filters.scaling.fth}>Faith</CheckboxControl>
			<CheckboxControl bind:checked={$filters.scaling.arc}>Arcane</CheckboxControl>
		</div>
	</div>
</div>

<div class="flex justify-end px-4 pt-2">
	{$filteredItems.length} / {$groupedItems.length}
</div>

{#if $filteredItems.length === 0}
	<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
		<span class="mat-icon me-2">warning</span>Sorry, no items found
	</div>
{/if}
<ul class="grid grid-cols-2 px-5 py-2">
	{#each $filteredItems as item}
		<li>
			<button
				type="button"
				class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
				on:click={() => selectItem(item)}
				class:ring-2={selectedItemId === item.id}
				class:bg-stone-800={selectedItemId === item.id}
				class:ring-amber-300={selectedItemId === item.id}
			>
				<ItemListCard {item} />
			</button>
		</li>
	{/each}
</ul>
