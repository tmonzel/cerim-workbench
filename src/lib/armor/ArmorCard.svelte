<script lang="ts">
	import DamageNegationGrid from '$lib/components/DamageNegationGrid.svelte';
	import ResistanceGrid from '$lib/components/ResistanceGrid.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
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

	<ul>
		{#each item.effects as effect}
			<li>
				<ItemEffectBadge {effect} />
			</li>
		{/each}
	</ul>

	<dl class="divide-y divide-gray-100/20">
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
