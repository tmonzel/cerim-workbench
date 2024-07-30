<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import WeaponAffinitySelect from '$lib/weapon/WeaponAffinitySelect.svelte';
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { AttackItem } from './AttackItem';
	import WeaponFinder from './WeaponFinder.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import GuardGrid from '$lib/components/GuardGrid.svelte';
	import WeaponInfo from './WeaponInfo.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';

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
			<ItemCard {item}>
				<div class="mb-3 text-2xl">
					<AttackBadge attack={item.attack} />
				</div>

				<div class="mb-3">
					<AttackDetail attack={item.attack} />
				</div>

				<div class="mb-3">
					<WeaponInfo {item} />
				</div>

				<ModifierList data={item.modifiers} />

				<div class="px-4 py-4 sm:px-0">
					<dt class="text-sm font-medium mb-2">Damage Negation</dt>
					<dd><GuardGrid data={item.guard} /></dd>
				</div>
			</ItemCard>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<WeaponFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
