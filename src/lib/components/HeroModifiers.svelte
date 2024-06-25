<script lang="ts">
	import { heroState } from '$lib/hero';
	import { derived } from 'svelte/store';
	import Badge from './Badge.svelte';
	import ValueBadge from './ValueBadge.svelte';

  const statLabelMap: Record<string, string> = {
	  stamina: 'Stamina',
	  armor: 'Armor',
	  weight: 'Weight',
	  equipLoad: 'Equip Load',
	  damage: 'Damage',
	  hp: 'Health',
	  attackSpeed: 'Attack Speed',
	  resistance: 'Resistance',
	  attributes: 'Attributes',
	  fp: 'FP',
	  discovery: 'Discovery'
  }

  const modifiedStats = derived(heroState, (hero) => Object.entries(hero.stats));
</script>

<div>
  {#if $modifiedStats.length === 0}
    <Badge type="highlight">No active modifiers</Badge>
  {/if}

  <dl class="divide-y divide-gray-100/20">
    {#each $modifiedStats as [stat, s]}
      {@const value = s.added}

      {#if s.hasAdded()}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{statLabelMap[stat]}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 dark:text-zinc-300 sm:col-span-1 sm:mt-0">
            +<ValueBadge value={value} />
          </dd>
        </div>
      {/if}

      {#if s.multiplier !== 1}
        {@const percentage = s.multiplier - 1}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Increased {statLabelMap[stat]}</dt>
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
