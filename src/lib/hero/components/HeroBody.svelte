<script lang="ts">
	import { writable } from 'svelte/store';
	import { type HeroBodyState, type HeroState } from '$lib/hero';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import { appState } from '$lib/state';
	import WeaponEquipSlot from '$lib/combat/components/WeaponEquipSlot.svelte';
	import { combatEquip } from '$lib/combat';
	import { protectionEquip } from '$lib/protection';
	import ArmorEquipSlot from '$lib/protection/components/ArmorEquipSlot.svelte';
	import AccessoryEquipSlot from '$lib/accessory/components/AccessoryEquipSlot.svelte';
	import { accessoryEquip } from '$lib/accessory';

	export let hero: HeroState;

	const bodyState = writable<HeroBodyState>({
		guardInfo: true,
		scalingInfo: true
	});
</script>

<div class:hidden={$appState.heroContext !== 'attack'}>
	<div class="bg-zinc-800/30 rounded-xl p-5">
		<div class="flex flex-col gap-5">
			<WeaponEquipSlot label="Mainhand" bind:selectedId={$combatEquip.mainHand} attributes={hero.totalAttributes} />
			<WeaponEquipSlot label="Offhand" bind:selectedId={$combatEquip.offHand} attributes={hero.totalAttributes} />
		</div>
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appState.heroContext !== 'accessories'}>
	<div class="grid grid-cols-2 gap-5">
		<AccessoryEquipSlot label="Greatrune" type="rune" bind:selectedId={$accessoryEquip.rune} />
		<AccessoryEquipSlot label="Pouch" type="talisman" bind:selectedId={$accessoryEquip.pouch} />
		<AccessoryEquipSlot label="Pouch II" type="talisman" bind:selectedId={$accessoryEquip.pouch2} />
		<AccessoryEquipSlot label="Pouch III" type="talisman" bind:selectedId={$accessoryEquip.pouch3} />
		<AccessoryEquipSlot label="Pouch IV" type="talisman" bind:selectedId={$accessoryEquip.pouch4} />
	</div>
</div>

<div class="bg-zinc-800/30 rounded-xl p-5" class:hidden={$appState.heroContext !== 'protection'}>
	<div class="grid grid-cols-2 gap-5">
		<ArmorEquipSlot label="Head" type="helm" bind:selectedId={$protectionEquip.head} />
		<ArmorEquipSlot label="Chest" type="armor" bind:selectedId={$protectionEquip.chest} />
		<ArmorEquipSlot label="Legs" type="leg" bind:selectedId={$protectionEquip.legs} />
		<ArmorEquipSlot label="Arms" type="gauntlet" bind:selectedId={$protectionEquip.arms} />
	</div>
</div>
