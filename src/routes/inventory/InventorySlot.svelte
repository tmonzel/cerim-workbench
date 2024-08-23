<script lang="ts">
	import { createCollection } from '$lib';
	import type { InventoryItem } from '$lib/item';
	import ItemSlot from '$lib/item/components/ItemSlot.svelte';
	import GoodCard from './GoodCard.svelte';

	export let label: string;
	export let item: InventoryItem | null = null;
	export let items: InventoryItem[] = [];

	const { result, pagination } = createCollection(items, {});
</script>

<ItemSlot {label} dialogTitle="Choose Inventory Item" bind:selectedItem={item} result={$result} bind:pagination={$pagination} let:selectedItem>
	{#if selectedItem}
		<GoodCard editable item={selectedItem} on:update={(e) => (item = e.detail)} />
	{:else}
		Select Item
	{/if}

	<svelte:fragment slot="listItem" let:item>
		<GoodCard {item} />
	</svelte:fragment>
</ItemSlot>
