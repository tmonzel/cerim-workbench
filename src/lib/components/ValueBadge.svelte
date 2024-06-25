<script lang="ts">
	import { roundValue } from '$lib/core';
	import { AttackDamageStat, AttributeStat } from '$lib/core/stats';

  export let value: AttributeStat | AttackDamageStat | number;
  export let isModified = false;
</script>

{#if value instanceof AttackDamageStat}
  <span class:text-amber-300={isModified} class:font-semibold={isModified}>
    {roundValue(value.getTotal())}{#if isModified}^{/if}
  </span>
{:else if value instanceof AttributeStat}
  <div class="grid grid-cols-2">
    {#each Object.entries(value.getPresentAttributes()) as [t, v]}
      <div class="flex items-center">
        <span style:background-color={`var(--attr-${t})`} class="me-1 w-2.5 h-2.5 rounded"></span>
        <span>+{v}</span>
      </div>
    {/each}
  </div>
{:else if typeof value === 'number'}
  <span class:text-amber-300={isModified} class:font-semibold={isModified}>
    {Math.round(value * 100) / 100}{#if isModified}^{/if}
  </span>
{/if}
