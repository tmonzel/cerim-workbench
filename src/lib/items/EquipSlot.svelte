<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ItemCard from './ItemCard.svelte';
  import Dialog from '../components/Dialog.svelte';
	import { heroState } from '../hero';
	import type { Item } from './Item';
	import Badge from '$lib/components/Badge.svelte';
	import { findItems } from '.';

  export let type: string;
  export let item: Item | null = null; 
  export let allowedGroups: string[] = [];

  let selectionDialog: Dialog;
  let availableItems = findItems().filter(i => allowedGroups.includes(i.group));

  const dispatch = createEventDispatcher();

  function selectItem(itm: Item | null) {
    selectionDialog.close();
    dispatch('selectItem', itm);
  }

  function toggleMenu() {
    selectionDialog.open();
  }
</script>

<button 
  type="button" 
  class="p-5 bg-white dark:bg-stone-600/10 text-left border border-zinc-600 rounded-md shadow transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-700" 
  class:opacity-100={!item}
  on:click={toggleMenu}
>
  {#if item}
    <p class="bg-indigo-100 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-amber-500/20 dark:text-amber-300 inline">
      {type}
    </p>

    <div class="pt-3">
      <ItemCard {item} slotted />
    </div>

    {#if $heroState.level < item.requiredLevel}
      <div class="flex justify-end">
        <Badge type="alert">Required Level ({item.requiredLevel})</Badge>
      </div>
    {/if}

  {:else}
  <div class="my-16">
    <p class="text-lg text-zinc-500 dark:text-amber-300 text-center font-semibold">{type}</p>
    <p class="text-xs text-center text-zinc-400 dark:text-zinc-200">({allowedGroups.join(', ')})</p>
  </div>
  {/if}
</button>

<Dialog bind:this={selectionDialog} title={`Select ${type} equipment`} backdropClose>
  {#if availableItems.length > 0}
    <div class="grid grid-cols-4 gap-5">
      <button 
        type="button" 
        class="relative text-left flex gap-x-6 p-5 rounded-lg" 
        on:click={() => selectItem(null)}
        class:ring-2={null === item}
        class:bg-stone-800={null === item}
        class:ring-amber-300={null === item}
      >
        <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
        </div>
        <div>
          <div class="font-semibold text-gray-900 dark:text-zinc-200">
            No Item
            <span class="absolute inset-0"></span>
          </div>
          <p class="mt-1 text-gray-600 dark:text-zinc-400">Empty Slot</p>
        </div>
      </button>
      {#each availableItems as itm}
      <button 
        type="button" 
        class="relative text-left w-full rounded-lg flex p-5 hover:bg-zinc-800/50" 
        on:click={() => selectItem(itm)} 
        class:ring-2={itm === item}
        class:bg-stone-800={itm === item}
        class:ring-amber-300={itm === item}>
        <ItemCard item={itm} />
      </button>
      {/each}
    </div>
  {:else}
  <p class="mt-1 text-gray-600 italic">No items available</p>
  {/if}
</Dialog>
