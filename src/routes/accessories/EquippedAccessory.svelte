<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ItemImage from '$lib/item/components/ItemImage.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { AccessoryItem } from '$lib/item';

	export let item: AccessoryItem;

	const dispatch = createEventDispatcher();

	function updateItem(item: AccessoryItem) {
		item = item;
		dispatch('update', item);
	}
</script>

<div class="flex gap-x-4 px-5 pb-5">
	<ItemImage {item} />

	<div class="grow">
		<ItemHeader rarity={item.rarity} type="Talisman">
			{item.name}{#if item.tier > 0}(+{item.tier}){/if}

			<svelte:fragment slot="options">
				<div class="flex justify-center gap-2">
					{#if item.possibleUpgrades > 0}
						<ItemUpgradeBar {item} on:update={(e) => updateItem(e.detail)} />
					{/if}
				</div>
			</svelte:fragment>
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
						<CheckboxControl bind:checked={effect.activated} on:checked={() => updateItem(item)}></CheckboxControl>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
