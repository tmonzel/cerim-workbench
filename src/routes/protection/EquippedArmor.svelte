<script lang="ts">
	import { armorTypeInfo, type ProtectItem } from '$lib/armor';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import DamageNegationGrid from '$lib/components/DamageNegationGrid.svelte';
	import ResistanceGrid from '$lib/components/ResistanceGrid.svelte';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { createEventDispatcher } from 'svelte';
	import ArmorInfo from './ArmorInfo.svelte';

	export let item: ProtectItem;

	const dispatch = createEventDispatcher();

	function updateItem(item: ProtectItem) {
		item = item;
		dispatch('update', item);
	}
</script>

<div class="px-5 pb-5 flex gap-x-4">
	<ItemChangeButton {item} />

	<div class="grow">
		<ItemHeader rarity={item.rarity} type={armorTypeInfo[item.type] ? armorTypeInfo[item.type].name : '-'}>
			{item.name}
		</ItemHeader>

		<ArmorInfo {item} />

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
	</div>
</div>
