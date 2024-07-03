<script lang="ts">
	import EquipUpgradeBar from './EquipUpgradeBar.svelte';
	import { heroState } from '$lib/state';
	import { itemStore, type Item } from '$lib/item';
	import { derived } from 'svelte/store';
	import ItemCard from '$lib/item/components/ItemCard.svelte';
	import ItemSelectList from '$lib/item/components/ItemSelectList.svelte';

  export let label: string;
  export let groups: string[] = [];
  export let slot: string | null = null;
  export let item: Item | null = null;

  let selectionDialog: HTMLDialogElement;
  
  const selectableItems = derived(itemStore, (items) => Object.values(items).filter(i => groups.includes(i.group)));

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

<div class="relative dark:bg-stone-700/20 rounded-lg">
  {#if item && item.possibleUpgrades > 0}
    <div class="absolute top-5 right-5">
      <EquipUpgradeBar {item} />
    </div>
  {/if}
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
    <div class="text-center">
      <p class="text-lg text-zinc-500 dark:text-amber-300 font-semibold">{label}</p>
      <p class="text-xs text-zinc-400 dark:text-zinc-200">({groups.join(', ')})</p>
    </div>
    {/if}
  </button>
</div>

<dialog bind:this={selectionDialog} class="bg-neutral-900 me-0 mt-0 h-screen overflow-x-hidden overflow-y-scroll border-s border-zinc-800" style="min-width: 600px; scrollbar-width: thin; scrollbar-color: #444 transparent;">
  <button type="button" class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50" on:click={() => closeSelectionDialog()}>
    <span class="sr-only">Close modal</span>
  </button> 

  <div class="relative z-50">
    <ItemSelectList items={$selectableItems} on:selectItem={(e) => selectItem(e.detail)} />
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

