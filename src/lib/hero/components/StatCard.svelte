<script lang="ts">
	import { statTypes } from '$lib/core';
	import { heroState } from '../state';
	import AttributeModifierGraph from './AttributeModifierGraph.svelte';

	export let name: string;
	const stat = statTypes[name];

	$: dv = $heroState.stats[name];
</script>

<article class="bg-zinc-800/30 rounded-lg p-6">
	<header class="mb-5">
		<h3 class="mb-2 font-medium">{stat.name}</h3>
		<span class="text-3xl">
			{Math.round(dv.base * 10) / 10}
		</span>
	</header>

	{#if stat.attributeScaling}
		<AttributeModifierGraph attributeType={stat.attributeScaling.type} mutations={stat.attributeScaling.mutations} />
	{/if}
</article>
