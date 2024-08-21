<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { type CollectionFindResult, type CollectionPagination } from '$lib/core';
	import ItemList from './ItemList.svelte';

	type T = $$Generic<Item>;

	export let label: string;
	export let selectedItem: T | null = null;
	export let result: CollectionFindResult<T>;
	export let pagination: CollectionPagination;

	let dialog: Dialog;

	$: if (dialog && selectedItem) {
		dialog.close();
	}
</script>

<div class="relative group bg-zinc-700/10 rounded-lg transition-all shadow-md hover:bg-zinc-800/40 hover:shadow-xl">
	<div class="absolute left-5 top-5">
		<Badge>{label}</Badge>
	</div>

	{#if selectedItem}
		<div class="flex justify-between p-5">
			<div></div>
			<div class="flex gap-2 invisible group-hover:visible">
				<Button icon="sync" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => dialog.open()} />
				<Button icon="clear" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => (selectedItem = null)} />
			</div>
			<div></div>
		</div>
		<slot {selectedItem} />
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
	<svelte:fragment slot="title">Choose a Weapon</svelte:fragment>

	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<slot name="utils" />
	</div>

	<ItemList
		items={result.items}
		itemsPerPage={pagination.itemsPerPage}
		totalItems={result.totalItems}
		bind:currentPage={pagination.page}
		bind:selectedItem
		let:item
	>
		<slot name="listItem" {item} />
	</ItemList>
</Dialog>
