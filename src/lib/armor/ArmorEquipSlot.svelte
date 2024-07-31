<script lang="ts">
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { ProtectItem } from './ProtectItem';
	import ArmorFinder from './ArmorFinder.svelte';
	import ArmorInfo from './ArmorInfo.svelte';
	import ResistanceGrid from '$lib/components/ResistanceGrid.svelte';
	import DamageNegationGrid from '$lib/components/DamageNegationGrid.svelte';

	export let label: string;
	export let selectedItem: ProtectItem | null = null;
	export let items: ProtectItem[] = [];

	let dialog: Dialog;

	export function selectItem(item: ProtectItem | null): void {
		selectedItem = item;
		dialog.close();
	}
</script>

<div class="relative">
	<EquipSlot on:click={() => dialog.open()} {label} bind:selectedItem let:item>
		{#if item}
			<ItemCard {item}>
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
						<dt class="text-sm font-medium mb-2">Damage Negation (⌀ {item.damageNegationAvg})</dt>
						<dd><DamageNegationGrid data={item.damageNegation} /></dd>
					</div>
				</dl>
			</ItemCard>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<ArmorFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
