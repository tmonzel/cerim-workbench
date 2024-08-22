<script lang="ts">
	import { AttackType, calcTotal, getValueDistribution, type Attack } from '$lib/core';
	import AttackScalingGraph from '$lib/hero/components/AttackScalingGraph.svelte';
	import type { AttackState } from '$lib/weapon';

	export let state: AttackState;

	let dist: {
		amount: number;
		value: number;
		key: AttackType;
	}[] = [];

	$: {
		const flatAttack: Attack = {};

		for (const [t, a] of Object.entries(state.attack)) {
			flatAttack[t as AttackType] = calcTotal(a);
		}

		dist = getValueDistribution(flatAttack);
	}
</script>

<div class="flex flex-wrap gap-5">
	{#each Object.entries(state.scaling) as [t, data]}
		<div>
			<AttackScalingGraph {data} attributeType={t} position={state.attributes[t]} />
		</div>
	{/each}
</div>
