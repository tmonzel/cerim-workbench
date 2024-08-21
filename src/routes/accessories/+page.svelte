<script lang="ts">
	import { accessoryStore } from '$lib/accessory';
	import { heroEquip } from '$lib/state';
	import { derived } from 'svelte/store';
	import AccessorySlot from './AccessorySlot.svelte';

	const talismans = derived(accessoryStore, (accessories) => Object.values(accessories).filter((item) => item.type === 1));
</script>

<div class="grid grid-cols-2 gap-5">
	<AccessorySlot label="Pouch" items={$talismans} bind:item={$heroEquip.pouch} />
	<AccessorySlot label="Pouch II" items={$talismans} bind:item={$heroEquip.pouch2} />
	<AccessorySlot label="Pouch III" items={$talismans} bind:item={$heroEquip.pouch3} />
	<AccessorySlot label="Pouch IV" items={$talismans} bind:item={$heroEquip.pouch4} />
</div>
