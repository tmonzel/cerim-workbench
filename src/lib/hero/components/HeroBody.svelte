<script lang="ts">
	import { appState } from '$lib/state';
	import { equipStore } from '../equip.store';
	import { weaponStore } from '$lib/weapon/weapon.store';
	import WeaponEquipSlot from '$lib/weapon/WeaponEquipSlot.svelte';
	import { armorStore } from '$lib/armor';
	import ArmorEquipSlot from '$lib/armor/ArmorEquipSlot.svelte';
	import { accessoryStore } from '$lib/accessory';
	import AccessoryEquipSlot from '$lib/accessory/AccessoryEquipSlot.svelte';

	const weapons = weaponStore.all;
	const helmets = armorStore.findByType('helm');
	const armors = armorStore.findByType('armor');
	const legs = armorStore.findByType('leg');
	const gauntlets = armorStore.findByType('gauntlet');
	const talismans = accessoryStore.findByType('talisman');
	const runes = accessoryStore.findByType('rune');
</script>

<div class:hidden={$appState.heroContext !== 'attack'}>
	<div class="bg-zinc-800/30 rounded-xl p-5">
		<div class="flex flex-col gap-5">
			<WeaponEquipSlot label="Mainhand" items={$weapons} bind:selectedItem={$equipStore.mainHand} />
			<WeaponEquipSlot label="Offhand" items={$weapons} bind:selectedItem={$equipStore.offHand} />
		</div>
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appState.heroContext !== 'accessories'}>
	<div class="grid grid-cols-2 gap-5">
		<AccessoryEquipSlot label="Greatrune" items={$runes} bind:selectedItem={$equipStore.rune} />
		<AccessoryEquipSlot label="Pouch" items={$talismans} bind:selectedItem={$equipStore.pouch} />
		<AccessoryEquipSlot label="Pouch II" items={$talismans} bind:selectedItem={$equipStore.pouch2} />
		<AccessoryEquipSlot label="Pouch III" items={$talismans} bind:selectedItem={$equipStore.pouch3} />
		<AccessoryEquipSlot label="Pouch IV" items={$talismans} bind:selectedItem={$equipStore.pouch4} />
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appState.heroContext !== 'protection'}>
	<div class="grid grid-cols-2 gap-5">
		<ArmorEquipSlot label="Head" items={$helmets} bind:selectedItem={$equipStore.head} />
		<ArmorEquipSlot label="Chest" items={$armors} bind:selectedItem={$equipStore.chest} />
		<ArmorEquipSlot label="Legs" items={$legs} bind:selectedItem={$equipStore.legs} />
		<ArmorEquipSlot label="Arms" items={$gauntlets} bind:selectedItem={$equipStore.arms} />
	</div>
</div>
