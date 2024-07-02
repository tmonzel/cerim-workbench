<script lang="ts">
  import type { Item } from '$lib/core';
	import { equipRecord } from '$lib/records';
	import { createEventDispatcher } from 'svelte';
	import ItemCard from './ItemCard.svelte';
	import { writable } from 'svelte/store';

  export let items: Item[];
  export let selectedItemId: string | null = null;
  
  let selectedItem: Item | null = null;
  let hoveredItem: Item | null = null;

  const searchInput = writable<string>('');
  $: filteredItems = items.filter(item => {
    if($searchInput === '') {
      return item;
    }

    const name = item.name.toLowerCase();

    return name.indexOf($searchInput.toLowerCase()) !== -1;
  }) 

  const dispatch = createEventDispatcher<{ selectItem: Item | null }>();

  export function selectItem(item: Item | null): void {
    selectedItemId = item ? item.id : null;
    selectedItem = item;

    dispatch('selectItem', item);
  }
</script>

<div class="bg-zinc-900 rounded-xl" style="width: 90vw">
  <div class="px-4 py-2">
    <label for="searchInput" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input 
      type="text" 
      id="searchInput" 
      bind:value={$searchInput} 
      class="bg-zinc-800 font-medium border-transparent text-zinc-200 text-lg rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-zinc-600 focus:border-transparent" 
      placeholder="Search items..." 
      autofocus
    />
  </div>
  <div class="flex" style="height: 70vh">
    <div class="basis-1/4">
      <ul class="flex flex-col gap-1 overflow-y-scroll p-4 h-full" style="scrollbar-width: thin; scrollbar-color: #aaa transparent;">
        <li>
          <button 
            type="button" 
            class="text-left w-full h-full rounded-lg flex p-5 hover:bg-zinc-800/50 group text-white" 
            on:click={() => selectItem(null)}
            on:pointerover={() => hoveredItem = null}
            class:ring-2={selectedItemId === null}
            class:bg-stone-800={selectedItemId === null}
            class:ring-amber-300={selectedItemId === null}
          >
            No Item
          </button>
        </li>
        {#each filteredItems as item}
        <li>
          <button 
            type="button" 
            class="text-left text-white w-full rounded-lg p-5 hover:bg-zinc-800/50 group" 
            on:click={() => selectItem(item)} 
            on:mouseover={() => hoveredItem = item}
            on:focus={() => hoveredItem = item}
            class:ring-2={selectedItemId === item.id}
            class:bg-stone-800={selectedItemId === item.id}
            class:ring-amber-300={selectedItemId === item.id}
          >
            <p>{item.name} {#if item.tier > 0}(+{item.tier}){/if}</p>
            <p class="text-sm text-zinc-500">{equipRecord[item.type].name}</p>
          </button>
        </li>
        {/each}
      </ul>
    </div>
    
    <div class="flex-1 flex items-center justify-center">
      {#if hoveredItem}
        <div class="w-3/4">
          <ItemCard item={hoveredItem} displayMode="detail" />
        </div>
      {:else}
        <div class="text-center">
          <p class="text-zinc-200 font-semibold">No Item equipped</p>
          <p class="text-zinc-500 italic">Select item on the left side, tarnished</p>
        </div>
      {/if}
    </div>
  </div>
</div>