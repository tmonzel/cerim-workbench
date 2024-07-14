<script lang="ts">
	import { type HeroState } from '../types';
	import { DynamicNumber } from '$lib/core';
	import { statRecord } from '$lib/records';
	import type { StatType } from '$lib/core/types';

  export let hero: HeroState;

  let modifiedStats: { type: StatType; value: DynamicNumber }[] = [];

  $: modifiedStats = Object.entries(hero.stats.value).map(([k, v]) => ({ type: k as StatType, value: v })).filter(stat => stat.value.modified);
</script>

<div>
  {#if modifiedStats.length === 0}
    <span class="inline-flex items-center text-sm rounded-md bg-teal-600/20 px-2 py-1 font-medium text-teal-500 ring-1 ring-inset ring-teal-500">
      No modifiers applied
    </span>
  {/if}

  <dl class="divide-y divide-gray-100/20 mb-4">
    {#each modifiedStats as stat}
      {@const value = stat.value}

      {#if value.offset > 0}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{statRecord[stat.type].name}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            +{value.offset}
          </dd>
        </div>
      {/if}

      {#if value.multiplier !== 1}
        {@const percentage = value.multiplier - 1}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Increased {statRecord[stat.type].name}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            {#if percentage > 0}+{/if}{Math.round(percentage * 100)}%
          </dd>
        </div>
      {/if}
    {/each}
  </dl>

  {#if hero.effects.length > 0}
  <div>
    <p class="text-sm font-medium dark:text-zinc-300 mb-1">Effects</p>
    <ul class="list-disc ps-4">
    {#each hero.effects as effect}
      <li class="text-sm dark:text-zinc-500 mb-2">{effect}</li>
    {/each}
    </ul>
  </div>
  {/if}
</div>
