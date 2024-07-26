<script lang="ts">
	import { type HeroState } from '$lib/hero';
	import { appState } from '$lib/state';
	import { protectionEquip } from '../protection.state';
	import { combatEquip } from '../combat.state';
	import ArmorEquipSlot from './ArmorEquipSlot.svelte';
	import WeaponEquipSlot from './WeaponEquipSlot.svelte';
	import AccessoryEquipSlot from './AccessoryEquipSlot.svelte';
	import { accessoryEquip } from '../accessory.state';

	export let hero: HeroState;
</script>

<div class:hidden={$appState.heroContext !== 'attack'}>
	<div class="bg-zinc-800/30 rounded-xl p-5">
		<div class="flex flex-col gap-5">
			<WeaponEquipSlot label="Mainhand" bind:selectedId={$combatEquip.mainHand} />
			<WeaponEquipSlot label="Offhand" bind:selectedId={$combatEquip.offHand} />
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
