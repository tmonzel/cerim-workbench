<script lang="ts">
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { heroTypes } from '$lib/hero';
	import { heroType, heroState } from '$lib/state';

	const options = Object.entries(heroTypes).map(([id, t]) => ({ id, name: t.name }));
</script>

<div class="flex gap-14">
	<div class="min-w-40">
		<h3 class="text-md text-zinc-500 mb-2">Class</h3>
		<div>
			<SelectControl {options} bind:value={$heroType} let:item>
				<svelte:fragment slot="selected" let:item>
					<div class="p-1 text-xl">{item?.name}</div>
				</svelte:fragment>

				{item.name}
			</SelectControl>
		</div>
	</div>

	<div class="min-w-20">
		<h3 class="text-md text-zinc-500 mb-2">Level</h3>
		<p class="text-4xl">{$heroState.level}</p>
	</div>

	<div class="min-w-20">
		<h3 class="text-md text-zinc-500 mb-2">Attribute Points</h3>
		<p class="text-4xl">{$heroState.attributePoints}</p>
	</div>

	<div class="min-w-20">
		<h3 class="text-md text-zinc-500 mb-2">Weight</h3>
		<p class="text-4xl">{Math.round($heroState.weight * 10) / 10}</p>
	</div>
</div>
