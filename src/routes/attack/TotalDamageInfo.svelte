<script lang="ts">
	import { attackTypes, calcTotal, getValueDistribution, type Attack, type AttackType } from '$lib';
	import Icon from '$lib/components/Icon.svelte';
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

<div class="text-sm leading-6 sm:mt-0 grow">
	<div class="mb-4 font-light text-3xl flex items-center">
		{Math.round(state.totalDamage * 10) / 10}
	</div>

	<div class="flex flex-col gap-3">
		{#each dist as d}
			{@const attack = state.attack[d.key]}
			{#if attack}
				<div style:width={`${d.amount * 100}%`}>
					<div style:background-color={attackTypes[d.key].color} class="h-2"></div>
					<span class="text-lg">{Math.round(calcTotal(attack) * 10) / 10}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>
