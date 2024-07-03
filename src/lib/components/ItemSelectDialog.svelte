<script lang="ts">
	import { equipRecord, itemSlotRecord } from '$lib/records';
	import { equipStore, itemStore, type EquipState } from '$lib/stores';
	import { derived, writable } from 'svelte/store';
	import AttackDetail from './AttackDetail.svelte';
	import type { Item } from '$lib/core';
	import ModifierList from './ModifierList.svelte';

  export let slotKey: keyof EquipState;

  let dialog: HTMLDialogElement;
  let opened = false;

  let selectedItemId: string | null = null;
  
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
  });

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
    selectedItemId = item ? item.id : null;

    close();
  }
</script>

<dialog bind:this={dialog} class="bg-transparent overflow-hidden me-0">
  <button type="button" class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50" on:click={() => close()}>
    <span class="sr-only">Close modal</span>
  </button> 

  <div class="relative z-50">
    <div class="h-screen p-10">
      <div class="p-4 rounded-xl bg-neutral-900 h-full ring-2 ring-zinc-500/20" style="width: 600px;">
        <ul class="flex flex-col overflow-y-scroll p-2 h-full divide-y-2 divide-zinc-800/30" style="scrollbar-width: thin; scrollbar-color: #222 transparent;">
          <li>
            <button 
              type="button" 
              class="text-left w-full rounded-lg flex my-2 p-5 hover:bg-zinc-800/50 group text-white" 
              on:click={() => selectItem(null)}
              class:ring-2={selectedItemId === null}
              class:bg-stone-800={selectedItemId === null}
              class:ring-amber-300={selectedItemId === null}
            >
              No item (empty slot)
            </button>
          </li>
          {#each $filteredItems as item}
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
              </div>
            </button>
          </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog > div {
    animation: fade-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  dialog[open] > div {
    animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(10px);
      display: none;
    }
  
    100% {
      opacity: 1;
      transform: translateY(0px);
      display: block;
    }
  }
  
  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateY(0px);
      display: block;
    }
  
    100% {
      opacity: 0;
      transform: translateY(10px);
      display: none;
    }
  }
  
  </style>