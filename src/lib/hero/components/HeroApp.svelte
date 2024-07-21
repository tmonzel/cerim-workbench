<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { HeroState } from '$lib/hero';
	import AttributePanel from './AttributePanel.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroModifiers from './HeroModifiers.svelte';
	import HeroStats from './HeroStats.svelte';

  export let hero: HeroState;
</script>
<div class="px-10 py-8">
  <Header {hero} />

  <div class="flex gap-7">
    <div>
      <div class="sticky top-5 z-10">
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7">Attributes</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Spend attribute points to level up (1)</p>
        </div>
        <AttributePanel {hero} />
      </div>
    </div>
    
    <div class="grow">
      <HeroBody {hero} />
    </div>

    <div class="max-w-72 hidden xl:block">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">What affects your stats?</p>
        </div>
        <HeroModifiers {hero} />
      </div>
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7">Stats</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Calculated hero stats based on attributes, gear etc.</p>
        </div>
        <HeroStats {hero} />
      </div>
    </div>
  </div>
</div>