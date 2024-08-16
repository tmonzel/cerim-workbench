<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import { AttackType, attackTypes, calcTotal, getValueDistribution, type Attack } from '$lib/core';
	import { heroAttack } from '$lib/state';
	import type { AttackState } from '../attack.state';
	import AttackScalingGraph from './AttackScalingGraph.svelte';

	export let state: AttackState;
	export let twoHanding: boolean = false;

	const flatAttack: Attack = {};

	for (const [t, a] of Object.entries(state.attack)) {
		flatAttack[t as AttackType] = calcTotal(a);
	}

	$: dist = getValueDistribution(flatAttack);
</script>

<div>
	<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
		<dt class="text-sm font-medium leading-6">
			Total<br /><span class="text-xs text-zinc-500">{$heroAttack.activeHand}</span>
		</dt>
		<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
			<div class="mb-4 font-medium text-xl">
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
		</dd>
	</div>

	<div class="flex">
		<CheckboxControl bind:checked={twoHanding}>Two-Handing</CheckboxControl>
	</div>

	<div class="mt-5 flex flex-wrap gap-5">
		{#each Object.entries(state.scaling) as [t, data]}
			<div>
				<AttackScalingGraph {data} attributeType={t} position={state.attributes[t]} />
			</div>
		{/each}
	</div>

	{#if state.invalidAttributes.length > 0}
		<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
			<span class="mat-icon me-2">warning</span>
			<span>Item requirements not met. Damage penality applied (-40%).</span>
		</div>
	{/if}
</div>
