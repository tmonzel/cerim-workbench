<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import { createCollection } from '$lib/core';

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

<div>
	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<div class="mb-4">
			<InputControl bind:value={$filters.search} placeholder="Search weapon by name..." />
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
					<ItemCard {item}>
						<ModifierList data={item.modifiers} />
					</ItemCard>
				</button>
			</li>
		{/each}
	</ul>
</div>
