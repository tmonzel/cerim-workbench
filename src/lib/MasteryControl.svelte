<script lang="ts">
	import StatModifier from './StatModifier.svelte';
  import type { Mastery } from './types';

  export let mastery: Mastery;
  export let tier = 0;

  $: selectedTier = mastery.tiers[tier - 1];
</script>

<button 
  type="button" 
  class="relative block text-left min-w-48 p-3 bg-white border border-gray-200 rounded-lg shadow hover:ring-2 hover:ring-inset hover:ring-indigo-600"
  on:click={() => tier = (tier + 1 > mastery.tiers.length ? mastery.tiers.length : tier + 1)}
  on:contextmenu|preventDefault={() => tier = (tier - 1 >= 0 ? tier - 1 : 0)}>
  <h3 class="font-medium leading-7 text-gray-900">{mastery.name} ({tier})</h3> 
  <p class="mt-1 text-sm leading-6 text-gray-500">{mastery.description}</p>
  {#if selectedTier}
    <p class="italic mt-2">{selectedTier.name}</p>

    <dl class="divide-y divide-gray-100 mt-2">
      {#each selectedTier.modifiers as modifier}
      <StatModifier {modifier} />
      {/each}
    </dl>
  {/if}
</button>