<script>
	import { accessoryStore } from '$lib/accessory';
	import { equipStore } from '../equip.store';
	import AccessoryEquipSlot from '$lib/accessory/AccessoryEquipSlot.svelte';
	import { derived } from 'svelte/store';

	const talismans = derived(accessoryStore, (accessories) =>
		Object.values(accessories).filter((item) => item.type === 1)
	);
</script>

<div class="grid grid-cols-2 gap-5">
	<AccessoryEquipSlot label="Pouch" items={$talismans} bind:selectedItem={$equipStore.pouch} />
	<AccessoryEquipSlot label="Pouch II" items={$talismans} bind:selectedItem={$equipStore.pouch2} />
	<AccessoryEquipSlot label="Pouch III" items={$talismans} bind:selectedItem={$equipStore.pouch3} />
	<AccessoryEquipSlot label="Pouch IV" items={$talismans} bind:selectedItem={$equipStore.pouch4} />
</div>
