<script lang="ts">
	import { equipStore } from '$lib/equip';
	import { derived } from 'svelte/store';
	import InventorySlot from './InventorySlot.svelte';
	import { inventoryStore } from '$lib/item/stores';
	import { GoodsType } from '$lib/item';

	const greatrunes = derived(inventoryStore, (items) => Object.values(items).filter((item) => item.type === GoodsType.GREAT_RUNE));
</script>

<div class="grid grid-cols-2 gap-5">
	<InventorySlot label="Greatrune" items={$greatrunes} bind:item={$equipStore.greatRune} />
</div>
