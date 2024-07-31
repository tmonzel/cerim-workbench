<script lang="ts">
	import { equipStore } from '../equip.store';
	import WeaponEquipSlot from '$lib/weapon/WeaponEquipSlot.svelte';
	import { ArmorType, readArmorByType } from '$lib/armor';
	import ArmorEquipSlot from '$lib/armor/ArmorEquipSlot.svelte';
	import { accessoryStore } from '$lib/accessory';
	import AccessoryEquipSlot from '$lib/accessory/AccessoryEquipSlot.svelte';
	import { appStore } from '$lib/state';
	import { weaponStore } from '$lib/weapon';
	import { derived } from 'svelte/store';

	const weapons = derived(weaponStore, (weapons) => Object.values(weapons));
	const helmets = readArmorByType(ArmorType.HEAD);
	const armors = readArmorByType(ArmorType.BODY);
	const legs = readArmorByType(ArmorType.LEGS);
	const gauntlets = readArmorByType(ArmorType.ARMS);
	const talismans = derived(accessoryStore, (accessories) =>
		Object.values(accessories).filter((item) => item.type === 1)
	);
</script>

<div class:hidden={$appStore.heroContext !== 'attack'}>
	<div class="bg-zinc-800/30 rounded-xl p-5">
		<div class="flex flex-col gap-5">
			<WeaponEquipSlot label="Mainhand" items={$weapons} bind:selectedItem={$equipStore.mainHand} />
			<WeaponEquipSlot label="Offhand" items={$weapons} bind:selectedItem={$equipStore.offHand} />
		</div>
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appStore.heroContext !== 'accessories'}>
	<div class="grid grid-cols-2 gap-5">
		<!--<AccessoryEquipSlot label="Greatrune" items={$runes} bind:selectedItem={$equipStore.rune} />-->
		<AccessoryEquipSlot label="Pouch" items={$talismans} bind:selectedItem={$equipStore.pouch} />
		<AccessoryEquipSlot label="Pouch II" items={$talismans} bind:selectedItem={$equipStore.pouch2} />
		<AccessoryEquipSlot label="Pouch III" items={$talismans} bind:selectedItem={$equipStore.pouch3} />
		<AccessoryEquipSlot label="Pouch IV" items={$talismans} bind:selectedItem={$equipStore.pouch4} />
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appStore.heroContext !== 'protection'}>
	<div class="grid grid-cols-2 gap-5">
		<ArmorEquipSlot label="Head" items={$helmets} bind:selectedItem={$equipStore.head} />
		<ArmorEquipSlot label="Chest" items={$armors} bind:selectedItem={$equipStore.chest} />
		<ArmorEquipSlot label="Legs" items={$legs} bind:selectedItem={$equipStore.legs} />
		<ArmorEquipSlot label="Arms" items={$gauntlets} bind:selectedItem={$equipStore.arms} />
	</div>
</div>
