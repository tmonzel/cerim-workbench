<script lang="ts">
	import { heroState } from '$lib/hero';
	import { derived } from 'svelte/store';
	import { DynamicNumber } from '$lib/core/DynamicNumber';
	import type { HeroStatType } from '$lib/core';

  const modifiedStats = derived(heroState, (hero) => {
    let filteredStats: Partial<Record<HeroStatType, DynamicNumber>> = {};

    for(const k in hero.stats) {
      const stat = hero.stats[k as HeroStatType];

      if(stat.modified && stat instanceof DynamicNumber) {
        filteredStats[k as HeroStatType] = stat;
      }
    }

    return filteredStats;
  });

  $: statKeys = Object.keys($modifiedStats);
</script>

<div>
  {#if statKeys.length === 0}
    <span class="inline-flex items-center text-sm rounded-md bg-teal-600/20 px-2 py-1 font-medium text-teal-500 ring-1 ring-inset ring-teal-500">
      No modifiers applied
    </span>
  {/if}

  <dl class="divide-y divide-gray-100/20 mb-4">
    {#each statKeys as k}
      {@const stat = $modifiedStats[k]}

      {#if stat.value.offset > 0}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{stat.name}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            +{stat.value.offset}
          </dd>
        </div>
      {/if}

      {#if stat.value.multiplier !== 1}
        {@const percentage = stat.value.multiplier - 1}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Increased {stat.name}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            {#if percentage > 0}+{/if}{Math.round(percentage * 100)}%
          </dd>
        </div>
      {/if}
    {/each}
  </dl>

  {#if $heroState.effects.length > 0}
  <div>
    <p class="text-sm font-medium dark:text-zinc-300 mb-1">Effects</p>
    <ul class="list-disc list-inside">
    {#each $heroState.effects as effect}
      <li class="text-sm dark:text-zinc-500">{effect}</li>
    {/each}
    </ul>
  </div>
  {/if}
</div>
