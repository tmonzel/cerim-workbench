<script lang="ts">
	import WeaponEquipSlot from '$lib/weapon/WeaponEquipSlot.svelte';
	import { ArmorType, readArmorByType } from '$lib/armor';
	import ArmorEquipSlot from '$lib/armor/ArmorEquipSlot.svelte';
	import { weaponStore } from '$lib/weapon';
	import { accessoryStore } from '$lib/accessory';
	import { inventoryStore, GoodsType } from '$lib/inventory';
	import { derived } from 'svelte/store';
	import { heroAttack, heroContext, heroEquip } from '$lib/state';
	import AccessoryEquipSlot from '$lib/accessory/AccessoryEquipSlot.svelte';
	import InventoryEquipSlot from '$lib/inventory/InventoryEquipSlot.svelte';

	const weapons = derived(weaponStore, (weapons) => Object.values(weapons));
	const helmets = readArmorByType(ArmorType.HEAD);
	const armors = readArmorByType(ArmorType.BODY);
	const legs = readArmorByType(ArmorType.LEGS);
	const gauntlets = readArmorByType(ArmorType.ARMS);

	const talismans = derived(accessoryStore, (accessories) =>
		Object.values(accessories).filter((item) => item.type === 1)
	);

	const greatrunes = derived(inventoryStore, (items) =>
		Object.values(items).filter((item) => item.type === GoodsType.GREAT_RUNE)
	);
</script>

<div>
	<div class="grow grid gap-5" class:hidden={$heroContext !== 'protection'}>
		<ArmorEquipSlot label="Head" items={$helmets} bind:selectedItem={$heroEquip.head} />
		<ArmorEquipSlot label="Chest" items={$armors} bind:selectedItem={$heroEquip.chest} />
		<ArmorEquipSlot label="Legs" items={$legs} bind:selectedItem={$heroEquip.legs} />
		<ArmorEquipSlot label="Arms" items={$gauntlets} bind:selectedItem={$heroEquip.arms} />
	</div>

	<div class="grid grid-cols-2 gap-5" class:hidden={$heroContext !== 'inventory'}>
		<InventoryEquipSlot label="Greatrune" items={$greatrunes} bind:selectedItem={$heroEquip.greatRune} />
	</div>

	<div class="grid grid-cols-2 gap-5" class:hidden={$heroContext !== 'accessories'}>
		<AccessoryEquipSlot label="Pouch" items={$talismans} bind:selectedItem={$heroEquip.pouch} />
		<AccessoryEquipSlot label="Pouch II" items={$talismans} bind:selectedItem={$heroEquip.pouch2} />
		<AccessoryEquipSlot label="Pouch III" items={$talismans} bind:selectedItem={$heroEquip.pouch3} />
		<AccessoryEquipSlot label="Pouch IV" items={$talismans} bind:selectedItem={$heroEquip.pouch4} />
	</div>

	<div class="grow flex flex-col gap-5" class:hidden={$heroContext !== 'attack'}>
		<div class="flex gap-3">
			<div class="grow">
				<WeaponEquipSlot label="Mainhand" items={$weapons} bind:selectedItem={$heroEquip.mainHand} />
			</div>
			<button
				class="w-10 rounded-lg flex justify-center items-center"
				on:click={() => ($heroAttack.activeHand = 'mainHand')}
				class:bg-zinc-800={$heroAttack.activeHand !== 'mainHand'}
				class:bg-zinc-700={$heroAttack.activeHand === 'mainHand'}
			>
				<span class="mat-icon">chevron_right</span>
			</button>
		</div>
		<div class="flex gap-3">
			<div class="grow">
				<WeaponEquipSlot label="Offhand" items={$weapons} bind:selectedItem={$heroEquip.offHand} />
			</div>
			<button
				class="w-10 rounded-lg flex justify-center items-center"
				class:bg-zinc-800={$heroAttack.activeHand !== 'offHand'}
				class:bg-zinc-700={$heroAttack.activeHand === 'offHand'}
				on:click={() => ($heroAttack.activeHand = 'offHand')}
			>
				<span class="mat-icon">chevron_right</span>
			</button>
		</div>
	</div>
</div>
