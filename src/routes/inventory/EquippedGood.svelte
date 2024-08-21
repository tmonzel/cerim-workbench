<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getIconUrl } from '$lib/helpers';
	import type { InventoryItem } from '$lib/inventory';
	import { goodTypeInfo } from '$lib/inventory/good.type';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { createEventDispatcher } from 'svelte';

	export let item: InventoryItem;

	const dispatch = createEventDispatcher();

	function updateItem(item: InventoryItem): void {
		item = item;
		dispatch('update', item);
	}
</script>

<article class="px-5 pb-5 flex gap-x-4">
	<div class="px-5">
		<img src={getIconUrl(item.iconId)} alt={item.name} class="object-cover transition-all group-hover:brightness-150" />
	</div>

	<div class="grow">
		<ItemHeader rarity={item.rarity} type={goodTypeInfo[item.type].name}>
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

		<ul>
			{#each item.effects as effect}
				<li class="flex gap-x-5">
					<div class="grow">
						<ItemEffectBadge {effect} />
					</div>
					<div class="pt-2">
						<CheckboxControl bind:checked={effect.activated} on:checked={() => (item ? updateItem(item) : null)}></CheckboxControl>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</article>
