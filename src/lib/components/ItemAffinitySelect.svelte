<script lang="ts">
	import { AffinityType } from '$lib/core';
	import { createEventDispatcher } from 'svelte';

  const affinityNameMap: Record<AffinityType, string> = {
	  [AffinityType.STANDARD]: 'Standard',
	  [AffinityType.HEAVY]: 'Heavy',
	  [AffinityType.KEEN]: 'Keen',
	  [AffinityType.QUALITY]: 'Quality',
	  [AffinityType.FIRE]: 'Fire',
	  [AffinityType.LIGHTNING]: 'Lightning',
	  [AffinityType.SACRED]: 'Sacred',
	  [AffinityType.COLD]: 'Cold'
  }

  export let value: AffinityType = AffinityType.STANDARD;

  const dispatch = createEventDispatcher<{ affinityChange: AffinityType }>();

  function select(v: AffinityType): void {
    value = v;
    show = false;

    dispatch('affinityChange', v);
  }

  let show = false;
</script>

<div class="relative">
  <button type="button" class="inline-flex items-center hover:text-amber-300" aria-expanded={show} on:click={() => show = !show}>
    <span>{affinityNameMap[value]}</span>
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if show}
  <div class="absolute px-4 z-50">
    <div class="flex-auto overflow-hidden rounded-lg bg-zinc-800 text-sm leading-6 shadow-lg ring-1 ring-zinc-300/20">
      <div class="p-2">
        {#each Object.values(AffinityType) as t}

        <div class="group relative flex gap-x-6 rounded-md p-2 ring-2 ring-transparent hover:bg-stone-800 hover:ring-amber-300">
          <div>
            <button class="font-semibold text-zinc-300" on:click={() => select(t)}>
              {affinityNameMap[t]}
              <span class="absolute inset-0"></span>
            </button>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>

  {/if}
</div>