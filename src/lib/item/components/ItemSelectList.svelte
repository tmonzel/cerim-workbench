<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Item } from '../Item';
	import ItemListCard from './ItemListCard.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { itemGroupRecord } from '$lib/records';

  export let items: Item[];
  export let selectedItemId: string | null = null;

  let groupSelectItems: { value: string; name: string }[] = [];

  const searchInput = writable<string>('');
  
  let selectedGroup = writable<string | null>(null);
  let availableGroups: string[] = [];

  $: {
    availableGroups = [];
    let selectedItem = null;

    for(const item of items) {
      if(item.id === selectedItemId) {
        selectedItem = item;
      }

      if(availableGroups.includes(item.group)) {
        continue;
      }

      availableGroups.push(item.group);
    }

    groupSelectItems = availableGroups.map(t => ({ name: itemGroupRecord[t].name, value: t }))

    if(selectedItem) {
      selectedGroup.set(selectedItem.group);
    } else {
      selectedGroup.set(availableGroups[0]);
    }
    
  }

  $: filteredItems = items.filter(item => {
    const isType = $selectedGroup ? item.group === $selectedGroup : true;
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

  
  <div class="flex gap-x-3">
    <div>
      <SelectControl 
        noItemLabel="Select group" 
        items={groupSelectItems} 
        bind:value={$selectedGroup} 
      />
    </div>
    <!-- svelte-ignore a11y-autofocus -->
    <div class="grow">
      <input 
        type="text" 
        class="bg-neutral-700/40 shadow-md border-0 text-md text-zinc-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5" 
        placeholder="Search items..."
        bind:value={$searchInput}
        autofocus
      />
    </div>
  </div>
</div>

<ul class="flex flex-col p-5">
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
