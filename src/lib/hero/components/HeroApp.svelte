<script lang="ts">
	import ContextNav from '$lib/components/ContextNav.svelte';
	import Header from '$lib/components/Header.svelte';
	import TabPanel from '$lib/components/TabPanel.svelte';
	import { attackInfoState, combatStore, type HeroState } from '$lib/hero';
	import AttackPanel from './AttackPanel.svelte';
	import AttributePanel from './AttributePanel.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroStats from './HeroStats.svelte';
	import ProtectionStats from './ProtectionStats.svelte';

	export let hero: HeroState;

	const statTabs = [
		{
			label: 'General',
			component: HeroStats
		},

		{
			label: 'Protection',
			component: ProtectionStats
		}
	];
</script>

<div class="px-12 py-12">
	<Header {hero} />

	<div class="flex gap-10">
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
			<div class="mb-5">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Equipment</h3>
					<p class="mt-1 text-zinc-400">Choose your weapons, armors and accessories</p>
				</div>
				<ContextNav />
			</div>

			<HeroBody />
		</div>

		<div class="max-w-80">
			<div class="sticky top-5">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Attack Scaling</h3>
					<p class="mt-1 text-zinc-400">Calculated attack scaling based on chosen attributes</p>
				</div>

				{#if $attackInfoState}
					<AttackPanel {...$attackInfoState} />
				{:else}
					<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center">
						<span class="mat-icon me-2">warning</span>Equip a weapon to see scaling values.
					</div>
				{/if}
			</div>
		</div>

		<div class="max-w-72">
			<div class="sticky top-5">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Stats</h3>
					<p class="mt-1 text-zinc-400">Calculated hero stats based on attributes, gear etc.</p>
				</div>
				<TabPanel items={statTabs} />
			</div>
		</div>
	</div>
</div>
