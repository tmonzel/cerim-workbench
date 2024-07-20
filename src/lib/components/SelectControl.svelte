<script lang="ts">
	import { createEventDispatcher } from 'svelte';

  export let items: { name: string; value: unknown }[] = []
  export let showMenu = false;
  export let value: unknown = null;
  export let compareWith = (v: unknown, v2: unknown) => v === v2; 

  let selectedItem: { name: string; value: unknown } | null = null;

  const dispatch = createEventDispatcher<{ select: any }>();

  $: {
    for(const item of items) {
      if(compareWith(value, item.value)) {
        selectedItem = item;
        break;
      }
    }
  }

  function selectValue(val: null | unknown): void {
    value = val;
    showMenu = false;

    dispatch('select', value);
  }
</script>

<div class="relative z-30">
  <button 
    type="button" 
    class="relative w-full rounded-md p-1 bg-stone-700/50 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-amber-300" aria-expanded={showMenu}
    on:click={() => showMenu = !showMenu}
    >
    <span class="flex items-center select-none ps-1">
      <slot name="selected" {selectedItem} />
    </span>
    <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
      <svg class="h-5 w-5 ring-amber-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
      </svg>
    </span>
  </button>

  {#if showMenu}
  <div class="absolute z-40 mt-2 p-1 -left-1 rounded-md bg-zinc-900 flex flex-col gap-y-2" tabindex="-1" role="listbox">
    {#each items as item, i}
    {@const selected = selectedItem === item}
    <button 
      class="relative w-full rounded-md select-none py-1 pl-2 pr-12 flex justify-between hover:bg-stone-800 ring-amber-300" 
      id="listbox-option-{i}" 
      role="option" 
      aria-selected={selected} 
      on:click={() => selectValue(item.value)}
      class:bg-stone-800={selected}
      class:ring-2={selected}
    >
      <div class="flex items-center whitespace-nowrap">
        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
        <slot {item} />
      </div>

      <!--
        Checkmark, only display for selected option.
      -->
      {#if selected}
      <span class="absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="h-5 w-5 fill-amber-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
      </span>
      {/if}
    </button>
    {/each}
  </div>
  {/if}
</div>