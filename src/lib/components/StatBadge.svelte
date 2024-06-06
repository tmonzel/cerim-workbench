<script lang="ts">
	import { DamageStat, roundValue, type NumberStat } from '$lib/core';

  export let stat: NumberStat | DamageStat;

  $: isModified = stat.isModified();
</script>

{#if stat instanceof DamageStat}
  {@const total = stat.getTotal()}
  <span class:text-teal-500={isModified} class:font-semibold={isModified}>
    {roundValue(total.min)}-{roundValue(total.max)} ({total.avg}){#if isModified}^{/if}
  </span>
{:else}
  {@const total = stat.getTotal()}
  <span class:text-teal-500={isModified} class:font-semibold={isModified}>
    {Math.round(total * 100) / 100}{#if isModified}^{/if}
  </span>
{/if}