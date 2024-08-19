<script lang="ts">
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { affinities, AffinityType } from './affinity';
	import type { AttackItem } from './AttackItem';

	export let item: AttackItem;

	function changeAffinity(aff: AffinityType): void {
		item.setAffinity(aff);
		item = item;
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
	<SelectControl
		options={affinityOptions}
		value={item.affinity ?? AffinityType.STANDARD}
		on:select={(e) => changeAffinity(e.detail)}
		let:item
	>
		<svelte:fragment slot="selected" let:item>
			<div class="p-2 flex">
				{#if item}
					<div><img class="w-7 me-2" src={item.iconUrl} alt="{item.name} Affinity Icon" /></div>
					<div class="grow text-xl">
						{item.name}
					</div>
				{/if}
			</div>
		</svelte:fragment>

		<img src={item.iconUrl} alt={`${item.name} Affinity`} class="w-5 me-2" />
		<span>{item.name}</span>
	</SelectControl>
</div>
