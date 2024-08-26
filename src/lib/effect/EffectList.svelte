<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import ItemEffectBadge from './EffectBadge.svelte';
	import type { Effect } from '$lib/effect';

	export let effects: Effect[];
	export let editable: boolean = false;
</script>

<ul>
	{#each effects as effect}
		<li class="flex gap-x-5">
			<div class="grow">
				<ItemEffectBadge {effect} />
			</div>
			{#if editable}
				<div class="pt-2">
					<CheckboxControl bind:checked={effect.activated} on:checked></CheckboxControl>
				</div>
			{/if}
		</li>
	{/each}
</ul>
