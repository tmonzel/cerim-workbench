<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ItemCard from './ItemCard.svelte';
  import Dialog from '../components/Dialog.svelte';
	import { heroState } from '../hero';
	import type { Item } from './items/Item';
	import { itemStore } from './state';

  export let type: string;
  export let item: Item | null = null; 
  export let allowedGroups: string[] = [];

  let selectionDialog: Dialog;
  let availableItems: Item[] = [];

  const dispatch = createEventDispatcher();

  $: availableItems = $itemStore.filter(i => allowedGroups.includes(i.group));

  function selectItem(itm: Item | null) {
    selectionDialog.close();
    dispatch('selectItem', itm);
  }

  function toggleMenu() {
    selectionDialog.open();
  }
</script>

<div class="relative">
  <button 
    type="button" 
    class="min-w-48 p-6 bg-white border text-left border-gray-200 rounded-md shadow transition-all ease-out duration-200 hover:ring-2 hover:ring-inset hover:ring-indigo-600 hover:bg-indigo-50" 
    on:click={toggleMenu}
  >
    {#if item}
      <p class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 inline">
        {type}
      </p>

      <ItemCard {item} slotted />

      {#if $heroState.level < item.requiredLevel}
        <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Required Level
        </span>
      {/if}

    {:else}
    <p class="text-md leading-5 text-gray-500 text-center">{type}</p>
    {/if}
  </button>

  <Dialog bind:this={selectionDialog} title={type} backdropClose>
    {#if availableItems.length > 0}
      <div class="grid grid-cols-4 gap-2">
        <button 
          type="button" 
          class="relative text-left w-full flex gap-x-6 p-4 rounded-lg hover:bg-gray-50" 
          on:click={() => selectItem(null)}
          class:ring-2={null === item}
          class:bg-indigo-50={null === item}
          class:ring-indigo-600={null === item}
        >
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
          </div>
          <div>
            <div class="font-semibold text-gray-900">
              No Item
              <span class="absolute inset-0"></span>
            </div>
            <p class="mt-1 text-gray-600">Empty Slot</p>
          </div>
        </button>
        {#each availableItems as itm}
        <button 
          type="button" 
          class="relative text-left w-full rounded-lg flex p-4 ring-inset hover:bg-gray-50" 
          on:click={() => selectItem(itm)} 
          class:ring-2={itm === item}
          class:bg-indigo-50={itm === item}
          class:ring-indigo-600={itm === item}>
          <ItemCard item={itm} />
        </button>
        {/each}
      </div>
    {:else}
    <p class="mt-1 text-gray-600 italic">No items available</p>
    {/if}
  </Dialog>
</div>
