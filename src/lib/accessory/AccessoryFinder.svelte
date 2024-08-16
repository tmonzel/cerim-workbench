<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import { createCollection } from '$lib/core';
	import AccessoryCard from './AccessoryCard.svelte';
	import ItemList from '$lib/item/components/ItemList.svelte';

	export let items: AccessoryItem[];
	export let selectedItem: AccessoryItem | undefined = undefined;

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

<div class="relative">
	<div class="sticky top-0 z-30 p-5 bg-zinc-800">
		<div class="mb-4">
			<InputControl bind:value={$filters.search} placeholder="Find talismans..." class="text-xl" />
		</div>
	</div>

	<ItemList
		items={$result.items}
		itemsPerPage={$pagination.itemsPerPage}
		bind:currentPage={$pagination.page}
		totalItems={$result.totalItems}
		bind:selectedItem
		let:item
	>
		<AccessoryCard {item} />
	</ItemList>
</div>
