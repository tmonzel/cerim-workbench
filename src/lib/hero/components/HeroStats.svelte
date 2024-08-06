<script lang="ts">
	import { heroState } from '$lib/hero';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import HeroWeightStatus from './HeroWeightStatus.svelte';
</script>

<div class="hero-stats-panel">
	<dl class="divide-y divide-gray-100/20">
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Health</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={$heroState.stats.value.hp} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">FP</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={$heroState.stats.value.fp} />
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Stamina</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={$heroState.stats.value.stamina} />
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Discovery</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				{Math.floor($heroState.stats.value.discovery.total)}
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Weight</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={$heroState.stats.value.weight} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Equip Load</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={$heroState.stats.value.equipLoad} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Weight Status</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<HeroWeightStatus weightRatio={$heroState.weightRatio} />
			</dd>
		</div>
	</dl>
</div>
