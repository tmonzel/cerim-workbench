<script lang="ts">
	import { heroEquip } from '$lib/state';
	import { derived } from 'svelte/store';
	import ArmorSlot from './ArmorSlot.svelte';
	import { armorStore } from '$lib/item/stores';
	import { ArmorType } from '$lib/item';

	export function readArmorByType(type: number) {
		return derived(armorStore, (items) => Object.values(items).filter((item) => item.type === type));
	}

	const helmets = readArmorByType(ArmorType.HEAD);
	const armors = readArmorByType(ArmorType.BODY);
	const legs = readArmorByType(ArmorType.LEGS);
	const gauntlets = readArmorByType(ArmorType.ARMS);
</script>

<div class="grow grid gap-5">
	<ArmorSlot label="Head" items={$helmets} bind:item={$heroEquip.head} />
	<ArmorSlot label="Chest" items={$armors} bind:item={$heroEquip.chest} />
	<ArmorSlot label="Legs" items={$legs} bind:item={$heroEquip.legs} />
	<ArmorSlot label="Arms" items={$gauntlets} bind:item={$heroEquip.arms} />
</div>
