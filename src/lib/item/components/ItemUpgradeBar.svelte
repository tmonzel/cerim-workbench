<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { EntityStore } from '$lib/core';
	import { type Item } from '$lib/item';

	export let item: Item;
	export let store: EntityStore<Item>;

	function upgrade(tier: number): void {
		item.upgrade(tier);
		store.updateEntity(item.id, item);
	}
</script>

<div class="flex gap-2">
	<div>
		<Button icon="add" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)} />
	</div>
	<div>
		<Button icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} />
	</div>
</div>
