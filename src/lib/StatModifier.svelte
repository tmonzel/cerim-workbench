<script lang="ts">
	import type { StatModifier } from './types';

  export let modifier: StatModifier;
</script>

<div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
  <dt class="text-sm font-medium leading-6 text-gray-900">{modifier.affects}</dt>
  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
    {#if modifier.value > 1}+{/if}
    {#if modifier.type === 'flat'}
      {modifier.value}
    {:else}
      {Math.round((modifier.value - 1) * 100)}%
    {/if}
  </dd>
</div>