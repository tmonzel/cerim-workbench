<script lang="ts">
	import { roundValue } from '$lib/core';
	import { DynamicNumber } from '$lib/core/DynamicNumber';
	import { ComplexAttributes, ComplexDamage } from '$lib/core/values';

  export let value: DynamicNumber | ComplexDamage | ComplexAttributes;
</script>

{#if value instanceof ComplexDamage}
  <span class:text-amber-300={value.modified} class:font-semibold={value.modified}>
    {roundValue(value.getTotal())}{#if value.modified}^{/if}
  </span>
{:else if value instanceof ComplexAttributes}
  <div class="grid grid-cols-2">
    {#each Object.entries(value.getPresentValues()) as [t, v]}
      <div class="flex items-center">
        <span style:background-color={`var(--attr-${t})`} class="me-1 w-2.5 h-2.5 rounded"></span>
        <span>+{v.total}</span>
      </div>
    {/each}
  </div>
{:else if value instanceof DynamicNumber}
  <span class:text-amber-300={value.modified} class:font-semibold={value.modified}>
    {Math.round(value.total * 100) / 100}{#if value.modified}^{/if}
  </span>
{/if}
