<script>
	import { derived } from 'svelte/store';
	import GoodEquipSlot from './GoodEquipSlot.svelte';
	import { equipStore } from '$lib/state';
	import { inventoryStore } from './store';
	import { GoodsType } from './types';

	const greatrunes = derived(inventoryStore, (items) =>
		Object.values(items).filter((item) => item.type === GoodsType.GREAT_RUNE)
	);
</script>

<div class="grid grid-cols-2 gap-5">
	<GoodEquipSlot label="Greatrune" items={$greatrunes} bind:selectedItem={$equipStore.greatRune} />
</div>
