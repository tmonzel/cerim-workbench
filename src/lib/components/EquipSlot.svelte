<script lang="ts">
	import ItemCard from './ItemCard.svelte';
	import { Item, type ItemSlot } from '$lib/core';
	import { attributeStore } from '$lib/attributes';
	import { type EquipState } from '$lib/stores';
	import ItemUpgradeBar from './ItemUpgradeBar.svelte';
	import ItemSelectDialog from './ItemSelectDialog.svelte';

  export let key: keyof EquipState;
  export let slot: ItemSlot;
  export let item: Item | null = null;

  let selectionDialog: ItemSelectDialog;

  function toggleMenu() {
    selectionDialog.open();
  }
</script>

<div class="relative dark:bg-stone-700/20 rounded-lg">
  {#if item && item.possibleUpgrades > 0}
    <div class="absolute top-5 right-5">
      <ItemUpgradeBar {item} />
    </div>
  {/if}
  <button 
    type="button" 
    class="group w-full p-5 text-left rounded-md shadow-lg transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800" 
    on:click={toggleMenu}
  >
    {#if item}
      <span class="bg-indigo-100 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-400/20 dark:text-indigo-300">
        {slot.label}
      </span>

      <div class="pt-3">
        <ItemCard {item} displayMode="equipped" />
      </div>

      {#if !item.checkRequirements($attributeStore)}
      <div class="flex justify-center mt-5">
        <span class="text-xs rounded-md bg-pink-600/10 px-1.5 py-0.5 font-medium text-pink-400 ring-1 ring-inset ring-pink-400">
          Requirements not met
        </span>
      </div>
      {/if}

    {:else}
    <div class="text-center">
      <p class="text-lg text-zinc-500 dark:text-amber-300 font-semibold">{slot.label}</p>
      <p class="text-xs text-zinc-400 dark:text-zinc-200">({slot.allowedGroups.join(', ')})</p>
    </div>
    {/if}
  </button>
</div>

<ItemSelectDialog slotKey={key} bind:this={selectionDialog} />

<!--<Dialog bind:this={selectionDialog} title={`Choose ${type} equipment`} backdropClose>
  <div class="">
    {#if $availableItems.length > 0}
      <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <button 
          type="button" 
          class="relative text-left flex p-5 rounded-lg hover:bg-zinc-800/50" 
          on:click={() => selectItem(null)}
          class:ring-2={null === item}
          class:bg-stone-800={null === item}
          class:ring-amber-300={null === item}
        >
          <div>
            <div class="font-semibold text-gray-900 dark:text-zinc-200">
              No Item
            </div>
            <p class="mt-1 text-gray-600 dark:text-zinc-400">Empty Slot</p>
          </div>
        </button>
        {#each $availableItems as itm}
        <button 
          type="button" 
          class="text-left w-full rounded-lg flex p-5 hover:bg-zinc-800/50 group" 
          on:click={() => selectItem(itm)} 
          class:ring-2={itm === item}
          class:bg-stone-800={itm === item}
          class:ring-amber-300={itm === item}>
          <ItemCard item={itm} displayMode="list" />
        </button>
        {/each}
      </div>
    {:else}
    <p class="mt-1 text-gray-600 italic">No items available</p>
    {/if}
  </div>
</Dialog>-->
