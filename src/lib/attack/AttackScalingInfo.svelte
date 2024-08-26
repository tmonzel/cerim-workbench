<script lang="ts">
	import AttackScalingGraph from './AttackScalingGraph.svelte';
	import type { ScaledAttack } from './scaling';

	export let attack: ScaledAttack;
</script>

<div class="flex flex-wrap gap-5">
	{#each Object.entries(attack.scaling) as [t, data]}
		<div>
			<AttackScalingGraph {data} attributeType={t} position={attack.attributes[t]} />
		</div>
	{/each}
</div>
