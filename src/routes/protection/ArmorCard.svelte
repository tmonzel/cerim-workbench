<script lang="ts">
	import ResistanceGrid from './ResistanceGrid.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { createEventDispatcher } from 'svelte';
	import { armorTypeInfo, type Item, type ProtectItem } from '$lib/item';
	import Icon from '$lib/components/Icon.svelte';
	import DamageNegationGrid from './DamageNegationGrid.svelte';
	import EffectList from '$lib/effect/EffectList.svelte';

	export let item: ProtectItem;
	export let editable: boolean = false;

	const dispatch = createEventDispatcher();

	function updateItem(item: Item) {
		item = item;
		dispatch('update', item);
	}
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={armorTypeInfo[item.type] ? armorTypeInfo[item.type].name : '-'}>
		{item.name}
	</ItemHeader>

	<div class="flex items-center gap-x-12 mt-3 mb-2 text-2xl font-light">
		{#if item.weightClass}
			<!--<p class="flex items-center gap-x-1">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd"
					><path
						d="M80-80q0-111 29.5-189.5T185-400q46-52 103-80.5T400-520v-120q-137-17-228.5-84.5T80-880h800q0 88-91.5 155.5T560-640v120q55 11 112 39.5T775-400q46 52 75.5 130.5T880-80H640v-80h155q-18-152-113.5-220T480-448q-106 0-201.5 68T165-160h155v80H80Zm400-635q91 0 162-24.5T755-800H205q42 36 113 60.5T480-715Zm0 635q-33 0-56.5-23.5T400-160q0-17 6.5-31t17.5-25q24-24 81-50.5T640-320q-28 78-54 135t-50 81q-11 11-25 17.5T480-80Zm0-635Z"
					/></svg
				>
				{#if item.weightClass === ArmorWeightClass.LIGHT}
					Light
				{:else if item.weightClass === ArmorWeightClass.MEDIUM}
					Medium
				{:else if item.weightClass === ArmorWeightClass.HEAVY}
					Heavy
				{/if}
			</p>-->
		{/if}

		{#if item.weight > 0}
			<div class="flex items-center gap-x-1">
				<Icon name="weight" />{item.weight}
			</div>
		{/if}

		<p class="flex items-center gap-x-1">
			<Icon name="guardian" />{item.poise}
		</p>
	</div>

	<EffectList effects={item.effects} {editable} on:checked={() => updateItem(item)} />

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
