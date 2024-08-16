<script lang="ts">
	import type { AccessoryItem } from '$lib/accessory';
	import Button from '$lib/components/Button.svelte';
	import type { AttackItem } from '$lib/weapon';

	export let item: AttackItem | AccessoryItem;

	function upgrade(tier: number): void {
		item.upgrade(tier);
		item = item;
	}
</script>

<div class="flex gap-2">
	<div>
		<Button
			icon="add"
			disabled={item.tier >= item.possibleUpgrades}
			on:click={() => upgrade(item.tier + 1)}
			class="text-2xl"
		/>
	</div>
	<div>
		<Button icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} class="text-2xl" />
	</div>
</div>
