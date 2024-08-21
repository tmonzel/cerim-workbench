<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Upgradable } from '$lib/item';
	import { createEventDispatcher } from 'svelte';

	export let item: Upgradable;

	const dispatch = createEventDispatcher();

	function upgrade(tier: number): void {
		item.upgrade(tier);
		item = item;
		dispatch('update', item);
	}
</script>

<div class="inline-flex gap-2 text-xl justify-center items-center">
	<div>
		<Button theme="default" icon="add" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)} />
	</div>
	<div>
		<Button theme="default" icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} />
	</div>
</div>
