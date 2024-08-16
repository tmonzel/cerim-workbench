<script lang="ts">
	import InputControl from '$lib/components/InputControl.svelte';
	import SortButton from '$lib/item/components/SortButton.svelte';
	import type { ProtectItem } from './ProtectItem';
	import { createCollection } from '$lib/core';
	import ArmorCard from './ArmorCard.svelte';
	import ItemList from '$lib/item/components/ItemList.svelte';

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

	<ItemList
		items={$result.items}
		itemsPerPage={$pagination.itemsPerPage}
		bind:currentPage={$pagination.page}
		totalItems={$result.totalItems}
		bind:selectedItem
		let:item
	>
		<ArmorCard {item} />
	</ItemList>
</div>
