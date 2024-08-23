<script lang="ts">
	import AttributeScalingGraph from '$lib/attribute/AttributeScalingGraph.svelte';
	import type { Hero } from '$lib/hero';
	import { statTypes } from './types';

	export let hero: Hero;
	export let name: string;

	const stat = statTypes[name];

	$: value = hero.stats[name];
</script>

<article class="bg-zinc-800/30 rounded-lg p-6">
	<header class="mb-5">
		<h3 class="mb-2 font-medium">{stat.name}</h3>
		<span class="text-3xl">
			{Math.round(value.base * 10) / 10}
		</span>
	</header>

	{#if stat.attributeScaling}
		<AttributeScalingGraph
			attributeType={stat.attributeScaling.type}
			mutations={stat.attributeScaling.mutations}
			progress={hero.attributes[stat.attributeScaling.type]}
		/>
	{/if}
</article>
