<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import Button from '$lib/components/Button.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import GuardGrid from '$lib/components/GuardGrid.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { heroState } from '$lib/hero';
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { affinities, AffinityType } from './affinity';
	import type { AttackItem } from './AttackItem';
	import AttackScalingInfo from './AttackScalingInfo.svelte';
	import { calculateAttackScaling } from './scaling';
	import { weaponTypeInfo } from './weapon.type';
	import WeaponAffinitySelect from './WeaponAffinitySelect.svelte';
	import WeaponInfo from './WeaponInfo.svelte';

	export let item: AttackItem;

	function updateItem(item: AttackItem) {
		item = item;
	}

	$: attackScaling = calculateAttackScaling(item, $heroState.attack, $heroState.attributes, false);
</script>

<!--<div class="absolute top-3 left-0 right-0 items-center justify-center hidden gap-x-5 text-lg group-hover:flex">
	{#if item.possibleUpgrades > 0}
		<ItemUpgradeBar bind:item />
	{/if}
	{#if item.affinities.size > 0}
		<WeaponAffinitySelect bind:item />
	{/if}
</div>-->
<div class="flex mt-7 gap-x-4">
	<ItemChangeButton {item} />

	<div class="grow">
		<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
			{#if item.affinity && item.affinity !== AffinityType.STANDARD}<span class="font-bold">{affinities[item.affinity].name}</span>{/if}
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
			<WeaponInfo {item} />
		</div>

		{#if attackScaling}
			<div class="px-4 py-4 sm:px-0">
				<dt class="text-sm font-medium mb-2 border-b pb-2 border-zinc-700">Attack Scaling</dt>
				<dd><AttackScalingInfo state={attackScaling} /></dd>
			</div>
		{/if}

		<ul>
			{#each item.effects as effect}
				<li class="flex gap-x-5">
					<div class="grow">
						<ItemEffectBadge {effect} />
					</div>
					{#if effect.target !== 'enemy'}
						<div class="pt-2">
							<CheckboxControl bind:checked={effect.activated} on:checked={() => updateItem(item)} />
						</div>
					{/if}
				</li>
			{/each}
		</ul>

		{#if item.guard}
			<!--<div class="px-4 py-4 sm:px-0">
				<dt class="text-sm font-medium mb-2">Guard</dt>
				<dd><GuardGrid data={item.guard} /></dd>
			</div>-->
		{/if}
	</div>
</div>
