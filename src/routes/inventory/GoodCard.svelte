<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { goodTypeInfo } from '$lib/item/maps';
	import type { InventoryItem } from '$lib/item';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ItemEffectList from '$lib/item/components/ItemEffectList.svelte';

	export let item: InventoryItem;
	export let editable: boolean = false;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={goodTypeInfo[item.type] ? goodTypeInfo[item.type].name : '-'}>
		{item.name}
	</ItemHeader>

	{#if item.weight > 0}
		<div class="mb-5 text-2xl font-light">
			<div class="flex items-center gap-x-1">
				<Icon name="weight" />{item.weight}
			</div>
		</div>
	{/if}

	{#if item.effectInfo}
		<p class="text-sm text-zinc-500 italic mb-2">{item.effectInfo}</p>
	{/if}

	<ItemEffectList {item} {editable} on:update />
</ItemCard>
