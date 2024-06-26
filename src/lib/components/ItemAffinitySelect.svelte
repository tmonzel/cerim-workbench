<script lang="ts">
	import { AFFINITY_NAME_MAP, AffinityType } from '$lib/core';
	import { createEventDispatcher } from 'svelte';

  export let value: AffinityType = AffinityType.STANDARD;
  export let selectableTypes: AffinityType[] = [];

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
    <span>{AFFINITY_NAME_MAP[value]}</span>
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if show}
  <div class="absolute z-50 left-0 translate-y-3">
    <div class="flex-auto overflow-hidden rounded-lg bg-zinc-800 text-sm leading-6 shadow-lg ring-1 ring-zinc-300/20">
      <div class="p-2">
        {#each selectableTypes as t}
          <button 
            class="group w-full relative flex gap-x-6 my-1 rounded-md ring-inset px-2 py-1 hover:ring-2 hover:bg-stone-800 hover:ring-amber-300 font-semibold text-zinc-300" 
            on:click={() => select(t)}
            class:ring-2={t === value}
            class:bg-stone-800={t === value}
            class:ring-amber-300={t === value}
            >
            {AFFINITY_NAME_MAP[t]}
            <span class="absolute inset-0"></span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  {/if}
</div>