<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ModifierList from './ModifierList.svelte';
	import { equipRecord } from '$lib/records';
	import { writable } from 'svelte/store';
	import type { Item } from '../Item';
	import AttackDetail from '$lib/components/AttackDetail.svelte';

  export let items: Item[];
  
  let selectedItemId: string | null = null;

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

<div class="sticky top-0 px-5 py-3 item-list-header z-50">
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
      class="bg-zinc-800 border-0 text-xl text-zinc-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5" 
      placeholder="Search items..."
      bind:value={$searchInput}
      autofocus
    />
  </div>
</div>

<ul class="flex flex-col divide-y-2 divide-zinc-800/30 p-5">
  <li>
    <button 
      type="button" 
      class="text-left w-full rounded-lg flex my-2 p-5 hover:bg-zinc-800/50 group text-white" 
      on:click={() => selectItem(null)}
      class:ring-2={selectedItemId === null}
      class:bg-stone-800={selectedItemId === null}
      class:ring-amber-300={selectedItemId === null}
    >
      Empty slot
    </button>
  </li>

  {#if filteredItems.length === 0}
    <li class="text-white p-5">No items found for <span class="italic">"{$searchInput}"</span></li>
  {/if}

  {#each filteredItems as item}
  <li>
    <button 
      type="button" 
      class="w-full my-2 text-left text-white flex gap-x-4 rounded-lg p-5 items-center hover:bg-zinc-800/50 group" 
      on:click={() => selectItem(item)}
      class:ring-2={selectedItemId === item.id}
      class:bg-stone-800={selectedItemId === item.id}
      class:ring-amber-300={selectedItemId === item.id}
    >
      <img src={item.iconUrl} alt="Item icon" class="w-28 transition-all group-hover:brightness-150" />
      <div class="w-full">
        <p>{item.name} {#if item.tier > 0}(+{item.tier}){/if}</p>
        <p class="text-sm text-zinc-500 mb-4">{equipRecord[item.type].name}</p>
        {#if item.attack}
          <AttackDetail attack={item.attack} />
        {/if}
        <ModifierList data={item.modifiers} />
        {#if item.effects}
          <p class="text-sm font-medium">Effects</p>
          {#each item.effects as effect}
            <p class="mt-1 text-gray-500 text-sm font-medium">{effect}</p>
          {/each}
        {/if}
      </div>
    </button>
  </li>
  {/each}
</ul>

<style>
  .item-list-header {
    background-color: rgb(30, 30, 33);
  }
</style>