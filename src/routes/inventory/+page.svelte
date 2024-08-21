<script lang="ts">
	import { GoodsType, inventoryStore } from '$lib/inventory';
	import { heroEquip } from '$lib/state';
	import { derived } from 'svelte/store';
	import InventorySlot from './InventorySlot.svelte';

	const greatrunes = derived(inventoryStore, (items) => Object.values(items).filter((item) => item.type === GoodsType.GREAT_RUNE));
</script>

<div class="grid grid-cols-2 gap-5">
	<InventorySlot label="Greatrune" items={$greatrunes} bind:item={$heroEquip.greatRune} />
</div>
