<script lang="ts">
	import { type Item } from '$lib/item';
	import SidePanel from '$lib/components/SidePanel.svelte';
	import AccessoryCard from './AccessoryCard.svelte';
	import { accessoryStore } from '../state';
	import ItemSelectList from '$lib/item/components/ItemSelectList.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';

	export let label: string;
	export let type: string;
	export let selectedId: string | null = null;

	let items = accessoryStore.all;

	$: filteredItems = $items.filter((item) => item.type === type);
	$: selectedItem = selectedId ? $accessoryStore.entities[selectedId] : null;

	let panel: SidePanel;

	export function selectItem(item: Item | null): void {
		selectedId = item ? item.id : null;
		panel.close();
	}
</script>

<div class="relative">
	{#if selectedItem && selectedItem.possibleUpgrades > 0}
		<div class="mb-2">
			<ItemUpgradeBar store={accessoryStore} item={selectedItem} />
		</div>
	{/if}

	<button
		type="button"
		class="group w-full bg-stone-700/20 rounded-lg p-5 text-left items-start shadow-md transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800"
		on:click={() => panel.open()}
	>
		{#if selectedItem}
			<div class="flex justify-between">
				<div>
					<span class="text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300">
						{label}
					</span>
				</div>
				<div>
					<button
						class="relative flex rounded-lg bg-stone-600/40 p-1 ring-stone-400 hover:ring-2 group"
						on:click|stopPropagation|preventDefault={() => selectItem(null)}
					>
						<svg
							class="fill-stone-400"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#5f6368"
							><path
								d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
							/></svg
						>
					</button>
				</div>
			</div>

			<div class="pt-3">
				<AccessoryCard accessory={selectedItem} />
			</div>
		{:else}
			<div class="text-center py-5 flex flex-col items-center">
				<p class="text-lg text-amber-300 font-semibold">{label}</p>
			</div>
		{/if}
	</button>
</div>

<SidePanel bind:this={panel}>
	<div class="text-stone-300 bg-neutral-800 text-xl p-2 flex justify-between items-center border-b border-zinc-700">
		<div class="p-4">Select Accessory</div>
		{#if selectedItem}
			<div>
				<button class="bg-amber-300 text-amber-900 p-2.5 rounded-md" on:click={() => selectItem(null)}
					>Clear Slot</button
				>
			</div>
		{/if}
	</div>

	<ItemSelectList items={filteredItems} on:selectItem={(e) => selectItem(e.detail)} let:item>
		<div class="max-w-xl">
			<AccessoryCard accessory={item} />
		</div>
	</ItemSelectList>
</SidePanel>
