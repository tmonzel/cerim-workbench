<script lang="ts">
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { ProtectItem } from './ProtectItem';
	import ArmorFinder from './ArmorFinder.svelte';

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
				<ModifierList data={item.modifiers} />
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
