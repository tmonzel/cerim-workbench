<script lang="ts">
	import type { ScaledAttack } from '$lib/scaling';
	import AttackScalingGraph from './AttackScalingGraph.svelte';

	export let attack: ScaledAttack;
</script>

<div class="flex flex-wrap gap-5">
	{#each Object.entries(attack.scaling) as [t, data]}
		<div>
			<AttackScalingGraph {data} attributeType={t} position={attack.attributes[t]} />
		</div>
	{/each}
</div>
