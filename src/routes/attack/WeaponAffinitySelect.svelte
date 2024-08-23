<script lang="ts">
	import { affinities, AffinityType } from '$lib/core';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import type { AttackItem } from '$lib/item';
	import { createEventDispatcher } from 'svelte';

	export let item: AttackItem;

	const dispatch = createEventDispatcher();

	function changeAffinity(aff: AffinityType): void {
		item.setAffinity(aff);
		item = item;
		dispatch('update', item);
	}

	type AffinityOption = {
		name: string;
		iconUrl: string;
		id: string;
	};

	const affinityOptions: AffinityOption[] = Object.entries(affinities).map((entry) => ({
		name: entry[1].name,
		iconUrl: entry[1].iconUrl,
		id: entry[0]
	}));
</script>

<div>
	<SelectControl options={affinityOptions} value={item.affinity ?? AffinityType.STANDARD} on:select={(e) => changeAffinity(e.detail)} let:item>
		<svelte:fragment slot="selected" let:item>
			<div class="p-1 flex items-center">
				{#if item}
					<div><img class="w-7 me-2" src={item.iconUrl} alt="{item.name} Affinity Icon" /></div>
					<div class="grow text-lg">
						{item.name}
					</div>
				{/if}
			</div>
		</svelte:fragment>

		<img src={item.iconUrl} alt={`${item.name} Affinity`} class="w-5 me-2" />
		<span>{item.name}</span>
	</SelectControl>
</div>
