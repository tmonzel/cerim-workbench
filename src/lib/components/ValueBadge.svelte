<script lang="ts">
	import { FlatDamage, FlatResistance, FlatStat, roundValue } from '$lib/core';
	import { DamageType } from '$lib/types';

  export let value: FlatDamage | FlatResistance | number;
  export let isModified = false;
</script>

{#if value instanceof FlatDamage}
  <span class:text-yellow-300={isModified} class:font-semibold={isModified}>
    {roundValue(value.min)}-{roundValue(value.max)} ({value.avg}){#if isModified}^{/if}
  </span>
{:else if value instanceof FlatResistance}
  {@const resist = value.value}
  <span class="flex gap-2">
    {#if resist[DamageType.PHYSICAL] > 0}
    <div class="flex flex-col">
      <div class="bg-zinc-500 h-1"></div>
      <span>{resist[DamageType.PHYSICAL]}</span> 
    </div> 
    {/if}

    {#if resist[DamageType.FIRE] > 0}
    <div class="flex flex-col">
      <div class="bg-rose-500 h-1"></div>
      <span>{resist[DamageType.FIRE]}</span> 
    </div>
    {/if}

    {#if resist[DamageType.COLD] > 0}
    <div class="flex flex-col">
      <div class="bg-indigo-500 h-1"></div>
      <span>{resist[DamageType.COLD]}</span> 
    </div> 
    {/if}

    {#if resist[DamageType.LIGHTNING] > 0}
    <div class="flex flex-col">
      <div class="bg-yellow-500 h-1"></div>
      <span>{resist[DamageType.LIGHTNING]}</span> 
    </div>  
    {/if}

    {#if resist[DamageType.POISON] > 0}
    <div class="flex flex-col">
      <div class="bg-emerald-500 h-1"></div>
      <span>{resist[DamageType.POISON]}</span> 
    </div> 
    {/if}
  </span>
{:else if typeof value === 'number'}
  <span class:text-yellow-300={isModified} class:font-semibold={isModified}>
    {Math.round(value * 100) / 100}{#if isModified}^{/if}
  </span>
{/if}
