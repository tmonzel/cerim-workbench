<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { heroContexts, type HeroState } from '$lib/hero';
	import { appState } from '$lib/state';
	import AttributePanel from './AttributePanel.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroProtectionDetails from './HeroProtectionDetails.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import HeroCombatDetails from './HeroCombatDetails.svelte';
	import HeroModifiers from './HeroModifiers.svelte';

	export let hero: HeroState;
</script>

<div class="px-10 py-8">
	<Header {hero} />

	<div class="flex gap-7">
		<div>
			<div class="sticky top-5 z-10 max-w-2xl">
				<div class="px-4 sm:px-0 min-h-20">
					<h3 class="text-base font-semibold leading-7">Attributes</h3>
					<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">
						Spend attribute points to level up
					</p>
				</div>
				<AttributePanel {hero} />
			</div>
		</div>

		<div class="grow">
			<HeroBody {hero} />
		</div>

		<div class="min-w-72">
			<div class="sticky top-5">
				<div class="mb-4">
					<SelectControl options={heroContexts} bind:value={$appState.heroContext} let:item>
						<svelte:fragment slot="selected" let:item>
							<div class="p-1 text-lg">{item?.name}</div>
						</svelte:fragment>

						{item.name}
					</SelectControl>
				</div>

				<HeroModifiers {hero} />

				{#if $appState.heroContext === 'attack'}
					<HeroCombatDetails {hero} />
				{:else if $appState.heroContext === 'protect'}
					<HeroProtectionDetails {hero} />
				{/if}
			</div>
		</div>

		<!--<div class="max-w-72">
			<div class="sticky top-5">
				<div class="px-4 sm:px-0 mb-4">
					<h3 class="text-base font-semibold leading-7">Stats</h3>
					<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">
						Calculated hero stats based on attributes, gear etc.
					</p>
				</div>
				<HeroStats {hero} />
			</div>
		</div>-->
	</div>
</div>
