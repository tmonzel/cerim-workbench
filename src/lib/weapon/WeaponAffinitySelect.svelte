<script lang="ts">
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { AffinityType } from '$lib/core';
	import { affinities } from './affinities';
	import type { AttackItem } from './AttackItem';

	export let item: AttackItem;

	function changeAffinity(aff: AffinityType): void {
		item.setAffinity(aff);
		item = item;
	}

	const affinityOptions = Object.entries(affinities).map((entry) => ({
		name: entry[1].name,
		iconUrl: entry[1].iconUrl,
		id: entry[0]
	}));
</script>

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
