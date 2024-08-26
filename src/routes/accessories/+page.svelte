<script lang="ts">
	import { accessoryStore } from '$lib/item/stores';
	import { equipStore } from '$lib/equip';
	import { derived } from 'svelte/store';
	import AccessorySlot from './AccessorySlot.svelte';

	const talismans = derived(accessoryStore, (accessories) => Object.values(accessories).filter((item) => item.type === 1));
</script>

<div class="grid grid-cols-2 gap-5">
	<div>
		<AccessorySlot label="Pouch" items={$talismans} bind:item={$equipStore.pouch} />
	</div>
	<div>
		<AccessorySlot label="Pouch II" items={$talismans} bind:item={$equipStore.pouch2} />
	</div>
	<div>
		<AccessorySlot label="Pouch III" items={$talismans} bind:item={$equipStore.pouch3} />
	</div>
	<div>
		<AccessorySlot label="Pouch IV" items={$talismans} bind:item={$equipStore.pouch4} />
	</div>
</div>
