<script lang="ts">
	import { statTypes } from '$lib/core';
	import StatValue from '$lib/hero/components/StatValue.svelte';
	import AttributeModifierGraph from './AttributeModifierGraph.svelte';

	export let name: string;
	const stat = statTypes[name];
</script>

<article class="bg-zinc-800/30 rounded-lg p-6">
	<header class="mb-5">
		<h3 class="mb-2 font-medium">{stat.name}</h3>
		<span class="text-3xl">
			<StatValue {name} />
		</span>
	</header>

	{#if stat.attributeScaling}
		<AttributeModifierGraph attributeType={stat.attributeScaling.type} mutations={stat.attributeScaling.mutations} />
	{/if}
</article>
