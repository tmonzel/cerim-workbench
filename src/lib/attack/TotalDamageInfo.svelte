<script lang="ts">
	import { calcTotal, getValueDistribution } from '$lib';
	import type { ScaledAttack } from '$lib/attack/scaling';
	import { attackTypes, type Attack, type AttackType } from './types';

	export let attack: ScaledAttack;

	let dist: {
		amount: number;
		value: number;
		key: AttackType;
	}[] = [];

	$: {
		const flatAttack: Attack = {};

		for (const [t, a] of Object.entries(attack.attack)) {
			flatAttack[t as AttackType] = calcTotal(a);
		}

		dist = getValueDistribution(flatAttack);
	}
</script>

<div class="text-sm leading-6 sm:mt-0 grow">
	<div class="mb-4 text-4xl flex items-center">
		{Math.round(attack.totalDamage * 10) / 10}
	</div>

	<div class="flex flex-col gap-5">
		{#each dist as d}
			{@const atk = attack.attack[d.key]}
			{#if attack}
				<div style:width={`${d.amount * 100}%`}>
					<div style:background-color={attackTypes[d.key].color} class="h-2"></div>
					<span class="text-lg">{Math.round(calcTotal(atk) * 10) / 10}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>
