<script lang="ts">
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { AccessoryItem } from './AccessoryItem';

	export let item: AccessoryItem;
	export let slotted: boolean = false;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} weight={item.weight} type="Talisman">
		{item.name}
		{#if slotted && item.tier > 0}
			(+{item.tier})
		{:else if !slotted && item.possibleUpgrades > 0}
			(1/{item.possibleUpgrades + 1})
		{/if}
	</ItemHeader>

	{#if item.effectInfo}
		<p class="text-sm text-zinc-500 italic mb-2">{item.effectInfo}</p>
	{/if}

	<ModifierList data={item.modifiers} />
</ItemCard>
