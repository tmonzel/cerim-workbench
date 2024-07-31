<script lang="ts">
	import DamageDistBar from '$lib/components/DamageDistBar.svelte';
	import { validateRequirements } from '$lib/weapon/helpers';
	import { equipStore } from '../equip.store';
	import type { HeroState } from '../types';
	import AttackScalingInfo from './AttackScalingInfo.svelte';

	export let hero: HeroState;

	$: attributes = hero.totalAttributes;
</script>

{#if !$equipStore.mainHand && !$equipStore.offHand}
	<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center">
		<span class="mat-icon me-2">warning</span>Equip a weapon to see scaling values.
	</div>
{/if}

<div>
	{#if $equipStore.mainHand}
		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6">
				Attack<br /><span class="text-xs text-zinc-500">Mainhand</span>
			</dt>
			<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
				<div class="mb-4 font-semibold">
					{Math.round(hero.mainHandAttack.getTotal() * 10) / 10}
				</div>
				<DamageDistBar attack={hero.mainHandAttack} />
			</dd>
		</div>

		<AttackScalingInfo weapon={$equipStore.mainHand} {attributes} />

		{#if validateRequirements($equipStore.mainHand.requirements ?? {}, attributes).length > 0}
			<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
				<span class="mat-icon me-2">warning</span>
				<span>Item requirements not met. Damage penality applied (-40%).</span>
			</div>
		{/if}
	{/if}
	{#if $equipStore.offHand}
		<hr class="my-10 opacity-20" />

		<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
			<dt class="text-sm font-medium leading-6">
				Attack<br /><span class="text-xs text-zinc-500">Offhand</span>
			</dt>
			<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
				<div class="mb-2 font-semibold">
					{Math.round(hero.offHandAttack.getTotal() * 10) / 10}
				</div>
				<DamageDistBar attack={hero.offHandAttack} />
			</dd>
		</div>

		<AttackScalingInfo weapon={$equipStore.offHand} {attributes} />

		{#if validateRequirements($equipStore.offHand.requirements ?? {}, attributes).length > 0}
			<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
				<span class="mat-icon me-2">warning</span>
				<span>Item requirements not met. Damage penality applied (-40%).</span>
			</div>
		{/if}
	{/if}
</div>
