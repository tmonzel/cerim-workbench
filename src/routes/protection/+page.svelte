<script lang="ts">
	import { ArmorType, readArmorByType } from '$lib/armor';
	import { heroEquip } from '$lib/state';
	import ArmorSlot from './ArmorSlot.svelte';

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
