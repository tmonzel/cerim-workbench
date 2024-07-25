<script lang="ts">
	import type { DynamicAttack } from '$lib/hero/DynamicAttack';
	import { attackTypeRecord } from '$lib/records';
	import ValueBadge from './ValueBadge.svelte';

	export let attack: DynamicAttack;

	$: dist = attack.getValueDistribution();
</script>

<div class="flex flex-col gap-3">
	{#each dist as d}
		<div style:width={`${d.amount * 100}%`}>
			<div style:background-color={attackTypeRecord[d.key].color} class="h-2"></div>
			<ValueBadge value={attack.value[d.key]} />
		</div>
	{/each}
</div>
