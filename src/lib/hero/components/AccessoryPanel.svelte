<script>
	import { accessoryStore } from '$lib/accessory';
	import { equipStore } from '../equip.store';
	import AccessoryEquipSlot from '$lib/accessory/AccessoryEquipSlot.svelte';
	import { derived } from 'svelte/store';

	const talismans = derived(accessoryStore, (accessories) =>
		Object.values(accessories).filter((item) => item.type === 1)
	);
</script>

<div class="bg-zinc-800/30 rounded-xl p-5">
	<div class="flex flex-col gap-5">
		<AccessoryEquipSlot label="Pouch" items={$talismans} bind:selectedItem={$equipStore.pouch} displayMode="icon" />
		<AccessoryEquipSlot label="Pouch II" items={$talismans} bind:selectedItem={$equipStore.pouch2} displayMode="icon" />
		<AccessoryEquipSlot
			label="Pouch III"
			items={$talismans}
			bind:selectedItem={$equipStore.pouch3}
			displayMode="icon"
		/>
		<AccessoryEquipSlot label="Pouch IV" items={$talismans} bind:selectedItem={$equipStore.pouch4} displayMode="icon" />
	</div>
</div>
