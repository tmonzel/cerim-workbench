<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import AccessoryFinder from './AccessoryFinder.svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import AccessoryCard from './AccessoryCard.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import { getIconUrl } from '$lib/helpers';

	export let label: string;
	export let selectedItem: AccessoryItem | null = null;
	export let items: AccessoryItem[] = [];
	export let displayMode: 'icon' | 'detail' = 'detail';

	let dialog: Dialog;

	export function selectItem(item: AccessoryItem | null): void {
		selectedItem = item;
		dialog.close();
	}

	export function activate(item: AccessoryItem | null): void {
		selectedItem = item;
		dialog.close();
	}
</script>

<div class="relative">
	<div class="flex justify-between rounded-t-lg">
		{#if selectedItem && selectedItem.possibleUpgrades > 0}
			<div class="mb-2">
				<ItemUpgradeBar bind:item={selectedItem} />
			</div>
		{/if}
		{#if selectedItem}
			<div class="rounded-t p-2">
				<CheckboxControl bind:checked={selectedItem.activated}>Activated</CheckboxControl>
			</div>
		{/if}
	</div>

	<EquipSlot on:click={() => dialog.open()} {label} bind:selectedItem let:item>
		{#if item}
			{#if displayMode === 'detail'}
				<AccessoryCard {item} slotted />
			{:else if item.iconId}
				<img
					src={getIconUrl(item.iconId)}
					alt={item.name}
					class="max-w-40 object-cover transition-all group-hover:brightness-150"
					class:opacity-50={!item.activated}
				/>
			{/if}
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<AccessoryFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
