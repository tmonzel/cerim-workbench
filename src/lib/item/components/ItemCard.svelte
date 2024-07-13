<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import DamageScalingChart from '$lib/components/DamageScalingChart.svelte';
	import { sum } from '$lib/core';
	import { AffinityType, AttributeType } from '$lib/core/types';
	import { affinityRecord, itemTypeRecord } from '$lib/records';
	import type { Item } from '../Item';
	import ItemDamageNegationGrid from './ItemDamageNegationGrid.svelte';
	import ItemGuardGrid from './ItemGuardGrid.svelte';
	import ItemResistanceGrid from './ItemResistanceGrid.svelte';
	import ItemModifierList from './ItemModifierList.svelte';
	import ItemInfo from './ItemInfo.svelte';
	import { AttackItem } from '../AttackItem';

  export let item: Item;
  export let displayMode: 'detail' | 'equipped' = 'detail';

  let totalDamageNegation: number;
  
  $: {
    if(item.damageNegation) {
      totalDamageNegation = Math.round(sum({ ...item.damageNegation, ...item.damageNegation }) * 10) / 10;
    }
  }
</script>

<div class="flex gap-x-5 dark:text-zinc-200">
  <div class="basis-2/6 flex justify-center">
    <div>
      <div class="rounded-lg p-2">
        {#if item.iconUrl}
          <img src={item.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150" />
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="basis-4/6">
    <div class="font-medium text-lg">
      {#if item instanceof AttackItem && item.affinity && item.affinity !== AffinityType.STANDARD}
        <span class="font-bold">{affinityRecord[item.affinity].name}</span>
      {/if} 
      {item.name} {#if item.tier > 0}(+{item.tier}){/if}
    </div>
    <p class="text-sm dark:text-zinc-400">{itemTypeRecord[item.type].name}</p>
  
    <div class="flex items-center gap-x-12 mt-3 mb-2">
      {#if displayMode === 'detail' && item instanceof AttackItem}
        <p class="grow text-xl flex gap-2">
          <AttackBadge attack={item.attack} />
        </p>
      {:else if item instanceof AttackItem && item.scaledAttack}
        <p class="grow text-xl flex gap-2">
          <AttackBadge attack={item.scaledAttack} />
        </p>
      {/if}

      {#if totalDamageNegation}
        <p class="text-xl font-light flex items-center gap-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
            <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
          </svg>
          {totalDamageNegation}
        </p>
      {/if}

      {#if item.weight > 0}
      <p class="text-xl font-light flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
          <path d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"/>
        </svg>
        {item.weight}
      </p>
      {/if}
    </div>

    {#if displayMode === 'detail' && item instanceof AttackItem}
      <div class="mb-3">
        <AttackDetail attack={item.attack} />
      </div>
    {:else if item instanceof AttackItem && item.scaledAttack}
      <div class="mb-3">
        <AttackDetail attack={item.scaledAttack} />
      </div>
    {/if}

    <ItemInfo {item} />

    {#if item instanceof AttackItem && item.scaling}
    <div class="mt-5 flex flex-wrap gap-x-5">
      {#if item.scaling.str}
        <DamageScalingChart {item} attributeType={AttributeType.STRENGTH} showAttackTypes={item.scaling.str.allowedDamageTypes} />
      {/if}

      {#if item.scaling.dex}
        <DamageScalingChart {item} attributeType={AttributeType.DEXTERITY} showAttackTypes={item.scaling.dex.allowedDamageTypes} />
      {/if}

      {#if item.scaling.int}
        <DamageScalingChart {item} attributeType={AttributeType.INTELLIGENCE} showAttackTypes={item.scaling.int.allowedDamageTypes} />
      {/if}

      {#if item.scaling.fth}
        <DamageScalingChart {item} attributeType={AttributeType.FAITH} showAttackTypes={item.scaling.fth.allowedDamageTypes} />
      {/if}

      {#if item.scaling.arc}
        <DamageScalingChart {item} attributeType={AttributeType.ARCANE} showAttackTypes={item.scaling.arc.allowedDamageTypes} />
      {/if}
    </div>
    {/if}

    {#if displayMode === 'detail' || displayMode === 'equipped'}
    <dl class="divide-y divide-gray-100/20 my-3">
      {#if item.resistance}
      <div class="px-4 py-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300 mb-2">Resistance</dt>
        <dd><ItemResistanceGrid resistance={item.resistance} /></dd>
      </div>
      {/if}
      
      {#if item.damageNegation}
      <div class="px-4 py-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300 mb-2">Damage Negation</dt>
        <dd><ItemDamageNegationGrid damageNegation={item.damageNegation} /></dd>
      </div>
      {/if}

      {#if item instanceof AttackItem}
      <div class="px-4 py-4 sm:grid sm:gap-2 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Guard</dt>
        <dd><ItemGuardGrid guard={item.guard} /></dd>
      </div>
      {/if}
    </dl>
    {/if}
    
    <ItemModifierList data={item.modifiers} />

    {#if item.effects}
      <p class="text-sm font-medium">Effects</p>
      {#each item.effects as effect}
        <p class="mt-1 text-gray-500 text-sm font-medium">{effect}</p>
      {/each}
    {/if}
    
    {#if displayMode !== 'equipped' && item.description}
    <p class="mt-1 text-gray-500 italic">{item.description}</p>
    {/if}
  </div>
</div>