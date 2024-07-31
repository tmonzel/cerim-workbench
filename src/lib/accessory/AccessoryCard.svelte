<script lang="ts">
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { AccessoryItem } from './AccessoryItem';

	export let item: AccessoryItem;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type="Talisman">
		{item.name}
	</ItemHeader>
	<ModifierList data={item.modifiers} />
</ItemCard>
