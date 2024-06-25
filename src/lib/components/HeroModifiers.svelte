<script lang="ts">
	import { heroState } from '$lib/hero';
	import { derived } from 'svelte/store';
	import ValueBadge from './ValueBadge.svelte';

  const modifiedStats = derived(heroState, (hero) => Object.values(hero.stats).filter(s => s.isModified()));
</script>

<div>
  {#if $modifiedStats.length === 0}
    <span class="inline-flex items-center rounded-md bg-red-700/10 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-700">
      No modifiers applied
    </span>
  {/if}

  <dl class="divide-y divide-gray-100/20">
    {#each $modifiedStats as stat}
      {#if stat.hasAdded()}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{stat.name}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            +<ValueBadge value={stat.added} />
          </dd>
        </div>
      {/if}

      {#if stat.multiplier !== 1}
        {@const percentage = stat.multiplier - 1}
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
