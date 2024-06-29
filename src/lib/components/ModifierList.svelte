<script lang="ts">
	import { attributeRecord, defenseRecord, list, resistanceRecord, statRecord } from '$lib/core';
	import { FlatModifier } from '$lib/core/modifiers/FlatModifier';
	import { PercentualModifier } from '$lib/core/modifiers/PercentualModifier';

  export let data: (FlatModifier | PercentualModifier)[] = [];
</script>

<dl class="divide-y divide-gray-100/20 my-3">
  {#each data as modifier}
    {#if modifier instanceof PercentualModifier}
      {#each list(modifier.def) as t}
        {#if t.key === 'stats'}
        <div class="py-2">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{modifier.def[t.key].name ?? 'Increase Stats'}</dt>
          <dd class="grid grid-cols-2">
            {#each list(modifier.def[t.key].modify) as stat}
            <div class="sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 dark:text-zinc-500 sm:col-span-3">{statRecord[stat.key].name}</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-3 sm:mt-0">
                {#if stat.value >= 0}+{/if}{Math.round((stat.value - 1) * 100)}%
              </dd>
            </div>
            {/each}
          </dd>
        </div>
        {:else if t.key === 'resistance'}
          <div class="py-2">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{modifier.def[t.key].name ?? 'Increase Resistances'}</dt>
            <dd class="grid grid-cols-2">
              {#each list(modifier.def[t.key].modify) as res}
              <div class="sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 dark:text-zinc-500 sm:col-span-3">{resistanceRecord[res.key].name}</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-3 sm:mt-0">
                  {#if res.value >= 0}+{/if}{Math.round((res.value - 1) * 100)}%
                </dd>
              </div>
              {/each}
            </dd>
          </div>
        {:else if t.key === 'defense'}
          <div class="py-2">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{modifier.def[t.key].name ?? 'Increase Defenses'}</dt>
            <dd class="grid grid-cols-2">
              {#each list(modifier.def[t.key].modify) as def}
              <div class="sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 dark:text-zinc-500 sm:col-span-3">{defenseRecord[def.key].name}</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-3 sm:mt-0">
                  {#if def.value >= 0}+{/if}{Math.round((def.value - 1) * 100)}%
                </dd>
              </div>
              {/each}
            </dd>
          </div>
        {/if}
      {/each}
    {:else if modifier instanceof FlatModifier}
      {#each list(modifier.def) as t}

        {#if t.key === 'stats'}
          {#each list(modifier.def[t.key].modify) as stat}
          <div class="py-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{statRecord[stat.key].name}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-3 sm:mt-0">
              {#if stat.value >= 0}+{/if}{stat.value}
            </dd>
          </div>
          {/each}
        {:else if t.key === 'resistance'}
          {#each list(modifier.def[t.key].modify) as res}
            <div class="py-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{resistanceRecord[res.key].name}</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-3 sm:mt-0">
                {#if res.value >= 0}+{/if}{res.value}
              </dd>
            </div>
          {/each}
        {:else if t.key === 'attributes'}
        <div class="py-2">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-3">{modifier.def[t.key].name ?? 'Raise Attributes'}</dt>
          <dd class="flex flex-wrap gap-x-4">
            {#each list(modifier.def[t.key].modify) as attr}
              <div class="flex items-center">
                <span style:background-color={attributeRecord[attr.key].color} class="me-1 w-2.5 h-2.5 rounded"></span>
                <span class="text-white">+{attr.value}</span>
              </div>
            {/each}
          </dd>
        </div>
        {/if}
      {/each}
    {/if}
  {/each}
</dl>