<script lang="ts">
	import ItemSlot from '$lib/item/components/ItemSlot.svelte';
	import { createCollection } from '$lib';
	import InputControl from '$lib/components/InputControl.svelte';
	import AccessoryCard from './AccessoryCard.svelte';
	import type { AccessoryItem } from '$lib/item';

	export let label: string;
	export let item: AccessoryItem | null = null;
	export let items: AccessoryItem[] = [];

	const { result, filters, pagination } = createCollection(
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
</script>

<ItemSlot {label} dialogTitle="Choose Accessory" bind:selectedItem={item} result={$result} bind:pagination={$pagination} let:selectedItem>
	{#if selectedItem}
		<AccessoryCard selected item={selectedItem} on:update={(e) => (item = e.detail)} />
	{:else}
		Accessory Slot
	{/if}

	<svelte:fragment slot="options"></svelte:fragment>

	<svelte:fragment slot="utils">
		<InputControl bind:value={$filters.search} placeholder="Find talismans..." class="text-xl" />
	</svelte:fragment>

	<svelte:fragment slot="listItem" let:item>
		<AccessoryCard {item} />
	</svelte:fragment>
</ItemSlot>
