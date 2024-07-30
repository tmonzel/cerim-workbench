<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import InputControl from '$lib/components/InputControl.svelte';
	import { createItemCollection } from '$lib/item/collection';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import SortButton from '$lib/item/components/SortButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import WeaponInfo from './WeaponInfo.svelte';
	import type { AttackItem } from './AttackItem';

	export let items: AttackItem[];
	export let selectedItem: AttackItem | null = null;

	const { result, state } = createItemCollection(items, {
		sort: {
			weight: (item: AttackItem) => item.weight,
			physicalAttack: (item: AttackItem) => item.attack.phy ?? 0
		}
	});
	const dispatch = createEventDispatcher<{ selectItem: AttackItem | null }>();

	export function selectItem(item: AttackItem | null): void {
		selectedItem = item;
		dispatch('selectItem', item);
	}
</script>

<div>
	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<div class="mb-4">
			<InputControl bind:value={$state.search} placeholder="Search weapon by name..." />
		</div>

		<div class="flex gap-x-10">
			<div>
				<h6 class="font-semibold">Sorting</h6>
			</div>
			<div>
				<h6>Stats</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$state.sort.weight}>Weight</SortButton>
				</div>
			</div>
			<div>
				<h6>Attack Type</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$state.sort.physicalAttack}>Physical</SortButton>
				</div>
			</div>
		</div>
	</div>
	{#if items.length === 0}
		<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
			<span class="mat-icon me-2">warning</span>Sorry, no items found
		</div>
	{/if}

	<ul class="grid grid-cols-2 px-5 py-2 gap-10">
		{#each $result as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => selectItem(item)}
					class:ring-2={selectedItem?.id === item.id}
					class:bg-stone-800={selectedItem?.id === item.id}
					class:ring-amber-300={selectedItem?.id === item.id}
				>
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
					</ItemCard>
				</button>
			</li>
		{/each}
	</ul>
</div>
