<script lang="ts">
	import { DamageStat, NumberStat } from '$lib/core';
	import { heroState } from '$lib/hero';
	import DamageBadge from './DamageBadge.svelte';

  const statLabelMap: Record<string, string> = {
    stamina: 'Stamina',
    health: 'Health',
    equipLoad: 'Equip Load',
    armor: 'Armor',
    damage: 'Damage',
    focus: 'Focus',
    poise: 'Poise',
    weight: 'Weight'
  }
</script>

<dl class="mt-6 divide-y divide-gray-100">
  {#each Object.entries($heroState.stats) as [name, stat]}
    {#if stat.isModified()}
      <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">{statLabelMap[name]}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
          {#if stat instanceof DamageStat}
            <DamageBadge stat={stat} />
          {:else if stat instanceof NumberStat}
            {@const added = stat.getAdded()}
            {added > 0 ? '+' + added : added}
          {/if}
        </dd>
      </div>
    {/if}

    {#if stat.multiplier !== 1}
      <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">{stat.multiplier > 1 ? 'Increased' : 'Decreased'} {statLabelMap[name]}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
          {stat.multiplier > 1 ? '+' + Math.round((stat.multiplier - 1) * 100) : Math.round((stat.multiplier - 1) * 100)}%
        </dd>
      </div>
    {/if}
  {/each}
</dl>
