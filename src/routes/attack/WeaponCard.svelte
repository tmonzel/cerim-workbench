<script lang="ts">
	import { affinities, AffinityType, validateRequirements } from '$lib';
	import GuardGrid from './GuardGrid.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { weaponTypeInfo, type AttackItem } from '$lib/item';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { heroState } from '$lib/state';
	import WeaponInfo from './WeaponInfo.svelte';
	import AttackBadge from '$lib/attack/AttackBadge.svelte';
	import AttackDetail from '$lib/attack/AttackDetail.svelte';
	import ItemEffectList from '$lib/item/components/ItemEffectList.svelte';

	export let item: AttackItem;

	$: invalidAttributes = validateRequirements(item.requirements ?? {}, $heroState.attributes);
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
		{#if item.affinity && item.affinity !== AffinityType.STANDARD}
			<span class="font-bold me-1">{affinities[item.affinity].name}</span>
		{/if}
		{item.name}
		{#if item.tier > 0}(+{item.tier}){/if}
	</ItemHeader>

	<div class="flex items-center justify-between gap-x-12 mt-3 mb-2 text-2xl font-light">
		<AttackBadge attack={item.attack} />
		{#if item.weight > 0}
			<div class="flex items-center gap-x-1">
				<Icon name="weight" />{item.weight}
			</div>
		{/if}
	</div>

	<div class="mb-3">
		<AttackDetail attack={item.attack} />
	</div>

	<div class="mb-3">
		<WeaponInfo {item} {invalidAttributes} />
	</div>

	<ItemEffectList {item} />

	{#if item.guard}
		<div class="px-4 py-4 sm:px-0">
			<dt class="text-sm font-medium mb-2">Guard</dt>
			<dd><GuardGrid data={item.guard} /></dd>
		</div>
	{/if}
</ItemCard>
