<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import type { Item } from '../Item';
	import ItemEffectBadge from './ItemEffectBadge.svelte';

	export let item: Item;
</script>

<ul>
	{#each item.effects as effect}
		<li class="flex gap-x-5">
			<div class="grow">
				<ItemEffectBadge {effect} />
			</div>
			<div class="pt-2">
				<CheckboxControl bind:checked={effect.activated} on:checked={() => (item = item)}></CheckboxControl>
			</div>
		</li>
	{/each}
</ul>
