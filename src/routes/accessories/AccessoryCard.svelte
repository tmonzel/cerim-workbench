<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ItemEffectList from '$lib/item/components/ItemEffectList.svelte';
	import type { AccessoryItem } from '$lib/item';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';

	export let item: AccessoryItem;
	export let selected: boolean = false;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type="Talisman">
		{item.name}
		{#if !selected && item.possibleUpgrades > 0}
			+(1-{item.possibleUpgrades + 1})
		{/if}

		<svelte:fragment slot="options">
			<div class="flex justify-center gap-2">
				{#if selected && item.possibleUpgrades > 0}
					<ItemUpgradeBar {item} on:update />
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

	<ItemEffectList editable={selected} {item} on:update />
</ItemCard>
