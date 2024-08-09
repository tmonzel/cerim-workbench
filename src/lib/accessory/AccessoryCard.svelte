<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { AccessoryItem } from './AccessoryItem';

	export let item: AccessoryItem;
	export let slotted: boolean = false;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type="Talisman">
		{item.name}
		{#if slotted && item.tier > 0}
			(+{item.tier})
		{:else if !slotted && item.possibleUpgrades > 0}
			(1/{item.possibleUpgrades + 1})
		{/if}
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

	<ModifierList data={item.modifiers} />
</ItemCard>
