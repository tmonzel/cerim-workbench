<script lang="ts">
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';
	import { attackTypeRecord, damageTypeRecord, resistanceRecord, statRecord } from '$lib/records';
	import type { ItemModifierConfig, ModifierType } from '../types';

  export let type: ModifierType = 'flat';
  export let key: string;
  export let config: ItemModifierConfig;
</script>

<div class="modifier-item">
  <dt class="text-sm font-medium leading-6 text-zinc-200 sm:col-span-3">{config.name}</dt>
  <dd>
    <dl>
    {#each Object.entries(config.modify) as [k, v]}
      <div class="flex">
        <dt class="text-sm font-medium leading-6 dark:text-zinc-500 min-w-32">
          {#if key === 'attributes'}
          <AttributeBadge type={k} />
          {:else if key === 'resistance'}
            {resistanceRecord[k].name}
          {:else if key === 'defense'}
            {damageTypeRecord[k].name}
          {:else if key === 'attack'}
            {attackTypeRecord[k].name} Damage
          {:else if key === 'damageNegation'}
            {damageTypeRecord[k].name}
          {:else}
            {statRecord[k] ? statRecord[k].name : '-'}
          {/if}
        </dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:mt-0">
          {#if type === 'percentual'}
            {#if v >= 1}+{/if}{Math.round(((v - 1) * 100) * 10) / 10}%
          {:else}
            {#if v >= 0}+{/if}{v}
          {/if}
        </dd>
      </div>
    {/each}
    </dl>
  </dd>
</div>