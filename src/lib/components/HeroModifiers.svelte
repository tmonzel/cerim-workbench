<script lang="ts">
	import { heroState } from '$lib/hero';
	import Badge from './Badge.svelte';
	import NumberBadge from './NumberBadge.svelte';
</script>

<div class="mt-6">
  {#if $heroState.modifications.length === 0}
    <Badge type="highlight">No active modifiers</Badge>
  {/if}

  <dl class="divide-y divide-gray-100">
    {#each $heroState.modifications as mod}
      <div class="py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">{mod.name}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
          <NumberBadge num={mod.value} />
        </dd>
      </div>
    {/each}
  </dl>
</div>
