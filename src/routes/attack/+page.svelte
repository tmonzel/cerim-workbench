<script lang="ts">
	import { weaponStore } from '$lib/item/stores';
	import { heroEquip } from '$lib/state';
	import WeaponSlot from './WeaponSlot.svelte';

	$: items = Object.values($weaponStore);
</script>

<div class="grow flex flex-col gap-5">
	<div class="flex gap-3">
		<div class="grow">
			<WeaponSlot label="Mainhand" {items} bind:item={$heroEquip.mainHand} />
		</div>
	</div>
	<div class="flex gap-3">
		<div class="grow">
			<WeaponSlot label="Offhand" {items} bind:item={$heroEquip.offHand} />
		</div>
	</div>
</div>
