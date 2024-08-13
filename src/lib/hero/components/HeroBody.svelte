<script lang="ts">
	import WeaponEquipSlot from '$lib/weapon/WeaponEquipSlot.svelte';
	import { ArmorType, readArmorByType } from '$lib/armor';
	import ArmorEquipSlot from '$lib/armor/ArmorEquipSlot.svelte';
	import { weaponStore } from '$lib/weapon';
	import { derived } from 'svelte/store';
	import AccessoryPanel from './AccessoryPanel.svelte';
	import { appStore, equipStore, combatStore } from '$lib/state';
	import InventoryPanel from '$lib/inventory/InventoryPanel.svelte';

	const weapons = derived(weaponStore, (weapons) => Object.values(weapons));
	const helmets = readArmorByType(ArmorType.HEAD);
	const armors = readArmorByType(ArmorType.BODY);
	const legs = readArmorByType(ArmorType.LEGS);
	const gauntlets = readArmorByType(ArmorType.ARMS);
</script>

<div>
	<div class="grow grid grid-cols-2 gap-5" class:hidden={$appStore.heroContext !== 'protection'}>
		<ArmorEquipSlot label="Head" items={$helmets} bind:selectedItem={$equipStore.head} />
		<ArmorEquipSlot label="Chest" items={$armors} bind:selectedItem={$equipStore.chest} />
		<ArmorEquipSlot label="Legs" items={$legs} bind:selectedItem={$equipStore.legs} />
		<ArmorEquipSlot label="Arms" items={$gauntlets} bind:selectedItem={$equipStore.arms} />
	</div>

	<div class:hidden={$appStore.heroContext !== 'inventory'}>
		<InventoryPanel />
	</div>

	<div class:hidden={$appStore.heroContext !== 'accessories'}>
		<AccessoryPanel />
	</div>

	<div class="grow flex flex-col gap-5" class:hidden={$appStore.heroContext !== 'attack'}>
		<div class="flex gap-3">
			<div class="grow">
				<WeaponEquipSlot label="Mainhand" items={$weapons} bind:selectedItem={$equipStore.mainHand} />
			</div>
			<button
				class="w-10 rounded-lg flex justify-center items-center"
				on:click={() => ($combatStore.activeHand = 'mainHand')}
				class:bg-zinc-800={$combatStore.activeHand !== 'mainHand'}
				class:bg-zinc-700={$combatStore.activeHand === 'mainHand'}
			>
				<span class="mat-icon">chevron_right</span>
			</button>
		</div>
		<div class="flex gap-3">
			<div class="grow">
				<WeaponEquipSlot label="Offhand" items={$weapons} bind:selectedItem={$equipStore.offHand} />
			</div>
			<button
				class="w-10 rounded-lg flex justify-center items-center"
				class:bg-zinc-800={$combatStore.activeHand !== 'offHand'}
				class:bg-zinc-700={$combatStore.activeHand === 'offHand'}
				on:click={() => ($combatStore.activeHand = 'offHand')}
			>
				<span class="mat-icon">chevron_right</span>
			</button>
		</div>
	</div>
</div>
