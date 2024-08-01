<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import DamageDistBar from '$lib/components/DamageDistBar.svelte';
	import type { DynamicAttack } from '$lib/core';
	import type { AttackItem } from '$lib/weapon';
	import { validateRequirements } from '$lib/weapon/helpers';
	import AttackScalingInfo from './AttackScalingInfo.svelte';

	export let weapon: AttackItem;
	export let attributes: Record<string, number>;
	export let attack: DynamicAttack;
	export let twoHanding: boolean = false;
</script>

<div>
	<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
		<dt class="text-sm font-medium leading-6">
			Attack<br /><span class="text-xs text-zinc-500">Mainhand</span>
		</dt>
		<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
			<div class="mb-4 font-semibold">
				{Math.round(attack.getTotal() * 10) / 10}
			</div>
			<DamageDistBar {attack} />
		</dd>
	</div>

	<div class="flex">
		<CheckboxControl bind:checked={twoHanding}>Two-Handing</CheckboxControl>
	</div>

	<AttackScalingInfo {weapon} {attributes} />

	{#if validateRequirements(weapon.requirements ?? {}, attributes).length > 0}
		<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center mt-5">
			<span class="mat-icon me-2">warning</span>
			<span>Item requirements not met. Damage penality applied (-40%).</span>
		</div>
	{/if}
</div>
