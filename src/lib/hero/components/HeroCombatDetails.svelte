<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import DamageDistBar from '$lib/components/DamageDistBar.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import type { HeroState } from '../types';

	export let hero: HeroState;
</script>

<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
	<dt class="text-sm font-medium leading-6">
		Attack<br /><span class="text-xs text-zinc-500">Mainhand</span>
	</dt>
	<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
		<div class="mb-2 font-semibold">
			{Math.round(hero.attack.mainHand.getTotal() * 10) / 10}
		</div>
		<DamageDistBar attack={hero.attack.mainHand} />
	</dd>
</div>
<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
	<dt class="text-sm font-medium leading-6">
		Attack<br /><span class="text-xs text-zinc-500">Offhand</span>
	</dt>
	<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
		<div class="mb-2 font-semibold">
			{Math.round(hero.attack.offHand.getTotal() * 10) / 10}
		</div>
		<DamageDistBar attack={hero.attack.offHand} />
	</dd>
</div>
<div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
	<dt class="text-sm font-medium leading-6 text-zinc-300">Guard</dt>
	<dd class="grid grid-cols-3 gap-4">
		<StatBadge name="Standard">
			<ValueBadge value={hero.guard.value['phy']} />
		</StatBadge>

		<StatBadge name="Stability">
			<ValueBadge value={hero.guard.value['sta']} />
		</StatBadge>

		<StatBadge name="Resistance">
			<ValueBadge value={hero.guard.value['res']} />
		</StatBadge>

		<div class="col-span-3">
			<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
			<dd class="grid grid-cols-3 gap-2">
				<AttackTypeBadge type="mag">
					<ValueBadge value={hero.guard.value['mag']} />
				</AttackTypeBadge>

				<AttackTypeBadge type="fir">
					<ValueBadge value={hero.guard.value['mag']} />
				</AttackTypeBadge>

				<AttackTypeBadge type="lit">
					<ValueBadge value={hero.guard.value['mag']} />
				</AttackTypeBadge>

				<AttackTypeBadge type="hol">
					<ValueBadge value={hero.guard.value['mag']} />
				</AttackTypeBadge>
			</dd>
		</div>
	</dd>
</div>
