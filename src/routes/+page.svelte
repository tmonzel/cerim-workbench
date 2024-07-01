<script lang="ts">
  import "../app.css";
	import HeroStats from '$lib/components/HeroStats.svelte';
	import Header from '$lib/components/Header.svelte';
	import AttributePanel from '$lib/components/AttributePanel.svelte';
	import HeroModifiers from '$lib/components/HeroModifiers.svelte';
	import { loadData, type DataSchema } from '$lib/data';
	import EquipPanel from '$lib/components/EquipPanel.svelte';
	import { attributeState, equipState } from '$lib/state';

	export let data: DataSchema;

  // TODOS
  // Implement local storage
  // Weapon Status effects: hemorrhage, frostbite,poison
  // UI: Little white gradient shine from top
  // UI: Show weapon damage types
  // UI: Scrolling Header
  // UI: Compact mode for equipslots (3 modes maybe)

  // Initial data load
  loadData(data);
</script>

<div class="p-12">
  <Header />

  <div class="flex gap-7">
    <div class="flex-auto">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Attributes</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Spend attribute points to level up ({data.attributePointsPerLevel})</p>
        </div>
        <AttributePanel state={$attributeState} />
      </div>
    </div>
    
    <div class="grow">
      <EquipPanel body={$equipState} />
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">What affects your stats?</p>
        </div>
        <HeroModifiers />
      </div>
    </div>

    <div class="flex-auto">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Stats</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Calculated hero stats based on attributes, gear etc.</p>
        </div>
        <HeroStats />
      </div>
    </div>
  </div>
</div>
