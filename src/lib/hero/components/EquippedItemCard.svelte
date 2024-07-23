<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import DamageScalingChart from '$lib/components/DamageScalingChart.svelte';
	import { sum } from '$lib/core';
	import { AffinityType, AttributeType } from '$lib/core/types';
	import { affinityRecord, itemTypeRecord } from '$lib/records';
	import type { Item } from '$lib/item/Item';
	import ItemDamageNegationGrid from '$lib/item/components/ItemDamageNegationGrid.svelte';
	import ItemGuardGrid from '$lib/item/components/ItemGuardGrid.svelte';
	import ItemResistanceGrid from '$lib/item/components/ItemResistanceGrid.svelte';
	import ItemModifierList from '$lib/item/components/ItemModifierList.svelte';
	import ItemInfo from '$lib/item/components/ItemInfo.svelte';
	import { AttackItem } from '$lib/item/AttackItem';
	import ItemRarityBadge from '$lib/item/components/ItemRarityBadge.svelte';
	import { getContext } from 'svelte';
	import type { HeroBodyState } from '../types';
	import type { Readable } from 'svelte/store';

	export let item: Item;

	const bodyState = getContext<Readable<HeroBodyState>>('bodyState');

	let totalDamageNegation: number;

	$: {
		if (item.damageNegation) {
			totalDamageNegation =
				Math.round(sum({ ...item.damageNegation, ...item.damageNegation }) * 10) / 10;
		}
	}
</script>

<div class="flex gap-x-10">
	{#if item.iconUrl}
		<div class="flex justify-center px-5">
			<div>
				<img
					src={item.iconUrl}
					alt="Item icon"
					class="transition-all group-hover:brightness-150 w-full"
				/>
			</div>
		</div>
	{/if}

	<div class="grow">
		<div class="mb-1">
			<ItemRarityBadge rarity={item.rarity} />
		</div>
		<div class="font-medium text-lg">
			{#if item instanceof AttackItem && item.affinity && item.affinity !== AffinityType.STANDARD}
				<span class="font-bold">{affinityRecord[item.affinity].name}</span>
			{/if}
			{item.name}
			{#if item.tier > 0}(+{item.tier}){/if}
		</div>
		<p class="text-sm text-zinc-400">{itemTypeRecord[item.type].name}</p>

		<div class="flex items-center gap-x-12 mt-3 mb-2">
			{#if item instanceof AttackItem && item.scaledAttack}
				<p class="grow text-xl flex gap-2">
					<AttackBadge attack={item.scaledAttack} />
				</p>
			{/if}

			{#if totalDamageNegation}
				<p class="text-xl font-light flex items-center gap-x-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#ddd"
					>
						<path
							d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"
						/>
					</svg>
					{totalDamageNegation}
				</p>
			{/if}

			{#if item.poise}
				<p class="text-xl font-light flex items-center gap-x-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#ddd"
						><path
							d="M480-40q-186 0-313-69.5T40-280q0-69 64-126.5T280-494v82q-73 23-116.5 59T120-280q0 64 108 112t252 48q144 0 252-48t108-112q0-37-43.5-73T680-412v-82q112 30 176 87.5T920-280q0 101-127 170.5T480-40ZM360-200v-440H160v-80h640v80H600v440h-80v-200h-80v200h-80Zm120-560q-33 0-56.5-23.5T400-840q0-33 23.5-56.5T480-920q33 0 56.5 23.5T560-840q0 33-23.5 56.5T480-760Z"
						/></svg
					>
					{item.poise}
				</p>
			{/if}

			{#if item.weight > 0}
				<p class="text-xl font-light flex items-center gap-x-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#ddd"
					>
						<path
							d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"
						/>
					</svg>
					{item.weight}
				</p>
			{/if}
		</div>

		{#if item instanceof AttackItem && item.scaledAttack}
			<div class="mb-3">
				<AttackDetail attack={item.scaledAttack} base={item.attack} />
			</div>
		{/if}

		<ItemInfo {item} invalidAttributes={item.invalidAttributes} />

		{#if item instanceof AttackItem && item.scaling && $bodyState.scalingInfo}
			<div class="mt-5 flex flex-wrap gap-x-5">
				{#if item.scaling.str}
					<DamageScalingChart {item} attributeType={AttributeType.STRENGTH} />
				{/if}

				{#if item.scaling.dex}
					<DamageScalingChart {item} attributeType={AttributeType.DEXTERITY} />
				{/if}

				{#if item.scaling.int}
					<DamageScalingChart {item} attributeType={AttributeType.INTELLIGENCE} />
				{/if}

				{#if item.scaling.fth}
					<DamageScalingChart {item} attributeType={AttributeType.FAITH} />
				{/if}

				{#if item.scaling.arc}
					<DamageScalingChart {item} attributeType={AttributeType.ARCANE} />
				{/if}
			</div>
		{/if}

		<dl class="divide-y divide-gray-100/20 my-3">
			{#if item.resistance}
				<div class="px-4 py-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-zinc-300 mb-2">Resistance</dt>
					<dd><ItemResistanceGrid resistance={item.resistance} /></dd>
				</div>
			{/if}

			{#if item.damageNegation}
				<div class="px-4 py-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-zinc-300 mb-2">Damage Negation</dt>
					<dd><ItemDamageNegationGrid damageNegation={item.damageNegation} /></dd>
				</div>
			{/if}

			{#if item instanceof AttackItem && $bodyState.guardInfo}
				<div class="px-4 py-4 sm:grid sm:gap-2 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-zinc-300">Guard</dt>
					<dd><ItemGuardGrid guard={item.guard} /></dd>
				</div>
			{/if}
		</dl>

		<ItemModifierList data={item.modifiers} />

		{#if item.effects}
			<p class="text-sm font-medium">Effects</p>
			{#each item.effects as effect}
				<p class="mt-1 text-gray-500 text-sm font-medium">{effect}</p>
			{/each}
		{/if}

		{#if item.description}
			<p class="mt-1 text-gray-500 italic">{item.description}</p>
		{/if}
	</div>
</div>
