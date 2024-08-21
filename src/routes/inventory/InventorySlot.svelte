<script lang="ts">
	import { createCollection } from '$lib';
	import type { InventoryItem } from '$lib/inventory';
	import ItemSlot from '$lib/item/components/ItemSlot.svelte';
	import EquippedGood from './EquippedGood.svelte';
	import GoodCard from './GoodCard.svelte';

	export let label: string;
	export let item: InventoryItem | null = null;
	export let items: InventoryItem[] = [];

	const { result, pagination } = createCollection(items, {});
</script>

<ItemSlot {label} bind:selectedItem={item} result={$result} bind:pagination={$pagination} let:selectedItem>
	{#if selectedItem}
		<EquippedGood item={selectedItem} on:update={(e) => (item = e.detail)} />
	{:else}
		Select Item
	{/if}

	<svelte:fragment slot="listItem" let:item>
		<GoodCard {item} />
	</svelte:fragment>
</ItemSlot>
