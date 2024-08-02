<script lang="ts">
	import ContextNav from '$lib/components/ContextNav.svelte';
	import Header from '$lib/components/Header.svelte';
	import { attackInfoState, combatStore, type HeroState } from '$lib/hero';
	import { appStore } from '$lib/state';
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
			<div class="mb-5">
				<ContextNav />
			</div>

			<HeroBody />
		</div>

		{#if $appStore.heroContext === 'attack'}
			<div class="max-w-80">
				<div class="sticky top-5">
					<div class="mb-10">
						<h3 class="font-semibold text-lg">Attack Scaling</h3>
						<p class="mt-1 text-zinc-400">Calculated attack scaling based on chosen attributes</p>
					</div>

					{#if !$attackInfoState.mainHand && !$attackInfoState.offHand}
						<div class="bg-rose-900/20 text-rose-400 p-3 rounded-lg flex items-center">
							<span class="mat-icon me-2">warning</span>Equip a weapon to see scaling values.
						</div>
					{/if}

					{#if $attackInfoState.mainHand}
						<AttackPanel
							{...$attackInfoState.mainHand}
							bind:twoHanding={$combatStore.mainHand.twoHanding}
							caption="Mainhand"
						/>
					{/if}

					{#if $attackInfoState.offHand}
						<AttackPanel
							{...$attackInfoState.offHand}
							bind:twoHanding={$combatStore.offHand.twoHanding}
							caption="Offhand"
						/>
					{/if}
				</div>
			</div>
		{/if}

		{#if $appStore.heroContext === 'protection' || $appStore.heroContext === 'accessories'}
			<div class="min-w-80">
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
