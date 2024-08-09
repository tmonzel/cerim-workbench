<script lang="ts">
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';
	import StatusEffectIcon from '$lib/components/StatusEffectIcon.svelte';
	import { attackTypes, damageTypes, resistanceTypes, statusTypes } from '$lib/core';
	import { stats } from '$lib/hero';
	import type { ItemModifier } from '../ItemModifier';

	export let modifier: ItemModifier;

	$: stat = stats[modifier.prop];
</script>

<div class="grid text-sm grid-cols-2">
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
			{damageTypes[modifier.prop].name} Absorption
		{:else if modifier.group === 'status'}
			<div class="flex">
				<span class="me-2"><StatusEffectIcon effect={modifier.prop} /></span>
				{statusTypes[modifier.prop].name}
			</div>
		{:else if stat}
			{stat.name}
		{:else}
			{modifier.prop}
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
			{#if modifier.value >= 0}+{/if}{stat && stat.renderer ? stat.renderer(modifier.value) : modifier.value}
		{/if}
	</dd>
</div>
