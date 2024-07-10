<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import { AffinityType } from '$lib/core/types';
	import { affinityRecord, itemTypeRecord } from '$lib/records';
	import type { Item } from '../Item';
	import ItemDamageNegationGrid from './ItemDamageNegationGrid.svelte';
	import ItemInfo from './ItemInfo.svelte';
	import ItemModifierList from './ItemModifierList.svelte';

  export let item: Item;
</script>

<div class="flex gap-x-4 items-center">
  <div class="w-28">
    <img src={item.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150" />
  </div>
  <div class="flex-auto">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-lg font-medium leading-5 text-zinc-300">
          {#if item.affinity && item.affinity !== AffinityType.STANDARD}
            <span class="font-bold">{affinityRecord[item.affinity].name}</span>
          {/if} 
          {item.name} {#if item.tier > 0}(+{item.tier}){/if}
        </p>
        <p class="text-md text-zinc-500 mb-4">{itemTypeRecord[item.type].name}</p>
      </div>
      <p class="text-lg font-light flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ddd">
          <path d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"/>
        </svg>
        {item.weight}
      </p>
    </div>
    
    {#if item.attack}
      <div class="mb-3">
        <div class="text-lg mb-1 font-medium">
          <AttackBadge attack={item.attack} />
        </div>
        <div class="max-w-48">
          <AttackDetail attack={item.attack} compact />
        </div>
      </div>
    {/if}

    <ItemInfo {item} />

    {#if item.damageNegation}
      <div class="px-4 py-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300 mb-2">Damage Negation</dt>
        <dd><ItemDamageNegationGrid damageNegation={item.damageNegation} /></dd>
      </div>
    {/if}

    <ItemModifierList data={item.modifiers} />
    
    {#if item.effects}
      <p class="text-sm font-medium">Effects</p>
      {#each item.effects as effect}
        <p class="mt-1 text-gray-500 text-sm font-medium">{effect}</p>
      {/each}
    {/if}
  </div>
</div>