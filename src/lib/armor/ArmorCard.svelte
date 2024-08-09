<script lang="ts">
	import DamageNegationGrid from '$lib/components/DamageNegationGrid.svelte';
	import ResistanceGrid from '$lib/components/ResistanceGrid.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import { armorTypeInfo } from './armor.type';
	import ArmorInfo from './ArmorInfo.svelte';
	import type { ProtectItem } from './ProtectItem';

	export let item: ProtectItem;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={armorTypeInfo[item.type] ? armorTypeInfo[item.type].name : '-'}>
		{item.name}
	</ItemHeader>

	<ArmorInfo {item} />

	<dl class="divide-y divide-gray-100/20">
		{#if item.modifiers.length > 0}
			<ModifierList data={item.modifiers} />
		{/if}

		<div class="px-4 py-4 sm:px-0">
			<dt class="text-sm font-medium mb-2">Resistance (⌀ {item.resistanceAvg})</dt>
			<dd><ResistanceGrid data={item.resistance} /></dd>
		</div>

		<div class="px-4 py-4 sm:px-0">
			<dt class="text-sm font-medium mb-2">Absorption (⌀ {item.damageNegationAvg})</dt>
			<dd><DamageNegationGrid data={item.damageNegation} /></dd>
		</div>
	</dl>
</ItemCard>
