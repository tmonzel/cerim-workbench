<script lang="ts">
	import SidePanel from '$lib/components/SidePanel.svelte';
	import type { AttackItem, Item } from '$lib/item';
	import ItemSelectList from '$lib/item/components/ItemSelectList.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { AffinityType } from '$lib/core';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import { writable } from 'svelte/store';
	import { affinities, itemGroups } from '$lib/item/data';
	import { weaponStore } from '$lib/stores';
	import WeaponCard from '$lib/item/components/WeaponCard.svelte';
	import WeaponInfo from '$lib/item/components/WeaponInfo.svelte';

	export let label: string;
	export let selectedId: string | null = null;

	let panel: SidePanel;
	let items = weaponStore.all;
	let availableGroups = ['daggers', 'swords', 'shields'].map((t) => ({ name: itemGroups[t].name, id: t }));

	const selectedGroup = writable<string | null>('daggers');

	$: filteredItems = $items.filter((item) => item.group === $selectedGroup);
	$: selectedItem = selectedId ? $weaponStore.entities[selectedId] : null;

	function changeAffinity(weapon: AttackItem, aff: AffinityType): void {
		weapon.setAffinity(aff);
		weaponStore.updateEntity(weapon.id, weapon);
	}

	const affinityOptions = Object.entries(affinities).map((entry) => ({
		name: entry[1].name,
		iconUrl: entry[1].iconUrl,
		id: entry[0]
	}));

	export function selectItem(item: Item | null): void {
		selectedId = item ? item.id : null;
		panel.close();
	}
</script>

<div class="relative">
	<div class="flex justify-between items-center gap-7 mb-2">
		<div class="flex items-center gap-x-4">
			{#if selectedItem && selectedItem.affinities.size > 0}
				<SelectControl
					options={affinityOptions}
					value={selectedItem.affinity ?? AffinityType.STANDARD}
					on:select={(e) => changeAffinity(selectedItem, e.detail)}
					let:item
				>
					<svelte:fragment slot="selected" let:item>
						<div class="p-0.5 flex">
							{#if item}
								<img class="w-5 me-2" src={item.iconUrl} alt="{item.name} Affinity Icon" />
								{item.name}
							{/if}
						</div>
					</svelte:fragment>

					<img class="w-5 me-2" src={item.iconUrl} alt="{item.name} Affinity Icon" />
					<span>{item.name}</span>
				</SelectControl>
			{/if}

			{#if selectedItem && selectedItem.possibleUpgrades > 0}
				<ItemUpgradeBar store={weaponStore} item={selectedItem} />
			{/if}
		</div>
	</div>
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
				<WeaponCard item={selectedItem} />
			</div>
		{:else}
			<div class="text-center py-10 flex flex-col items-center">
				<p class="text-lg text-amber-300 font-semibold">{label}</p>
			</div>
		{/if}
	</button>
</div>

<SidePanel bind:this={panel}>
	<div class="text-stone-300 bg-neutral-800 text-xl p-2 flex justify-between items-center border-b border-zinc-700">
		<div class="p-4">
			Select <span class="font-semibold">{label}</span> Item
		</div>
		{#if selectedItem}
			<div>
				<button class="bg-amber-300 text-amber-900 p-2.5 rounded-md" on:click={() => selectItem(null)}
					>Clear Slot</button
				>
			</div>
		{/if}
	</div>
	<div class="sticky top-0 px-5 py-3 item-list-header z-50 bg-neutral-800">
		<SelectControl options={availableGroups} bind:value={$selectedGroup} let:item>
			<svelte:fragment slot="selected" let:item>
				{#if item}
					<div class="p-2">
						{item.name}
					</div>
				{:else}
					<div class="p-2">All items</div>
				{/if}
			</svelte:fragment>

			<span>{item.name}</span>
		</SelectControl>
	</div>
	<div class="flex gap-x-3">
		<ItemSelectList items={filteredItems} on:selectItem={(e) => selectItem(e.detail)} let:item>
			<div class="max-w-xl">
				<ItemCard {item}>
					<div class="mb-2">
						<AttackBadge attack={item.attack} />
					</div>
					<div class="mb-2">
						<AttackDetail attack={item.attack} compact />
					</div>
					<WeaponInfo {item} />
				</ItemCard>
			</div>
		</ItemSelectList>
	</div></SidePanel
>
