<script lang="ts">
	import { DynamicAttack, DynamicAttributes, roundValue } from '$lib/core';
	import { DynamicNumber } from '$lib/core/DynamicNumber';

  export let value: DynamicNumber | DynamicAttack | DynamicAttributes;
</script>

{#if value instanceof DynamicAttack}
  <span class:text-amber-300={value.modified} class:font-semibold={value.modified}>
    {roundValue(value.getTotal())}{#if value.modified}^{/if}
  </span>
{:else if value instanceof DynamicAttributes}
  <div class="grid grid-cols-2">
    {#each Object.entries(value.getPresentValues()) as [t, v]}
      <div class="flex items-center">
        <span style:background-color={`var(--attr-${t})`} class="me-1 w-2.5 h-2.5 rounded"></span>
        <span>+{v.total}</span>
      </div>
    {/each}
  </div>
{:else if value instanceof DynamicNumber}
  {#if value.base < value.total}
  <span class="text-emerald-400 font-normal">
    {Math.round(value.total * 100) / 100}^
    <!--({#if value.multiplier > 1}+{Math.round((value.multiplier - 1) * 100)}%{/if}{#if value.offset > 0}+{value.offset}{/if})-->
  </span>
  {:else if value.base > value.total}
  <span class="text-red-400 font-normal">
    {Math.round(value.total * 100) / 100}<span class="inline-block rotate-180">^</span>
  </span>
  {:else}
  <span>
    {Math.round(value.total * 10) / 10}
  </span>
  {/if}
{/if}
