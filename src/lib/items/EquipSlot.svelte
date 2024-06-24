<script lang="ts">
	import ItemCard from './ItemCard.svelte';
  import Dialog from '../components/Dialog.svelte';
	import type { Item } from './Item';
	import Badge from '$lib/components/Badge.svelte';
	import { writable, derived } from 'svelte/store';
	import { AffinityType, AttributeType } from '$lib/core';
	import { itemStore } from '.';
	import { createEventDispatcher } from 'svelte';
	import { attributeStore, type AttributeState } from '$lib/attributes';

  export let type: string;
  export let item: Item | null = null; 
  export let allowedGroups: string[] = [];

  let selectionDialog: Dialog;
  let craftingDialog: Dialog;
  let availableItems = derived(itemStore, (items) => Object.values(items).filter(i => allowedGroups.includes(i.group)));
  
  const dispatch = createEventDispatcher<{ itemChange: Item | null }>();
  const itemForm = writable({ tier: 0, affinity: AffinityType.STANDARD });

  function checkRequirements(target: Item, attributes: AttributeState): boolean {
    if(!target.requirements.attributes) {
      return true;
    }

    for(const [k, v] of Object.entries(target.requirements.attributes)) {
      const type = k as AttributeType;
      const attrValue = attributes[type].value + attributes[type].offset;

      if(attrValue < v) {
        return false;
      }
    }

    return true;
  }

  function applyChanges(itm: Item): void {
    itm.upgrade($itemForm.tier, $itemForm.affinity);

    itemStore.update((items) => ({ ...items, [itm.id]: itm }));
    
    craftingDialog.close();
    item = itm;
    
    dispatch('itemChange', itm);
  }

  function selectItem(itm: Item | null) {
    selectionDialog.close();

    if(itm) {
      itemForm.set({ tier: itm.tier, affinity: itm.affinity });
    } else {
      itemForm.set({ tier: 0, affinity: AffinityType.STANDARD });
    }
    
    item = itm;
    dispatch('itemChange', itm);
  }

  function toggleMenu() {
    selectionDialog.open();
  }
</script>

<div class="relative dark:bg-stone-600/20 rounded-md">
  {#if item && item.upgrades}
    <button class="absolute top-5 right-5 z-40" on:click={() => craftingDialog.open()}>
      <svg class="fill-indigo-100 hover:fill-amber-300 scale-125 hover:scale-150 transition-transform hover:rotate-12" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-520v-120H160q0-83 58.5-141.5T360-840h240v120l120-120h80v320h-80L600-640v120H360Zm40 400q-17 0-28.5-11.5T360-160v-280h240v280q0 17-11.5 28.5T560-120H400Z"/></svg>
    </button>
  {/if}
  <button 
    type="button" 
    class="p-5 w-full text-left rounded-md shadow-lg transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-700" 
    
    on:click={toggleMenu}
  >
    {#if item}
      <span class="bg-indigo-100 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-400/20 dark:text-indigo-300">
        {type}
      </span>

      <div class="pt-3">
        <ItemCard {item} slotted />
      </div>

      {#if !checkRequirements(item, $attributeStore)}
        <div class="flex justify-end">
          <Badge type="alert">Requirements not met</Badge>
        </div>
      {/if}

    {:else}
    <div class="my-16">
      <p class="text-lg text-zinc-500 dark:text-amber-300 text-center font-semibold">{type}</p>
      <p class="text-xs text-center text-zinc-400 dark:text-zinc-200">({allowedGroups.join(', ')})</p>
    </div>
    {/if}
  </button>
</div>

<Dialog bind:this={craftingDialog} title="Crafting" backdropClose>
  <div class="mb-3">
    <select bind:value={$itemForm.affinity}>
      {#each Object.values(AffinityType) as t}
        <option value={t}>{t}</option>
      {/each}
    </select>
    <input type="number" bind:value={$itemForm.tier}>
  </div>
  <div>
    <button class="bg-amber-300 p-3" on:click={() => { item && applyChanges(item) }}>Apply Changes</button>
  </div>
</Dialog>


<Dialog bind:this={selectionDialog} title={`Select ${type} equipment`} backdropClose>
  {#if $availableItems.length > 0}
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
      {#each $availableItems as itm}
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
