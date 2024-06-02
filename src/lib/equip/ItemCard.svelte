<script lang="ts">
	import DamageBadge from '$lib/components/DamageBadge.svelte';
	import AffixItem from './AffixItem.svelte';
	import { ArmorItem } from './items/ArmorItem';
	import { DamageItem } from './items/DamageItem';
	import type { Item } from './items/Item';

  export let item: Item;
  export let slotted = false;
</script>

<div class="flex gap-x-3">
  <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
    {#if item.iconUrl}
      <img src={item.iconUrl} alt="Item icon" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
    {/if}
  </div>
  <div>
    <div class="font-medium">
      {item.name}
      <span class="absolute inset-0"></span>
    </div>
    <p class="text-sm">{item.caption}</p>
  
    <div class="flex items-center gap-x-12 my-4">
      {#if item instanceof DamageItem}
        <p class="text-xl" class:text-indigo-700={item.damage.value.min > item.damage.base.min}>
          <DamageBadge damage={item.damage.value} showTypes />
        </p>
        
      {/if}

      {#if item instanceof ArmorItem}
        <p class="text-xl font-light flex items-center gap-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
          </svg>
          {item.armor.value}
        </p>
      {/if}

      <p class="text-xl font-light flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"/>
        </svg>
        {item.weight.value}
      </p>
    </div>

    <div class="flex gap-x-4 items-center">
      {#if item.scalingFlags.length > 0}
        <p class="text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/>
          </svg>
          
          <span class="ml-1 text-xs font-semibold">{item.scalingFlags.join(',')}</span>
        </p>
      {/if}
    </div>
  
    <dl class="divide-y divide-gray-100 my-3">
      {#each item.affixes as affix}
        <AffixItem {affix} />
      {/each}
    </dl>
    
    {#if !slotted && item.description}
    <p class="mt-1 text-gray-500 italic">{item.description}</p>
    {/if}
  </div>
</div>