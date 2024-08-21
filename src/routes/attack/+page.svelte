<script lang="ts">
	import { heroEquip } from '$lib/state';
	import { weaponStore } from '$lib/weapon';
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
