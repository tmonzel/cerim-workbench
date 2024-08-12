<script lang="ts">
	import { statTypes } from '$lib/core';
	import { heroState } from '$lib/hero';
	import HeroWeightStatus from './HeroWeightStatus.svelte';
	import StatValue from './StatValue.svelte';

	$: weightRatio = ($heroState.weight * 100) / $heroState.stats.equipLoad.getTotal();
</script>

<div class="hero-stats-panel">
	<dl class="divide-y divide-gray-100/20">
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statTypes.hp.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<StatValue name="hp" />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statTypes.fp.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<StatValue name="fp" />
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statTypes.stamina.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<StatValue name="stamina" />
				(<StatValue name="staminaRecoverySpeed" />)
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statTypes.discovery.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<StatValue name="discovery" />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statTypes.equipLoad.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<StatValue name="equipLoad" />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Weight Status</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<HeroWeightStatus {weightRatio} />
			</dd>
		</div>
	</dl>
</div>
