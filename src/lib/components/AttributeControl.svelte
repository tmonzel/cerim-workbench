<script lang="ts">
	import type { Attribute } from '$lib/core';
	import { heroState } from '$lib/hero';
	import { appState } from '$lib/state';
	import { createEventDispatcher } from 'svelte';

  export let attribute: Attribute;
  export let value: number;
  export let offset: number;

  const id = crypto.randomUUID();
  const dispatch = createEventDispatcher<{ changeValue: number }>();

  function changeValue(newValue: number) {
    if(newValue < 0) {
      return;
    }
    
    value = newValue;
    dispatch('changeValue', newValue);
  }
</script>

<label for={id} class="flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200">
  {#if attribute.color}<span style:background-color={attribute.color} class="me-2 w-2.5 h-2.5 rounded"></span>{/if}
  {attribute.name} 
</label>
<div class="relative mt-2 rounded-md text-lg font-medium dark:bg-zinc-600/20">
  <div class="absolute inset-y-0 left-0 flex items-center z-10">
    <button 
      class="h-full rounded-md border-0 px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value - 1)}
    >
      -
    </button>
  </div>
  <div class="block w-full rounded-md text-lg border-0 py-2 text-center text-gray-900 dark:text-zinc-300 ring-zinc-500 focus:ring-teal-300">
    {value} {#if offset > 0}<span class="opacity-60">(+{offset})</span>{/if}
  </div>
  <div class="absolute inset-y-0 right-0 flex items-center z-10">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value + 1)}
    >
      +
    </button>
  </div>
  <div class="absolute rounded-md top-0 left-0 bottom-0 dark:bg-zinc-400/20" style:width={`${((value + offset) / $appState.maxLevel) * 100}%`}></div>
</div>