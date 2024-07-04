<script lang="ts">
  import "../app.css";
	import HeroStats from '$lib/components/HeroStats.svelte';
	import Header from '$lib/components/Header.svelte';
	import AttributePanel from '$lib/components/AttributePanel.svelte';
	import HeroModifiers from '$lib/components/HeroModifiers.svelte';
	import { loadData, type DataSchema } from '$lib/data';
	import HeroBody from '$lib/components/HeroBody.svelte';
  import { heroState } from '$lib/state';

	export let data: DataSchema;

  // TODOS
  // Implement local storage
  // Weapon Status effects: hemorrhage, frostbite,poison
  // UI: Little white gradient shine from top
  // UI: Show weapon damage types
  // UI: Scrolling Header
  // UI: Compact mode for equipslots (3 modes maybe)

  // Damage Negation => 50 + (base negation) / 2. ()

  /**
   * RITUAL SHIELD TALISMAN
   * Increases your damage negation by an amount equal to 30% of what you would receive. 
   * For example, at 0 base negation the talisman would provide 30 negation, thus reducing damage taken by 30%. 
   * At 50 base negation it provides 15 negation, thus still reducing damage taken by 30%.
Due to the above effect also taking into account negative negation, this talisman is particularly effective for 'glass cannon' builds. 
As the amount of negation directly scales with how much you already have, having negative negation can even further increase the net negation of the item.
For example, having two Scorpion Charms and Ragadon's Soreseal without armor equipped normally leaves you at -39.150% physical negation, 
but with the talisman it leaves you at a total of 2.5% negation, effectively cancelling out the debuffs and making stacking such items 
much more survivable and significantly decreasing your chances of being one-shot.
  */

  // Initial data load
  loadData(data);
</script>

<div class="p-12">
  <Header hero={$heroState} />

  <div class="flex gap-7">
    <div>
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Attributes</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Spend attribute points to level up ({data.attributePointsPerLevel})</p>
        </div>
        <AttributePanel hero={$heroState} />
      </div>
    </div>
    
    <div class="grow bg-zinc-800/20 rounded-xl p-5">
      <HeroBody hero={$heroState} />
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">What affects your stats?</p>
        </div>
        <HeroModifiers hero={$heroState} />
      </div>
    </div>

    <div class="max-w-72">
      <div class="sticky top-5">
        <div class="px-4 sm:px-0 mb-4">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">Stats</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-400/80">Calculated hero stats based on attributes, gear etc.</p>
        </div>
        <HeroStats hero={$heroState} />
      </div>
    </div>
  </div>
</div>
