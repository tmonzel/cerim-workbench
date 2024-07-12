<script lang="ts">
	import type { HeroState } from '$lib/state';
	import AttributePanel from './AttributePanel.svelte';
	import Header from './Header.svelte';
	import HeroBody from './HeroBody.svelte';
	import HeroModifiers from './HeroModifiers.svelte';
	import HeroStats from './HeroStats.svelte';

  export let hero: HeroState;
</script>
<div class="p-12">
  <Header {hero} />

  <div class="flex gap-7">
    <div>
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7 text-white">Attributes</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Spend attribute points to level up (1)</p>
        </div>
        <AttributePanel {hero} />
      </div>
    </div>
    
    <div class="grow bg-zinc-800/20 rounded-xl p-5">
      <HeroBody {hero} />
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">What affects your stats?</p>
        </div>
        <HeroModifiers {hero} />
      </div>
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Stats</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Calculated hero stats based on attributes, gear etc.</p>
        </div>
        <HeroStats {hero} />
      </div>
    </div>
  </div>
</div>