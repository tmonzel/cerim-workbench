<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import SortButton from '$lib/item/components/SortButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { AttackItem } from './AttackItem';
	import { weaponTypeInfo } from './weapon.type';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { createCollection } from '$lib/core';
	import WeaponCard from './WeaponCard.svelte';

	export let items: AttackItem[];
	export let selectedItem: AttackItem | null = null;

	type FilterSchema = {
		filters: { search: string; type: number | null };
	};

	const { result, sort, filters } = createCollection(
		items,
		{ filters: { search: '', type: null } },
		{
			filters: {
				search: (item: AttackItem, value: string) => {
					if (value === '') {
						return true;
					}

					return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				},
				type: (item: AttackItem, value: number | null) => (value ? item.type == value : true)
			},
			sort: {
				weight: (item: AttackItem) => item.weight,
				physicalAttack: (item: AttackItem) => item.attack.phy ?? 0,
				magicalAttack: (item: AttackItem) => item.attack.mag ?? 0,
				fireAttack: (item: AttackItem) => item.attack.fir ?? 0,
				lightningAttack: (item: AttackItem) => item.attack.lit ?? 0,
				holyAttack: (item: AttackItem) => item.attack.hol ?? 0
			}
		}
	);

	const typeOptions = [
		{ id: null, name: 'All Types' },
		...Object.entries(weaponTypeInfo).map(([id, info]) => ({ id, name: info.name }))
	];

	const dispatch = createEventDispatcher<{ selectItem: AttackItem | null }>();

	export function selectItem(item: AttackItem | null): void {
		selectedItem = item;
		dispatch('selectItem', item);
	}
</script>

<div>
	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<div class="flex gap-x-2 mb-4">
			<SelectControl options={typeOptions} bind:value={$filters.type} let:item>
				<svelte:fragment slot="selected" let:item>
					<div class="p-2">
						{item.name}
					</div>
				</svelte:fragment>

				{item.name}
			</SelectControl>
			<InputControl bind:value={$filters.search} placeholder="Search weapon by name..." />
		</div>

		<div class="flex gap-x-10">
			<div>
				<h6 class="font-semibold">Sorting</h6>
			</div>
			<div>
				<h6>Stats</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.weight}>Weight</SortButton>
				</div>
			</div>
			<div>
				<h6>Attack Type</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.physicalAttack}>Physical</SortButton>
					<SortButton bind:state={$sort.magicalAttack}>Magical</SortButton>
					<SortButton bind:state={$sort.fireAttack}>Fire</SortButton>
					<SortButton bind:state={$sort.lightningAttack}>Lightning</SortButton>
					<SortButton bind:state={$sort.holyAttack}>Holy</SortButton>
				</div>
			</div>
		</div>
	</div>
	{#if items.length === 0}
		<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
			<span class="mat-icon me-2">warning</span>Sorry, no items found
		</div>
	{/if}

	<ul class="grid grid-cols-2 px-5 py-2 gap-10">
		{#each $result as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => selectItem(item)}
					class:ring-2={selectedItem?.id === item.id}
					class:bg-stone-800={selectedItem?.id === item.id}
					class:ring-amber-300={selectedItem?.id === item.id}
				>
					<WeaponCard {item} />
				</button>
			</li>
		{/each}
	</ul>
</div>
