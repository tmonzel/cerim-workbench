<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import Header from '$lib/components/Header.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import { heroContexts, type HeroState } from '$lib/hero';
	import { appState } from '$lib/state';
	import AttributePanel from './AttributePanel.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroStats from './HeroStats.svelte';
	import HeroProtectionDetails from './HeroProtectionDetails.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';

	export let hero: HeroState;
</script>

<div class="px-10 py-8">
	<Header {hero} />

	<div class="flex gap-7">
		<div>
			<div class="sticky top-5 z-10">
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
				<SelectControl options={heroContexts} bind:value={$appState.heroContext} let:item>
					<svelte:fragment slot="selected" let:item>
						<div class="p-1 text-lg">{item?.name}</div>
					</svelte:fragment>

					{item.name}
				</SelectControl>

				{#if $appState.heroContext === 'attack'}
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
				{:else if $appState.heroContext === 'protect'}
					<HeroProtectionDetails {hero} />
				{/if}
			</div>
		</div>

		<!--<div class="max-w-72 hidden xl:block">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">What affects your stats?</p>
        </div>
        <HeroModifiers {hero} />
      </div>
    </div>-->

		<div class="max-w-72">
			<div class="sticky top-5">
				<div class="px-4 sm:px-0 mb-4">
					<h3 class="text-base font-semibold leading-7">Stats</h3>
					<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">
						Calculated hero stats based on attributes, gear etc.
					</p>
				</div>
				<HeroStats {hero} />
			</div>
		</div>
	</div>
</div>
