<script lang="ts">
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Header from '$lib/components/Header.svelte';
	import { type HeroState } from '$lib/hero';
	import { appState } from '$lib/state';
	import AttackPanel from './AttackPanel.svelte';
	import AttributePanel from './AttributePanel.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroStats from './HeroStats.svelte';
	import ProtectionPanel from './ProtectionPanel.svelte';

	export let hero: HeroState;
</script>

<div class="px-12 py-12">
	<Header {hero} />

	<div class="flex gap-14">
		<div class="min-w-56">
			<div class="sticky top-5 z-10">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Attributes</h3>
					<p class="mt-1 text-zinc-400">Distribute all your attribute points</p>
				</div>
				<AttributePanel {hero} />
			</div>
		</div>

		<div class="grow">
			{#if $appState.heroContext === 'attack'}
				<div class="flex justify-between mb-10">
					<div>
						<h3 class="font-semibold text-lg">Weapons</h3>
						<p class="mt-1 text-zinc-400">Equip your desired weapons, upgrade and compare attack scalings</p>
					</div>

					<div class="my-5 flex justify-end gap-5">
						<CheckboxControl>Guard Info</CheckboxControl>
						<CheckboxControl>Scaling Info</CheckboxControl>
						<div class="max-w-44">
							<CheckboxControl bind:checked={$appState.excludeStaminaFromAttackCalc}>
								Exclude Stamina from total attack damage
							</CheckboxControl>
						</div>
					</div>
				</div>
			{:else if $appState.heroContext === 'protection'}
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Armor</h3>
					<p class="mt-1 text-zinc-400">Dress yourself</p>
				</div>
			{:else if $appState.heroContext === 'accessories'}
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Accessories</h3>
					<p class="mt-1 text-zinc-400">Greater runes and talismans</p>
				</div>
			{/if}
			<HeroBody />
		</div>

		{#if $appState.heroContext === 'attack'}
			<div class="max-w-96">
				<div class="sticky top-5">
					<div class="mb-10">
						<h3 class="font-semibold text-lg">Attack Scaling</h3>
						<p class="mt-1 text-zinc-400">Calculated attack scaling based on chosen attributes</p>
					</div>
					<AttackPanel {hero} />
				</div>
			</div>
		{/if}

		{#if $appState.heroContext === 'protection'}
			<div class="min-w-96">
				<div class="sticky top-5">
					<div class="mb-10">
						<h3 class="font-semibold text-lg">Protection</h3>
						<p class="mt-1 text-zinc-400">Defensive state</p>
					</div>
					<ProtectionPanel {hero} />
				</div>
			</div>
		{/if}

		<div class="max-w-60">
			<div class="sticky top-5">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Stats</h3>
					<p class="mt-1 text-zinc-400">Calculated hero stats based on attributes, gear etc.</p>
				</div>
				<HeroStats {hero} />
			</div>
		</div>
	</div>
</div>
