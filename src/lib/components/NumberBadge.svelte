<script lang="ts">
	import { roundValue, type DamageNumber, type FlatNumber, type PercentageNumber } from '$lib/core';

  export let num: FlatNumber | PercentageNumber | DamageNumber;
  export let isModified = false;
</script>

{#if num.type === 'flat'}
  <span class:text-indigo-500={isModified} class:font-bold={isModified}>{#if num.value > 0}+{/if}{Math.round(num.value * 100) / 100}</span>
{:else if num.type === 'percentual'}
  <span class:text-indigo-500={isModified} class:font-bold={isModified}>{#if num.value > 0}+{/if}{Math.round(num.value * 100)}%</span>
{:else if num.type === 'damage'}
  {@const sum = num.value[0] + num.value[1]}
  {@const avg = sum > 0 ? Math.round((sum / 2) * 100) / 100 : 0}
  <span class:text-indigo-500={isModified} class:font-bold={isModified}>
    {#if avg > 0}+{/if}{roundValue(num.value[0])}-{roundValue(num.value[1])} ({avg})
  </span>
{:else}
  -
{/if} 