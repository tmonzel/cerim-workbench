<script lang="ts">
	import { equipStore } from '../equip.store';
	import WeaponEquipSlot from '$lib/weapon/WeaponEquipSlot.svelte';
	import { ArmorType, readArmorByType } from '$lib/armor';
	import ArmorEquipSlot from '$lib/armor/ArmorEquipSlot.svelte';
	import { appStore } from '$lib/state';
	import { weaponStore } from '$lib/weapon';
	import { derived } from 'svelte/store';
	import AccessoryPanel from './AccessoryPanel.svelte';

	const weapons = derived(weaponStore, (weapons) => Object.values(weapons));
	const helmets = readArmorByType(ArmorType.HEAD);
	const armors = readArmorByType(ArmorType.BODY);
	const legs = readArmorByType(ArmorType.LEGS);
	const gauntlets = readArmorByType(ArmorType.ARMS);
</script>

<div class="flex gap-5">
	<div
		class="bg-zinc-800/30 rounded-xl p-5 grow flex flex-col gap-5"
		class:hidden={$appStore.heroContext !== 'protection'}
	>
		<ArmorEquipSlot label="Head" items={$helmets} bind:selectedItem={$equipStore.head} />
		<ArmorEquipSlot label="Chest" items={$armors} bind:selectedItem={$equipStore.chest} />
		<ArmorEquipSlot label="Legs" items={$legs} bind:selectedItem={$equipStore.legs} />
		<ArmorEquipSlot label="Arms" items={$gauntlets} bind:selectedItem={$equipStore.arms} />
	</div>

	<div class="bg-zinc-800/30 rounded-xl p-5 grow" class:hidden={$appStore.heroContext !== 'attack'}>
		<div class="flex flex-col gap-5">
			<WeaponEquipSlot label="Mainhand" items={$weapons} bind:selectedItem={$equipStore.mainHand} />
			<WeaponEquipSlot label="Offhand" items={$weapons} bind:selectedItem={$equipStore.offHand} />
		</div>
	</div>

	<AccessoryPanel />
</div>
