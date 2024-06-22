<script lang="ts">
	import type { Attribute } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

  export let attribute: Attribute;

  const id = crypto.randomUUID();
  const dispatch = createEventDispatcher<{ changeValue: number }>();

  $: value = attribute.value;
  $: offset = attribute.offset ?? 0;

  function changeValue(newValue: number) {
    if(newValue < 0) {
      return;
    }
    
    attribute.value = newValue;
    dispatch('changeValue', newValue);
  }
</script>

<label for={id} class="flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200">
  {#if attribute.color}<span style:background-color={attribute.color} class="me-2 w-2.5 h-2.5 rounded"></span>{/if}
  {attribute.label} 
</label>
<div class="relative mt-2 rounded-md text-lg font-medium">
  <div class="absolute inset-y-0 left-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value - 1)}
    >
      -
    </button>
  </div>
  <div class="block w-full rounded-md text-lg border-0 py-2 text-center text-gray-900 dark:bg-zinc-600/20 dark:text-zinc-300 ring-zinc-500 focus:ring-teal-300">
    {value} {#if offset > 0}<span class="opacity-60">(+{offset})</span>{/if}
  </div>
  <div class="absolute inset-y-0 right-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value + 1)}
    >
      +
    </button>
  </div>
</div>