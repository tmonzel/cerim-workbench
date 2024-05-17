<script lang="ts">
	import { type AttributeState, type DataSchema, type Item } from './types';
  import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import { getContext, onMount } from 'svelte';
	import { type Readable } from 'svelte/store';
	import { scaleValue } from '$lib';

  export let type: string;
  export let attributes: AttributeState;
  export let item: Item | null = null; 
  export let allowedGroups: string[] = [];

  let showMenu = false;
  let availableItems: Item[] = [];

  const data = getContext<Readable<DataSchema>>('data');

  $: availableItems = $data.items.filter(i => allowedGroups.includes(i.base?.group));

  $: {
    if(item && item.base.scaling) {
      for(const mod of item.base.scaling) {
        if(item.base.damage && attributes[mod.attr] > 0) {
          
          item.damage = [
            item.base.damage[0] + scaleValue(attributes[mod.attr], mod.span, mod.rate), 
            item.base.damage[1] + scaleValue(attributes[mod.attr], mod.span, mod.rate)
          ];
        } else {
          item.damage = item.base.damage;
        }
      }
    }
  }

  function selectItem(itm: Item | null) {
    showMenu = false;
    item = itm;
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function closeMenu() {
    if(showMenu) {
      showMenu = false;
    }
  }

  onMount(() => {
    document.body.addEventListener('pointerup', closeMenu);

    return () => {
      document.body.removeEventListener('pointerup', closeMenu);
    }
  })
</script>

<div class="relative">
<button 
  type="button" 
  class="min-w-48 p-6 bg-white border text-left border-gray-200 rounded-md shadow hover:ring-2 hover:ring-inset hover:ring-indigo-600"
  aria-expanded={showMenu} 
  on:click={toggleMenu}
>
  {#if item}
  <p class="text-sm leading-5 text-gray-500">{type}</p>
  {item.name ?? "Nameless"} ({item.base.name})

  {#if item.damage && item.base.damage}
  <p class="text-sm" class:text-indigo-600={item.damage[0] > item.base.damage[0]}>
    {item.damage[0]}-{item.damage[1]} ({Math.round((item.damage[0] + item.damage[1]) / 2)})
  </p>
  {/if}

  <dl class="divide-y divide-gray-100 my-3">
    {#each item.modifiers as m}
    <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">{m.stat}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
        {#if m.value > 1}+{/if}
        {#if m.type === 'flat'}
          {m.value}
        {:else}
          {Math.round((m.value - 1) * 100)}%
        {/if}
      </dd>
    </div>
    {/each}
  </dl>

  {:else}
  <p class="text-md leading-5 text-gray-500 text-center">{type}</p>
  {/if}
</button>


{#if showMenu}
<div 
  class="absolute left-1/2 -translate-x-1/2 z-10 mt-5 flex px-4" 
  transition:fly={{ duration: 200, y: 5, opacity: 0, easing: sineOut }}
  >
  <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
    <div class="p-4">
      {#if availableItems.length > 0}
        <button type="button" class="relative text-left w-full flex gap-x-6 rounded-lg p-4 hover:bg-gray-50" on:click={() => selectItem(null)}>
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
          class="relative text-left w-full flex gap-x-6 rounded-lg p-4 hover:bg-gray-50" 
          on:click={() => selectItem(itm)} 
          class:bg-gray-100={itm === item}>
          <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
          </div>
          <div>
            <div class="font-semibold text-gray-900">
              {itm.name ?? "Nameless"} ({itm.base.name})
              <span class="absolute inset-0"></span>
            </div>
            <p class="mt-1 text-gray-400 font-bold">{itm.base.type}</p>
            <p class="mt-1 text-gray-600">{itm.base.description}</p>
          </div>
        </button>
        {/each}
      {:else}
      <p class="mt-1 text-gray-600 italic">No items available</p>
      {/if}
    </div>
  </div>
</div>
{/if}
</div>
