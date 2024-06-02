<script lang="ts">
	import { PercentualAffix } from './affixes/PercentualAffix';
	import type { ItemAffix } from './types';

  export let affix: ItemAffix<number>;
</script>

<div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
  <dt class="text-sm font-medium leading-6 text-gray-900">{affix.name}({affix.tier})</dt>
  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
    {#if affix instanceof PercentualAffix}
      {$affix > 0 ? '+' + Math.round($affix * 100) : Math.round($affix * 100)}%
    {:else}
      {$affix > 0 ? '+' + $affix : $affix}
    {/if}
  </dd>
</div>