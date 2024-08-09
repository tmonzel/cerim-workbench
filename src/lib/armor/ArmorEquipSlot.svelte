<script lang="ts">
	import EquipSlot from '$lib/hero/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { ProtectItem } from './ProtectItem';
	import ArmorFinder from './ArmorFinder.svelte';
	import ArmorCard from './ArmorCard.svelte';
	import Button from '$lib/components/Button.svelte';

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
	{#if selectedItem}
		<div class="absolute top-3 right-3 flex items-center gap-x-5">
			<div>
				<Button icon="clear" on:click={() => (selectedItem = null)} class="text-xl text-zinc-500 bg-zinc-700/30" />
			</div>
		</div>
	{/if}
	<EquipSlot on:click={() => dialog.open()} {label} bind:selectedItem let:item>
		{#if item}
			<ArmorCard {item} />
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<ArmorFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
