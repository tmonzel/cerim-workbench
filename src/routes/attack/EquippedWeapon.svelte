<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { heroState } from '$lib/hero';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';
	import { affinities, AffinityType, calculateAttackScaling, weaponTypeInfo, type AttackItem } from '$lib/weapon';
	import { createEventDispatcher } from 'svelte';
	import AttackScalingInfo from './AttackScalingInfo.svelte';
	import WeaponAffinitySelect from './WeaponAffinitySelect.svelte';
	import WeaponInfo from './WeaponInfo.svelte';

	export let item: AttackItem;

	const dispatch = createEventDispatcher();

	function updateItem(item: AttackItem) {
		item = item;
		dispatch('update', item);
	}

	$: attackScaling = calculateAttackScaling(item, $heroState.attack, $heroState.attributes, false);
</script>

<article class="flex gap-x-4 px-5 pb-5">
	<ItemChangeButton {item} />

	<div class="grow">
		<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
			{#if item.affinity && item.affinity !== AffinityType.STANDARD}
				<span class="font-bold me-1">{affinities[item.affinity].name}</span>
			{/if}
			{item.name}
			{#if item.tier > 0}(+{item.tier}){/if}

			<svelte:fragment slot="options">
				<div class="flex justify-center gap-2">
					{#if item.affinities.size > 0}
						<WeaponAffinitySelect {item} on:update={(e) => updateItem(e.detail)} />
					{/if}
					<ItemUpgradeBar {item} on:update={(e) => updateItem(e.detail)} />
				</div>
			</svelte:fragment>
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

		{#if attackScaling}
			<div class="px-4 py-4 sm:px-0">
				<dt class="text-sm font-medium">Attack Scaling</dt>
				<dd><AttackScalingInfo state={attackScaling} /></dd>
			</div>
		{/if}

		{#if item.guard}
			<!--<div class="px-4 py-4 sm:px-0">
					<dt class="text-sm font-medium mb-2">Guard</dt>
					<dd><GuardGrid data={item.guard} /></dd>
				</div>-->
		{/if}
	</div>
</article>
