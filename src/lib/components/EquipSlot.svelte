<script lang="ts">
	import EquipUpgradeBar from './EquipUpgradeBar.svelte';
	import { heroState } from '$lib/state';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemSelectList from '$lib/item/components/ItemSelectList.svelte';
	import type { Item } from '$lib/item';

  export let label: string;
  export let slot: string | null = null;
  export let item: Item | null = null;
  export let selectableItems: Item[] = [];

  let selectionDialog: HTMLDialogElement;

  let opened = false;

  export function openSelectionDialog(): void {
    selectionDialog.showModal();
    opened = true;
  }

  export function closeSelectionDialog(): void {
    selectionDialog.close();
    opened = false;
  }

  export function selectItem(item: Item | null): void {
    slot = item ? item.id : null;
    closeSelectionDialog();
  }
</script>

<div class="relative bg-stone-700/20 rounded-lg">
  
    <div class="absolute top-5 right-5 flex gap-7">
      {#if item && item.possibleUpgrades > 0}
        <EquipUpgradeBar {item} />
      {/if}

      {#if item}
      <button class="flex rounded-lg bg-stone-600/40 p-1 ring-stone-400 hover:ring-2 group" on:click={() => selectItem(null)}>
        <svg  class="fill-stone-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
      {/if}
    </div>
  <button 
    type="button" 
    class="group w-full p-5 text-left rounded-md shadow-md transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800" 
    on:click={() => openSelectionDialog()}
  >
    {#if item}
      <span class="bg-indigo-100 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-400/20 dark:text-indigo-300">
        {label}
      </span>

      <div class="pt-3">
        <ItemCard {item} displayMode="equipped" />
      </div>

      {#if !item.checkRequirements($heroState.attributes.getTotalValue())}
      <div class="flex justify-center mt-5">
        <span class="text-xs rounded-md bg-pink-600/10 px-1.5 py-0.5 font-medium text-pink-400 ring-1 ring-inset ring-pink-400">
          Requirements not met
        </span>
      </div>
      {/if}

    {:else}
    <div class="text-center py-4">
      <p class="text-lg text-amber-300 font-semibold">{label}</p>
    </div>
    {/if}
  </button>
</div>

<dialog bind:this={selectionDialog} class="bg-neutral-900 me-0 mt-0 h-screen overflow-x-hidden overflow-y-scroll border-s border-zinc-800" style="min-width: 600px; scrollbar-width: thin; scrollbar-color: #444 transparent;">
  <button type="button" class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50" on:click={() => closeSelectionDialog()}>
    <span class="sr-only">Close modal</span>
  </button> 

  <div class="relative z-50 bg-neutral-800/30">
    <div class="text-stone-300 bg-neutral-800 text-xl p-4 flex justify-between items-center border-b border-zinc-700">
      <div>
        Select <span class="font-semibold">{label}</span> Item
      </div>
      <div>
        <button class="bg-amber-300 text-amber-900 p-2.5 rounded-md" on:click={() => selectItem(null)}>Clear Slot</button>
      </div>
    </div>
    <ItemSelectList items={selectableItems} selectedItemId={slot} on:selectItem={(e) => selectItem(e.detail)} />
  </div>
</dialog>

<style>
  dialog:modal {
    max-height: 100vh;
  }

  dialog > div {
    animation: fade-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  dialog[open] > div {
    animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
  
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  
  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateX(0px);
    }
  
    100% {
      opacity: 0;
      transform: translateX(20px);
    }
  }
  
  </style>
<!--<ItemSelectDialog bind:this={selectionDialog} items={$selectableItems} />-->

