<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { AffinityType } from '$lib/core/types';
	import { itemStore, type Item } from '$lib/item';
	import { affinityRecord } from '$lib/records';
	import { Weapon } from '../Weapon';

	export let item: Item;

	let availableAffinities: AffinityType[] = [];

	function upgrade(tier: number): void {
		item.upgrade(tier);
		itemStore.update((items) => ({ ...items, [item!.id]: item! }));
	}

	function changeAffinity(aff: AffinityType): void {
		if (item instanceof Weapon) {
			item.setAffinity(aff);
			itemStore.update((items) => ({ ...items, [item!.id]: item! }));
		}
	}

	const affinityOptions = Object.entries(affinityRecord).map((entry) => ({
		name: entry[1].name,
		iconUrl: entry[1].iconUrl,
		id: entry[0]
	}));

	$: {
		if (item instanceof Weapon) {
			availableAffinities = [...item.affinities.keys()] as AffinityType[];
		}
	}
</script>

<div class="flex gap-2">
	{#if item instanceof Weapon && availableAffinities.length > 0}
		<div class="flex">
			<SelectControl
				options={affinityOptions}
				value={item.affinity ?? AffinityType.STANDARD}
				on:select={(e) => changeAffinity(e.detail)}
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
		</div>
	{/if}

	<div>
		<Button icon="add" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)} />
	</div>
	<div>
		<Button icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} />
	</div>
</div>
