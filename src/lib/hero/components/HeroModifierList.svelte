<script lang="ts">
	import type { DynamicNumber } from '$lib/core';
	import { attackTypeRecord, damageTypeRecord, resistanceRecord, statRecord } from '$lib/records';

  export let type: 'stats' | 'resistance' | 'damageNegation' | 'attack';
  export let modifications: { key: string; value: DynamicNumber }[] = [];

  let defs: Record<string, { name: string }>;
  let label = '';

  switch(type) {
    case 'stats':
      defs = statRecord;
      label = 'Stats';
      break;
    case 'resistance':
      label = 'Resistance';
      defs = resistanceRecord;
      break;
    case 'attack':
      label = 'Attack';
      defs = attackTypeRecord;
      break;
    case 'damageNegation':
      label = 'Damage Negation'
      defs = damageTypeRecord;
  }
</script>

<div class="mb-2">
  <h3 class="text-sm text-zinc-200">
    {label}
  </h3>
  <dl class="divide-y divide-gray-100/20">
    {#each modifications as mod}
      {@const value = mod.value}
  
      {#if value.offset > 0}
        <div class="py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6">{defs[mod.key].name}</dt>
          <dd class="mt-1 text-sm font-bold leading-6 sm:col-span-1 sm:mt-0">
            +{value.offset}
          </dd>
        </div>
      {/if}
  
      {#if value.multiplier !== 1}
        <div class="py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6">{defs[mod.key].name}</dt>
          <dd class="mt-1 text-sm font-bold leading-6 sm:col-span-1 sm:mt-0">
            {#if type === 'damageNegation'}
              {#if value.multiplier < 0}+{/if}{Math.round((1 - value.multiplier) * 100)}%
            {:else}
              {@const percentage = value.multiplier - 1}
              {#if percentage > 0}+{/if}{Math.round(percentage * 100)}%
            {/if}
          </dd>
        </div>
      {/if}
  
      {#if value.totalMultiplier !== 1}
        {@const percentage = value.totalMultiplier - 1}
        <div class="py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6">Total {defs[mod.key].name}</dt>
          <dd class="mt-1 text-sm font-bold leading-6 sm:col-span-1 sm:mt-0">
            {#if percentage > 0}+{/if}{Math.round(percentage * 100)}%
          </dd>
        </div>
      {/if}
    {/each}
  </dl>
</div>