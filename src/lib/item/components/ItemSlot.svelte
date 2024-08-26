<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { type CollectionFindResult, type CollectionPagination } from '$lib/core';

	type T = $$Generic<Item>;

	export let label: string;
	export let dialogTitle: string = '';
	export let selectedItem: T | null = null;
	export let result: CollectionFindResult<T>;
	export let pagination: CollectionPagination;

	let dialog: Dialog;

	$: totalItems = result.totalItems;
	$: itemsPerPage = pagination.itemsPerPage;
	$: pageItemsTotal = itemsPerPage * pagination.page;

	$: if (dialog && selectedItem) {
		dialog.close();
	}
</script>

<div class="relative group bg-zinc-700/10 rounded-lg transition-all shadow-md hover:bg-zinc-800/40 hover:shadow-xl">
	<div class="absolute left-5 top-5">
		<Badge>{label}</Badge>
	</div>

	{#if selectedItem}
		<div class="flex justify-between px-5 pt-5">
			<div></div>
			<div class="flex gap-2 invisible group-hover:visible">
				<Button icon="sync" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => dialog.open()} />
				<Button icon="clear" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => (selectedItem = null)} />
			</div>
			<div></div>
		</div>
		<div class="p-5">
			<slot {selectedItem} />
		</div>
	{:else}
		<button
			class="group w-full h-full flex justify-center items-center p-5 min-h-32 text-amber-300 font-semibold transition-all rounded-lg ring-amber-300 hover:bg-stone-800 hover:ring-2"
			on:click={() => dialog.open()}
		>
			<span class="mat-icon text-md me-1">sync</span> <span class="text-md"><slot {selectedItem} /></span>
		</button>
	{/if}
</div>

<Dialog bind:this={dialog} class="finder-dialog">
	<svelte:fragment slot="title">{dialogTitle}</svelte:fragment>

	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<slot name="utils" />
	</div>

	{#if totalItems > itemsPerPage}
		<div class="p-5 flex justify-between text-sm">
			<div class="text-zinc-500">
				{pageItemsTotal > totalItems ? totalItems : pageItemsTotal} / {totalItems}
			</div>
			<Pagination {totalItems} {itemsPerPage} bind:currentPage={pagination.page} />
		</div>
	{/if}

	{#if result.items.length === 0}
		<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
			<span class="mat-icon me-2">warning</span>Sorry, no items found
		</div>
	{/if}

	<ul class="grid 2xl:grid-cols-2 px-5 py-2 gap-10">
		{#each result.items as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => (selectedItem = item)}
					class:ring-2={selectedItem?.id === item.id}
					class:bg-stone-800={selectedItem?.id === item.id}
					class:ring-amber-300={selectedItem?.id === item.id}
				>
					<slot name="listItem" {item} />
				</button>
			</li>
		{/each}
	</ul>

	{#if totalItems > itemsPerPage}
		<div class="p-5 flex justify-between text-sm">
			<div class="text-zinc-500">
				{pageItemsTotal > totalItems ? totalItems : pageItemsTotal} / {totalItems}
			</div>
			<Pagination {totalItems} {itemsPerPage} bind:currentPage={pagination.page} />
		</div>
	{/if}
</Dialog>
