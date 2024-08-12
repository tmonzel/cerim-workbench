<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import SortButton from '$lib/item/components/SortButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ProtectItem } from './ProtectItem';
	import { createCollection } from '$lib/core';
	import ArmorCard from './ArmorCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let items: ProtectItem[];
	export let selectedItem: ProtectItem | null = null;

	const { result, sort, filters, pagination } = createCollection(
		items,
		{ filters: { search: '' } },
		{
			filters: {
				search: (item: ProtectItem, value: string) => {
					if (value === '') {
						return true;
					}

					return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				}
			},
			sort: {
				weight: (item) => item.weight,
				poise: (item) => item.poise,
				immunity: (item) => item.resistance.immunity,
				robustness: (item) => item.resistance.robustness,
				focus: (item) => item.resistance.focus,
				vitality: (item) => item.resistance.vitality,
				standard: (item) => item.damageNegation.standard,
				strike: (item) => item.damageNegation.strike,
				slash: (item) => item.damageNegation.slash,
				pierce: (item) => item.damageNegation.pierce,
				magic: (item) => item.damageNegation.mag,
				fire: (item) => item.damageNegation.fir,
				lightning: (item) => item.damageNegation.lit,
				holy: (item) => item.damageNegation.hol,
				absPoise: (item) => item.damageNegation.poise,

				resistance: (item) => item.resistanceAvg,
				damageNegation: (item) => item.damageNegationAvg
			}
		}
	);
	const dispatch = createEventDispatcher<{ selectItem: ProtectItem | null }>();

	export function selectItem(item: ProtectItem | null): void {
		selectedItem = item;
		dispatch('selectItem', item);
	}
</script>

<div class="relative">
	<div class="sticky top-0 z-20 p-5 bg-zinc-800">
		<div class="mb-4">
			<InputControl bind:value={$filters.search} placeholder="Search weapon by name..." />
		</div>

		<div class="flex gap-x-10">
			<div>
				<h6 class="font-semibold">Sorting</h6>
			</div>
			<div>
				<h6>Stats</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.weight}>Weight</SortButton>
					<SortButton bind:state={$sort.poise}>Poise</SortButton>
				</div>
			</div>
			<div>
				<h6>Resistance</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.resistance}>Averages(⌀)</SortButton>
					<SortButton bind:state={$sort.immunity}>Immunity</SortButton>
					<SortButton bind:state={$sort.robustness}>Robustness</SortButton>
					<SortButton bind:state={$sort.focus}>Focus</SortButton>
					<SortButton bind:state={$sort.vitality}>Vitality</SortButton>
				</div>
			</div>
			<div>
				<h6>Absorption</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.damageNegation}>Averages(⌀)</SortButton>
					<SortButton bind:state={$sort.standard}>Standard</SortButton>
					<SortButton bind:state={$sort.strike}>Strike</SortButton>
					<SortButton bind:state={$sort.slash}>Slash</SortButton>
					<SortButton bind:state={$sort.pierce}>Pierce</SortButton>
					<SortButton bind:state={$sort.magic}>Magic</SortButton>
					<SortButton bind:state={$sort.fire}>Fire</SortButton>
					<SortButton bind:state={$sort.lightning}>Lightning</SortButton>
					<SortButton bind:state={$sort.holy}>Holy</SortButton>
				</div>
			</div>
		</div>
	</div>

	{#if $result.totalItems > $pagination.itemsPerPage}
		<div class="p-5 flex justify-end text-sm">
			<Pagination
				totalItems={$result.totalItems}
				itemsPerPage={$pagination.itemsPerPage}
				bind:currentPage={$pagination.page}
			/>
		</div>
	{/if}

	{#if items.length === 0}
		<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
			<span class="mat-icon me-2">warning</span>Sorry, no items found
		</div>
	{/if}

	<ul class="grid grid-cols-3 px-5 py-2 gap-10">
		{#each $result.items as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => selectItem(item)}
					class:ring-2={selectedItem?.id === item.id}
					class:bg-stone-800={selectedItem?.id === item.id}
					class:ring-amber-300={selectedItem?.id === item.id}
				>
					<ArmorCard {item} />
				</button>
			</li>
		{/each}
	</ul>
</div>
