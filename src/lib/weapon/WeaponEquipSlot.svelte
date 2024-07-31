<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import WeaponAffinitySelect from '$lib/weapon/WeaponAffinitySelect.svelte';
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { AttackItem } from './AttackItem';
	import WeaponFinder from './WeaponFinder.svelte';
	import WeaponCard from './WeaponCard.svelte';

	export let label: string;
	export let selectedItem: AttackItem | null = null;
	export let items: AttackItem[] = [];

	let dialog: Dialog;

	export function selectItem(item: AttackItem | null): void {
		selectedItem = item;
		dialog.close();
	}
</script>

<div class="relative">
	<div class="flex gap-2 mb-2">
		{#if selectedItem && selectedItem.affinities.size > 0}
			<WeaponAffinitySelect bind:item={selectedItem} />
		{/if}

		{#if selectedItem && selectedItem.possibleUpgrades > 0}
			<ItemUpgradeBar bind:item={selectedItem} />
		{/if}
	</div>
	<EquipSlot on:click={() => dialog.open()} {label} bind:selectedItem let:item>
		{#if item}
			<WeaponCard {item} slotted />
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<WeaponFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
