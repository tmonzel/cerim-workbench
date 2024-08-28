<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Item } from '../Item';
	import EffectBadge from '$lib/effect/EffectBadge.svelte';

	type T = $$Generic<Item>;

	export let item: T;
	export let editable: boolean = false;

	const dispatch = createEventDispatcher<{ update: T }>();

	function update(): void {
		item = item;
		dispatch('update', item);
	}
</script>

<ul>
	{#each item.effects as effect}
		<li class="flex gap-x-5">
			<div class="grow">
				<EffectBadge {effect} />
			</div>
			{#if editable}
				<div class="pt-2">
					<CheckboxControl bind:checked={effect.activated} on:checked={() => update()}></CheckboxControl>
				</div>
			{/if}
		</li>
	{/each}
</ul>
