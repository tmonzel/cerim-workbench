<script lang="ts">
	import type { Item } from '$lib/core';
	import { equipStore, itemStore, type EquipState } from '$lib/stores';
	import { derived, writable } from 'svelte/store';
	import { equipRecord, itemSlotRecord } from '$lib/records';
	import ItemSelectPanel from './ItemSelectPanel.svelte';

  export let slotKey: keyof EquipState;

  let dialog: HTMLDialogElement;
  let opened = false;
  
  const items = derived(itemStore, (items) => Object.values(items).filter(i => itemSlotRecord[slotKey].allowedGroups.includes(i.group)));
  const availableTypes = derived(items, (items) => {
    const types: string[] = [];

    for(const item of items) {
      if(types.includes(item.type)) {
        continue;
      }

      types.push(item.type);
    }

    return types;
  });

  const selectedType = writable<string | null>(null);

  const filteredItems = derived([items, selectedType], ([items, type]) => {
    if(type === null) {
      return items;
    }

    return items.filter(item => item.type === type);
  })


  export function open(): void {
    dialog.showModal();
    opened = true;
  }

  export function close(): void {
    dialog.close();
    opened = false;
  }

  export function selectItem(item: Item | null): void {
    equipStore.update((store) => ({ ...store, [slotKey]: item }));
    close();
  }
</script>

<svelte:head>
  {#if opened}
  <style>
    body {
      overflow-y: hidden;
    }
  </style>
  {/if}
</svelte:head>

<dialog bind:this={dialog} class="bg-transparent overflow-hidden">
  <button type="button" class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/90" on:click={() => close()}>
    <span class="sr-only">Close modal</span>
  </button> 

  <div class="relative flex items-center">
    <div>
      <div class="flex items-center justify-between p-4 z-50 border-zinc-500">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-zinc-300">
          Armory
        </h3>
        <div>
          <button
            type="button" 
            on:click={() => close()}
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
      </div>
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2">
            <button 
              class="inline-block p-4 rounded-t-lg border-amber-300"
              class:border-amber-300={$selectedType === null}
              class:text-amber-300={$selectedType === null}
              class:border-b-2={$selectedType === null}
              on:click={() => $selectedType = null}
            >
              All
            </button>
          </li>
          {#each $availableTypes as type}
          <li class="me-2">
            <button 
              class="inline-block p-4 rounded-t-lg active"
              class:border-amber-300={$selectedType === type}
              class:text-amber-300={$selectedType === type}
              class:border-b-2={$selectedType === type}
              on:click={() => $selectedType = type}
              >
              {equipRecord[type].name}
            </button>
          </li>
          {/each}
        </ul>
      </div>
      <ItemSelectPanel items={$filteredItems} on:selectItem={(e) => selectItem(e.detail)} />
    </div>
  </div>
</dialog>