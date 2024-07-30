<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import AccessoryFinder from './AccessoryFinder.svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';

	export let label: string;
	export let selectedItem: AccessoryItem | null = null;
	export let items: AccessoryItem[] = [];

	let dialog: Dialog;

	export function selectItem(item: AccessoryItem | null): void {
		selectedItem = item;
		dialog.close();
	}
</script>

<div class="relative">
	{#if selectedItem && selectedItem.possibleUpgrades > 0}
		<div class="mb-2">
			<ItemUpgradeBar bind:item={selectedItem} />
		</div>
	{/if}

	<EquipSlot on:click={() => dialog.open()} {label} bind:selectedItem let:item>
		{#if item}
			<ItemCard {item}>
				<ModifierList data={item.modifiers} />
			</ItemCard>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<AccessoryFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
