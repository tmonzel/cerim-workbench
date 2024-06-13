<script lang="ts">
	import { heroState } from '$lib/hero';
	import { derived } from 'svelte/store';
	import Badge from './Badge.svelte';
	import ValueBadge from './ValueBadge.svelte';

  const modifiedStats = derived(heroState, (hero) => Object.values(hero.stats).filter(s => s.value.isModified()));
</script>

<div class="mt-6">
  {#if $modifiedStats.length === 0}
    <Badge type="highlight">No active modifiers</Badge>
  {/if}

  <dl class="divide-y divide-gray-100">
    {#each $modifiedStats as s}
      {#if s.value.added.length > 0}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">{s.label}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 sm:col-span-1 sm:mt-0">
            <ValueBadge value={s.value.getAdded()} />
          </dd>
        </div>
      {/if}

      {#if s.value.multiplier > 1}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Increased {s.label}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 sm:col-span-1 sm:mt-0">
            +{Math.round((s.value.multiplier - 1) * 100)}%
          </dd>
        </div>
      {:else if s.value.multiplier < 1}
        <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Decreased {s.label}</dt>
          <dd class="mt-1 text-sm leading 6 text-gray-700 sm:col-span-1 sm:mt-0">
            -{Math.round((s.value.multiplier - 1) * 100)}%
          </dd>
        </div>
      {/if}
    {/each}
  </dl>
</div>
