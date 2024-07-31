<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import GuardGrid from '$lib/components/GuardGrid.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ModifierList from '$lib/item/components/ModifierList.svelte';
	import type { AttackItem } from './AttackItem';
	import { weaponTypeInfo } from './weapon.type';
	import WeaponInfo from './WeaponInfo.svelte';

	export let item: AttackItem;
	export let slotted: boolean = false;
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
		{item.name}
		{#if item.tier > 0}(+{item.tier}){/if}
	</ItemHeader>

	<div class="mb-3 text-2xl">
		<AttackBadge attack={item.attack} />
	</div>

	<div class="mb-3">
		<AttackDetail attack={item.attack} />
	</div>

	<div class="mb-3">
		<WeaponInfo {item} />
	</div>

	<ModifierList data={item.modifiers} />

	{#if slotted}
		<div class="px-4 py-4 sm:px-0">
			<dt class="text-sm font-medium mb-2">Damage Negation</dt>
			<dd><GuardGrid data={item.guard} /></dd>
		</div>
	{/if}
</ItemCard>
