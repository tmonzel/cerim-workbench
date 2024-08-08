<script lang="ts">
	import StatValue from '$lib/components/StatValue.svelte';
	import type { HeroStat } from '../types';
	import AttributeModifierGraph from './AttributeModifierGraph.svelte';

	export let stat: HeroStat;
</script>

<article class="bg-zinc-800/50 rounded-lg p-6">
	<header class="mb-5">
		<h3 class="mb-2 font-medium">{stat.label}</h3>
		<span class="text-3xl">
			<StatValue value={stat} />
		</span>
	</header>

	{#if stat.attributeScaling}
		<AttributeModifierGraph attributeType={stat.attributeScaling.type} mutations={stat.attributeScaling.mutations} />
	{/if}
</article>
