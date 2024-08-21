<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { getIconUrl } from '$lib/helpers';
	import type { InventoryItem } from '$lib/inventory';
	import { goodTypeInfo } from '$lib/inventory/good.type';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';

	export let item: InventoryItem;
</script>

<article class="max-w-sm w-full lg:max-w-full lg:flex">
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
				<li>
					<ItemEffectBadge {effect} />
				</li>
			{/each}
		</ul>
	</div>
</article>
