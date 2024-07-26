<script lang="ts">
	import { AttributeType } from '$lib/core';
	import type { AttackItem } from '$lib/item';
	import DamageScalingChart from './DamageScalingChart.svelte';

	export let weapon: AttackItem;
	export let attributes: Record<string, number>;
</script>

<div class="mt-5 flex flex-wrap gap-5">
	{#if weapon.scaling.str}
		<DamageScalingChart {attributes} item={weapon} attributeType={AttributeType.STRENGTH} />
	{/if}

	{#if weapon.scaling.dex}
		<DamageScalingChart {attributes} item={weapon} attributeType={AttributeType.DEXTERITY} />
	{/if}

	{#if weapon.scaling.int}
		<DamageScalingChart {attributes} item={weapon} attributeType={AttributeType.INTELLIGENCE} />
	{/if}

	{#if weapon.scaling.fth}
		<DamageScalingChart {attributes} item={weapon} attributeType={AttributeType.FAITH} />
	{/if}

	{#if weapon.scaling.arc}
		<DamageScalingChart {attributes} item={weapon} attributeType={AttributeType.ARCANE} />
	{/if}
</div>
