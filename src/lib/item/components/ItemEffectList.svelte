<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Item } from '../Item';
	import ItemEffectBadge from './ItemEffectBadge.svelte';

	export let item: Item;
	export let editable: boolean = false;

	const dispatch = createEventDispatcher<{ update: Item }>();

	function onChecked() {
		item = item;
		dispatch('update', item);
	}
</script>

<ul>
	{#each item.effects as effect}
		<li class="flex gap-x-5">
			<div class="grow">
				<ItemEffectBadge {effect} />
			</div>
			{#if editable}
				<div class="pt-2">
					<CheckboxControl bind:checked={effect.activated} on:checked={onChecked}></CheckboxControl>
				</div>
			{/if}
		</li>
	{/each}
</ul>
