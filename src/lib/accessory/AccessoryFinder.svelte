<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import { createCollection } from '$lib/core';
	import AccessoryCard from './AccessoryCard.svelte';

	export let items: AccessoryItem[];
	export let selectedItem: AccessoryItem | null = null;

	const { result, sort, filters } = createCollection(
		items,
		{ filters: { search: '' } },
		{
			filters: {
				search: (item: AccessoryItem, value: string) => {
					if (value === '') {
						return true;
					}

					return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				}
			},
			sort: {
				weight: (item: AccessoryItem) => item.weight
			}
		}
	);
	const dispatch = createEventDispatcher<{ selectItem: AccessoryItem | null }>();

	export function selectItem(item: AccessoryItem | null): void {
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
	{#if $result.length === 0}
		<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center m-5">
			<span class="mat-icon me-2">warning</span>No items found for this criteria
		</div>
	{/if}

	<ul class="grid grid-cols-3 px-5 py-2 gap-10">
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
					<AccessoryCard {item} />
				</button>
			</li>
		{/each}
	</ul>
</div>
