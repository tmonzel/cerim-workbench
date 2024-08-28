<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import ItemUpgradeBar from '$lib/item/components/ItemUpgradeBar.svelte';
	import WeaponAffinitySelect from './WeaponAffinitySelect.svelte';
	import WeaponInfo from './WeaponInfo.svelte';
	import { writable } from 'svelte/store';
	import { affinities, AffinityType, validateRequirements } from '$lib';
	import GuardGrid from './GuardGrid.svelte';
	import { heroState } from '$lib/state';
	import { calculateAttackScaling } from '$lib/attack/scaling';
	import { weaponTypeInfo, type AttackItem } from '$lib/item';
	import AttackBadge from '$lib/attack/AttackBadge.svelte';
	import AttackDetail from '$lib/attack/AttackDetail.svelte';
	import AttackScalingInfo from '$lib/attack/AttackScalingInfo.svelte';
	import TotalDamageInfo from '$lib/attack/TotalDamageInfo.svelte';
	import ItemEffectList from '$lib/item/components/ItemEffectList.svelte';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import type { Attack } from '$lib/attack';

	export let item: AttackItem;

	const twoHanding = writable(false);
	const excludeStaminaDamage = writable(false);

	let attack: Attack;

	$: if ($excludeStaminaDamage) {
		attack = { ...item.attack, sta: 0 };
	} else {
		attack = item.attack;
	}

	$: scaledAttack = calculateAttackScaling(attack, item, $heroState.attack, $heroState.attributes, $twoHanding);
</script>

<ItemCard {item}>
	<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
		{#if item.affinity && item.affinity !== AffinityType.STANDARD}
			<span class="font-bold me-1">{affinities[item.affinity].name}</span>
		{/if}
		{item.name}
		{#if item.tier > 0}(+{item.tier}){/if}

		<svelte:fragment slot="options">
			<div class="flex justify-center gap-2">
				{#if item.affinities.size > 0}
					<WeaponAffinitySelect {item} on:update />
				{/if}
				<ItemUpgradeBar {item} on:update />
			</div>
		</svelte:fragment>
	</ItemHeader>

	<div class="flex gap-x-5 2xl:gap-x-10">
		<div class="grow">
			<div class="flex items-center justify-between gap-x-12 mt-3 mb-2 text-2xl font-light">
				<AttackBadge {attack} />
				{#if item.weight > 0}
					<div class="flex items-center gap-x-1">
						<Icon name="weight" />{item.weight}
					</div>
				{/if}
			</div>

			<div class="mb-3">
				<AttackDetail {attack} />
			</div>

			<div class="mb-3">
				<WeaponInfo {item} invalidAttributes={validateRequirements(item.requirements ?? {}, scaledAttack.attributes)} />
			</div>

			{#if scaledAttack}
				<div class="px-4 py-4 sm:px-0">
					<dt class="text-sm font-medium mb-4"></dt>
					<dd><AttackScalingInfo attack={scaledAttack} /></dd>
				</div>
			{/if}

			<div class="flex flex-col gap-x-5">
				{#if item.effects.length > 0}
					<div class="basis-1/2 px-4 py-4 sm:px-0">
						<dt class="text-sm font-medium mb-2">Effects</dt>
						<dd>
							<ItemEffectList {item} on:update />
						</dd>
					</div>
				{/if}

				{#if item.guard}
					<div class="basis-1/2 px-4 py-4 sm:px-0">
						<dt class="text-sm font-medium mb-2">Guard</dt>
						<dd><GuardGrid data={item.guard} /></dd>
					</div>
				{/if}
			</div>
		</div>

		<div class="basis-1/3 border-s border-zinc-700 px-5 2xl:px-10 min-w-44">
			<div class="sticky top-5 z-10">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Attack Power</h3>
					<p class="mt-1 text-zinc-400 hidden 2xl:inline-block">Damage output including upgrade level, affinity type and attribute scaling</p>
				</div>

				<div class="flex gap-5 mb-5">
					<CheckboxControl bind:checked={$twoHanding}>Two-Handing</CheckboxControl>
					<CheckboxControl bind:checked={$excludeStaminaDamage}>Exclude Stamina Damage</CheckboxControl>
				</div>

				<TotalDamageInfo attack={scaledAttack} />

				{#if scaledAttack.invalidAttributes.length > 0}
					<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
						<span class="mat-icon me-2">warning</span>
						<span>Item requirements not met. Damage penality applied (-40%).</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</ItemCard>
