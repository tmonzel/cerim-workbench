<script lang="ts">
  import "../app.css";
	import HeroStats from '$lib/components/HeroStats.svelte';
	import { heroState } from '$lib/hero';
	import Header from '$lib/components/Header.svelte';
	import AttributePanel from '$lib/components/AttributePanel.svelte';
	import HeroModifiers from '$lib/components/HeroModifiers.svelte';
	import type { DataSchema } from '$lib/types';
	import { appState } from '$lib/state';
	import { loadData } from '$lib/data';
	import EquipPanel from '$lib/items/EquipPanel.svelte';

	export let data: DataSchema;

  // Initial data load
  loadData(data);
</script>

<div class="p-12 bg-white dark:bg-zinc-800">
  <Header />

  <hr class="my-8 opacity-30">

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
    <div class="sm:col-span-1">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Attributes</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Spend attribute points to level up ({data.attributePointsPerLevel})</p>
        </div>
        <AttributePanel bind:attributes={$appState.attributes} />
      </div>
    </div>
    
    <div class="sm:col-span-4">
      
      <EquipPanel />
    </div>

    <div class="sm:col-span-1">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">What affects your stats?</p>
        </div>
        <HeroModifiers />
      </div>
    </div>

    <div class="sm:col-span-1">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Stats</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Calculated hero stats based on attributes, gear etc.</p>
        </div>
        <HeroStats stats={$heroState.stats} />
      </div>
    </div>
  </div>
</div>
