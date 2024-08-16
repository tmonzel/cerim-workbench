<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import type { Item } from '../Item';

	type T = $$Generic<Item>;

	export let items: T[];
	export let selectedItem: T | undefined = undefined;
	export let itemsPerPage: number = 100;
	export let totalItems: number = 0;
	export let currentPage: number = 1;

	$: pageItemsTotal = itemsPerPage * currentPage;
</script>

{#if totalItems > itemsPerPage}
	<div class="p-5 flex justify-between text-sm">
		<div class="text-zinc-500">
			{pageItemsTotal > totalItems ? totalItems : pageItemsTotal} / {totalItems}
		</div>
		<Pagination {totalItems} {itemsPerPage} bind:currentPage />
	</div>
{/if}

{#if items.length === 0}
	<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
		<span class="mat-icon me-2">warning</span>Sorry, no items found
	</div>
{/if}

<ul class="grid 2xl:grid-cols-2 px-5 py-2 gap-10">
	{#each items as item}
		<li>
			<button
				type="button"
				class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
				on:click={() => (selectedItem = item)}
				class:ring-2={selectedItem?.id === item.id}
				class:bg-stone-800={selectedItem?.id === item.id}
				class:ring-amber-300={selectedItem?.id === item.id}
			>
				<slot {item} />
			</button>
		</li>
	{/each}
</ul>

{#if totalItems > itemsPerPage}
	<div class="p-5 flex justify-between text-sm">
		<div class="text-zinc-500">
			{pageItemsTotal > totalItems ? totalItems : pageItemsTotal} / {totalItems}
		</div>
		<Pagination {totalItems} {itemsPerPage} bind:currentPage />
	</div>
{/if}
