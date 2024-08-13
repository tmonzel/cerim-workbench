<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import { createEventDispatcher } from 'svelte';
	import { createCollection } from '$lib/core';
	import Pagination from '$lib/components/Pagination.svelte';
	import type { InventoryItem } from './InventoryItem';
	import GoodCard from './GoodCard.svelte';

	export let items: InventoryItem[];
	export let selectedItem: InventoryItem | null = null;

	const { result, filters, pagination } = createCollection(
		items,
		{ filters: { search: '' } },
		{
			filters: {
				search: (item: InventoryItem, value: string) => {
					if (value === '') {
						return true;
					}

					return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				}
			},
			sort: {
				weight: (item: InventoryItem) => item.weight
			}
		}
	);
	const dispatch = createEventDispatcher<{ selectItem: InventoryItem | null }>();

	export function selectItem(item: InventoryItem | null): void {
		selectedItem = item;
		dispatch('selectItem', item);
	}
</script>

<div class="relative">
	<div class="sticky top-0 z-30 p-5 bg-zinc-800">
		<div class="mb-4">
			<InputControl bind:value={$filters.search} placeholder="Find talismans..." class="text-xl" />
		</div>
	</div>

	{#if $result.totalItems > $pagination.itemsPerPage}
		<div class="p-5 flex justify-end text-sm">
			<Pagination
				totalItems={$result.totalItems}
				itemsPerPage={$pagination.itemsPerPage}
				bind:currentPage={$pagination.page}
			/>
		</div>
	{/if}

	{#if $result.items.length === 0}
		<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center m-5">
			<span class="mat-icon me-2">warning</span>No items found for this criteria
		</div>
	{/if}

	<ul class="grid grid-cols-3 px-5 py-2 gap-10">
		{#each $result.items as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => selectItem(item)}
					class:ring-2={selectedItem?.id === item.id}
					class:bg-stone-800={selectedItem?.id === item.id}
					class:ring-amber-300={selectedItem?.id === item.id}
				>
					<GoodCard {item} />
				</button>
			</li>
		{/each}
	</ul>
</div>
