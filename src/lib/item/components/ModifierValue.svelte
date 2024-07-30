<script lang="ts">
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';
	import StatusEffectIcon from '$lib/components/StatusEffectIcon.svelte';
	import { attackTypes, damageTypes, resistanceTypes, statusTypes } from '$lib/core';
	import type { ItemModifier } from '../ItemModifier';

	export let modifier: ItemModifier;

	export const stats: Record<string, { name: string }> = {
		hp: {
			name: 'Health'
		},
		fp: {
			name: 'FP'
		},
		stamina: {
			name: 'Stamina'
		},
		discovery: {
			name: 'Discovery'
		},
		weight: {
			name: 'Weight'
		},
		equipLoad: {
			name: 'Equip Load'
		}
	};
</script>

<div class="grid text-sm grid-cols-2" style="grid-template-columns: minmax(120px, auto) 1fr">
	<dt class="font-medium text-zinc-200">
		{#if modifier.group === 'attributes'}
			<AttributeBadge type={modifier.prop} />
		{:else if modifier.group === 'resistance'}
			{resistanceTypes[modifier.prop].name}
		{:else if modifier.group === 'defense'}
			{damageTypes[modifier.prop].name}
		{:else if modifier.group === 'attack'}
			{attackTypes[modifier.prop].name} Damage
		{:else if modifier.group === 'damageNegation'}
			Negate {damageTypes[modifier.prop].name}
		{:else if modifier.group === 'status'}
			<div class="flex">
				<span class="me-2"><StatusEffectIcon effect={modifier.prop} /></span>
				{statusTypes[modifier.prop].name}
			</div>
		{:else}
			{stats[modifier.prop] ? stats[modifier.prop].name : '-'}
		{/if}
	</dt>
	<dd>
		{#if modifier.type === 'percentual'}
			{#if modifier.group === 'damageNegation'}
				{#if modifier.value < 1}+{/if}{Math.round(100 - modifier.value * 100)}%
			{:else}
				{#if modifier.value >= 1}+{/if}{Math.round((modifier.value - 1) * 100 * 10) / 10}%
			{/if}
		{:else}
			{#if modifier.value >= 0}+{/if}{modifier.value}
		{/if}
	</dd>
</div>
