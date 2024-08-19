<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import type { AttackItem } from './AttackItem';
	import WeaponFinder from './WeaponFinder.svelte';
	import EquippedWeaponCard from './EquippedWeaponCard.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';

	export let label: string;
	export let selectedItem: AttackItem | null = null;
	export let items: AttackItem[] = [];

	let dialog: Dialog;

	$: if (dialog && selectedItem) {
		dialog.close();
	}
</script>

{#if selectedItem}
	<div class="relative group bg-zinc-700/10 rounded-lg transition-all p-5 shadow-md hover:bg-zinc-800/40 hover:shadow-xl">
		<div class="flex justify-between">
			<div>
				<Badge>{label}</Badge>
			</div>
			<div>
				{#if selectedItem.possibleUpgrades > 0}
					<ItemUpgradeBar bind:item={selectedItem} />
				{/if}
			</div>
			<div class="flex gap-2 invisible group-hover:visible">
				<Button icon="sync" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => dialog.open()} />
				<Button icon="clear" class="text-2xl text-zinc-500 bg-zinc-700/30" on:click={() => (selectedItem = null)} />
			</div>
		</div>
		<EquippedWeaponCard item={selectedItem} />
	</div>
{:else}
	<button
		class="w-full bg-zinc-700/20 rounded-lg p-10 shadow-md flex flex-col items-center transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800"
		on:click={() => dialog.open()}
	>
		<p class="text-lg text-amber-300 font-semibold">{label}</p>
	</button>
{/if}

<Dialog bind:this={dialog} class="finder-dialog">
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<WeaponFinder {items} bind:selectedItem />
</Dialog>
