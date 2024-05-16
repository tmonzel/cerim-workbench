<script lang="ts">
	import type { Mastery } from './types';

  export let mastery: Mastery;
  export let tier = 0;
</script>

<button 
  type="button" 
  class="relative block text-left min-w-48 p-6 bg-white border border-gray-200 rounded-md shadow hover:ring-2 hover:ring-inset hover:ring-indigo-600"
  on:click={() => tier = (tier + 1 > mastery.tiers.length ? mastery.tiers.length : tier + 1)}
  on:contextmenu|preventDefault={() => tier = (tier - 1 >= 0 ? tier - 1 : 0)}>
  <h3 class="text-base font-semibold leading-7 text-gray-900">{mastery.name} ({tier})</h3> 
  <p class="mt-1 text-sm leading-6 text-gray-500">{mastery.description}</p>
</button>