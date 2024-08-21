<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { AttackType, attackTypes, calcTotal, getValueDistribution, type Attack } from '$lib/core';
	import AttackScalingGraph from '$lib/hero/components/AttackScalingGraph.svelte';
	import type { AttackState } from '$lib/weapon';

	export let state: AttackState;
	export let twoHanding: boolean = false;

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

<div class="rounded-lg">
	<div class="py-3 flex gap-5">
		<div class="text-sm font-medium leading-6">
			<div class="mt-5 flex flex-wrap gap-5">
				{#each Object.entries(state.scaling) as [t, data]}
					<div>
						<AttackScalingGraph {data} attributeType={t} position={state.attributes[t]} />
					</div>
				{/each}
			</div>
		</div>
		<div class="flex items-center text-4xl text-zinc-500">
			<Icon name="chevron_right" />
		</div>
		<div class="mt-1 text-sm leading-6 sm:mt-0 grow">
			<div class="mb-4 font-light text-2xl">
				{Math.round(state.totalDamage * 10) / 10}
			</div>

			<div class="flex flex-col gap-3">
				{#each dist as d}
					{@const attack = state.attack[d.key]}
					{#if attack}
						<div style:width={`${d.amount * 100}%`}>
							<div style:background-color={attackTypes[d.key].color} class="h-2"></div>
							{Math.round(calcTotal(attack) * 10) / 10}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<div class="flex">
		<!--<CheckboxControl bind:checked={twoHanding}>Two-Handing</CheckboxControl>-->
	</div>

	{#if state.invalidAttributes.length > 0}
		<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
			<span class="mat-icon me-2">warning</span>
			<span>Item requirements not met. Damage penality applied (-40%).</span>
		</div>
	{/if}
</div>
