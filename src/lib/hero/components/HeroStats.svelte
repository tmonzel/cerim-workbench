<script lang="ts">
	import { statRecord } from '$lib/records';
	import type { HeroState } from '$lib/hero';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import HeroWeightStatus from './HeroWeightStatus.svelte';

	export let hero: HeroState;
</script>

<div class="hero-stats-panel">
	<dl class="divide-y divide-gray-100/20">
		<!--<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-400">Attack<br><span class="text-xs">Mainhand</span></dt>
      <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
        <div class="mb-2 font-semibold">
          {Math.round(hero.attack.mainHand.getTotal() * 10) / 10}
        </div>
        <DamageDistBar attack={hero.attack.mainHand} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-400">Attack<br><span class="text-xs">Offhand</span></dt>
      <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
        <div class="mb-2 font-semibold">
          {Math.round(hero.attack.offHand.getTotal() * 10) / 10}
        </div>
        <DamageDistBar attack={hero.attack.offHand} />
      </dd>
    </div>-->
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.hp.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.hp} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.fp.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.fp} />
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.stamina.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.stamina} />
			</dd>
		</div>

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.discovery.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				{Math.floor(hero.stats.value.discovery.total * 100)}
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Poise</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.poise} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.weight.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.weight} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.equipLoad.name}</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<ValueBadge value={hero.stats.value.equipLoad} />
			</dd>
		</div>
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Weight Status</dt>
			<dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
				<HeroWeightStatus weightRatio={hero.weightRatio} />
			</dd>
		</div>
	</dl>
</div>
