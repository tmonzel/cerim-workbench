<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { equipRecord } from '$lib/records';
	import { writable } from 'svelte/store';
	import type { Item } from '../Item';
	import ItemListCard from './ItemListCard.svelte';

  export let items: Item[];
  export let selectedItemId: string | null = null;

  let tabs: { key: string | null; label: string }[] = [];

  const searchInput = writable<string>('');
  const selectedType = writable<string | null>(null);

  let availableTypes: string[] = [];

  $: {
    availableTypes = [];

    for(const item of items) {
      if(availableTypes.includes(item.type)) {
        continue;
      }

      availableTypes.push(item.type);
    }

    tabs = [ {
      label: 'All',
      key: null
    }, 
      ...availableTypes.map(t => ({ label: equipRecord[t].name, key: t }))
    ];
  }

  $: filteredItems = items.filter(item => {
    const isType = $selectedType ? item.type === $selectedType : true;
    const isSearch = $searchInput !== '' ? item.name.toLowerCase().indexOf($searchInput.toLocaleLowerCase()) !== -1 : true;

    return isType && isSearch;
  });

  const dispatch = createEventDispatcher<{ selectItem: Item | null }>();

  export function selectItem(item: Item | null): void {
    selectedItemId = item ? item.id : null;
    dispatch('selectItem', item);
  }
</script>

<div class="sticky top-0 px-5 py-3 item-list-header z-50 bg-neutral-800">
  <ul class="flex -mb-px text-white gap-x-2">
    {#each tabs as tab}
    <li>
      <button 
        class="p-2 text-sm rounded-t-lg border-amber-300" 
        class:border-b-2={$selectedType === tab.key} 
        class:text-amber-300={$selectedType === tab.key}
        on:click={() => $selectedType = tab.key}>
        {tab.label}
      </button>
    </li>
    {/each}
  </ul>
  
  <div class="mt-4">
    <!-- svelte-ignore a11y-autofocus -->
    <input 
      type="text" 
      class="bg-neutral-700/40 shadow-md border-0 text-md text-zinc-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5" 
      placeholder="Search items..."
      bind:value={$searchInput}
      autofocus
    />
  </div>
</div>

<ul class="flex flex-col divide-y divide-neutral-700/80 p-5">
  {#if filteredItems.length === 0}
    <li class="text-white p-5">No items found for <span class="italic">"{$searchInput}"</span></li>
  {/if}

  {#each filteredItems as item}
  <li>
    <button 
      type="button" 
      class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group" 
      on:click={() => selectItem(item)}
      class:ring-2={selectedItemId === item.id}
      class:bg-stone-800={selectedItemId === item.id}
      class:ring-amber-300={selectedItemId === item.id}
    >
      <ItemListCard {item} />
    </button>
  </li>
  {/each}
</ul>

<style>
  
</style>