<script lang="ts">
	import { list } from '$lib/core';
	import { attackTypeRecord, attributeRecord, damageTypeRecord, resistanceRecord, statRecord } from '$lib/records';
	import type { ItemModifierConfig, ModifierType } from '../types';

  export let type: ModifierType = 'flat';
  export let key: string;
  export let config: ItemModifierConfig;
</script>

<div class="modifier-item">
  <dt class="text-sm font-medium leading-6 text-zinc-200 sm:col-span-3">{config.name}</dt>
  <dd>
    <dl class="sm:grid sm:grid-cols-2 sm:px-0">
    {#each list(config.modify) as stat}
      <dt class="text-sm font-medium leading-6 dark:text-zinc-500">
        {#if key === 'attributes'}
          {attributeRecord[stat.key].name}
        {:else if key === 'resistance'}
          {resistanceRecord[stat.key].name}
        {:else if key === 'defense'}
          {damageTypeRecord[stat.key].name}
        {:else if key === 'attack'}
          {attackTypeRecord[stat.key].name} Damage
        {:else}
          {statRecord[stat.key] ? statRecord[stat.key].name : '-'}
        {/if}
      </dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:mt-0">
        {#if type === 'percentual'}
          {#if stat.value >= 1}+{/if}{Math.round((stat.value - 1) * 100)}%
        {:else}
          {#if stat.value >= 0}+{/if}{stat.value}
        {/if}
      </dd>
    {/each}
    </dl>
  </dd>
</div>