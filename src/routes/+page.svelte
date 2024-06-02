<script lang="ts">
  import "../app.css";
	import { dataStore } from '$lib/data.store';
	import EquipPanel from '$lib/equip/EquipPanel.svelte';
	import HeroStats from '$lib/components/HeroStats.svelte';
	import { heroState } from '$lib/hero';
	import Header from '$lib/components/Header.svelte';
	import AttributePanel from '$lib/components/AttributePanel.svelte';
	import { attributeStore } from '$lib/attribute.store';
	import HeroModifiers from '$lib/components/HeroModifiers.svelte';
	import type { DataSchema } from '$lib/types';

	export let data: DataSchema;

  // Initial data load
  dataStore.load(data);

  /*
    E: 0 - 24
    D: 25 - 59
    C: 60 - 89
    B: 90 - 139
    A: 140 - 174
    S: 175+

    "rgba(255, 0, 0, 0.6)",
        "rgba(255, 48, 0, 0.6)",
        "rgba(255, 102, 0, 0.6)",
        "rgba(255, 154, 0, 0.6)",
        "rgba(255, 205, 0, 0.6)",
        "rgba(255, 255, 0, 0.6)",
        "rgba(203, 255, 0, 0.6)",
        "rgba(150, 255, 0, 0.6)",
        "rgba(94, 255, 0, 0.6)",
        "rgba(0, 255, 0, 0.6)"
  */
</script>

<div class="p-12">
  <Header />

  <hr class="my-8">

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Attributes</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Spend attribute points to level up ({data.attributePointsPerLevel})</p>
      </div>
      <AttributePanel bind:state={$attributeStore} />
    </div>
    
    <div class="sm:col-span-3">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Gear</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Choose your equipment</p>
      </div>
      <EquipPanel />
    </div>

    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Modifiers</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">What affects your stats?</p>
      </div>
      <HeroModifiers />
    </div>

    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Stats</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Calculated hero stats based on attributes, gear etc.</p>
      </div>
      <HeroStats state={$heroState} />
    </div>
  </div>
</div>
