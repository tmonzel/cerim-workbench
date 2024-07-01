<script lang="ts">
	import { Item, list, sum } from '$lib/core';
	import { affinityRecord, attributeRecord, equipRecord } from '$lib/records';
	import DamageBadge from './DamageBadge.svelte';
	import DamageDetail from './DamageDetail.svelte';
	import ElementalGrid from './ElementalGrid.svelte';
	import ModifierList from './ModifierList.svelte';

  export let item: Item;
  export let displayMode: 'detail' | 'equipped' = 'detail';

  let protection: number;
  
  $: scalingFlags = item.getScalingFlags();
  $: {
    if(item.defense) {
      protection = Math.round(sum({ ...item.defense.elemental, ...item.defense.physical }) * 10) / 10;
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
      {#if item.affinity && item.affinities}
        <span class="font-bold">{affinityRecord[item.affinity].name}</span>
      {/if} 
      {item.name} {#if item.tier > 0}(+{item.tier}){/if}
    </div>
    <p class="text-sm dark:text-zinc-400">{equipRecord[item.type].name}</p>
  
    <div class="flex items-center gap-x-12 mt-3 mb-2">
      {#if displayMode === 'detail' && item.damage}
        <p class="text-xl flex gap-2">
          <DamageBadge damage={item.damage} />
        </p>
      {:else if item.scaledDamage}
        <p class="text-xl flex gap-2">
          <DamageBadge damage={item.scaledDamage} />
        </p>
      {/if}

      {#if protection}
        <p class="text-xl font-light flex items-center gap-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
            <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
          </svg>
          {protection}
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

    {#if displayMode === 'detail' && item.damage}
      <div class="mb-3">
        <DamageDetail damage={item.damage} />
      </div>
    {:else if item.scaledDamage}
      <div class="mb-3">
        <DamageDetail damage={item.scaledDamage} />
      </div>
    {/if}

    <div class="flex gap-x-8 items-center">
      {#if item.requirements && item.requirements.attributes}
        <div class="flex items-start text-sm">
          <svg class="me-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e4e4e7"><path d="M655-200 513-342l56-56 85 85 170-170 56 57-225 226Zm0-320L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z"/></svg>
          <div>
          {#each list(item.requirements.attributes) as attr}
            <div class="flex items-center">
              <span style:background-color={attributeRecord[attr.key].color} class="me-2 w-2.5 h-2.5 rounded"></span>
              <span class="text-white">{attr.value}</span>
            </div>
          {/each}
          </div>
        </div>
      {/if}

      {#if scalingFlags.length > 0}
        <div class="flex items-start text-sm">
          <svg class="me-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e4e4e7">
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/>
          </svg>
          <div>
          {#each scalingFlags as flag}
            <div class="flex items-center">
              <span style:background-color={attributeRecord[flag.attr].color} class="me-2 w-2.5 h-2.5 rounded"></span>
              <span class="text-white">{flag.id}</span>
            </div>
          {/each}
          </div>
        </div>
      {/if}

      {#if item.attackSpeed !== undefined}
      <p class="text-xs flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e4e4e7"><path d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61Zm62-460q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z"/></svg>
        <span class="ml-1 text-xs font-semibold">{item.attackSpeed}</span>
      </p>
      {/if}
    </div>

    {#if displayMode === 'detail' || displayMode === 'equipped'}

    <dl class="divide-y divide-gray-100/20 my-3">
      {#if item.resistance}
      <div class="px-4 py-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300 mb-2">Resistance</dt>
        <dd class="text-sm grid grid-cols-3 gap-x-5 gap-y-1">
          <div class="flex justify-between">
            <span class="text-zinc-400">Immunity</span> <span>{item.resistance.immunity}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Robustness</span> <span>{item.resistance.robustness}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Focus</span> <span>{item.resistance.focus}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Vitality</span> <span>{item.resistance.vitality}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Poise</span> <span>{item.resistance.poise}</span>
          </div>
        </dd>
      </div>
      {/if}
      
      {#if item.defense}
      <div class="px-4 py-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300 mb-2">Defense</dt>
        <dd class="grid grid-cols-3 gap-3">
          <div>
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Standard</dt>
            <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              {item.defense.physical.standard}
            </dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Strike</dt>
            <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              {item.defense.physical.strike}
            </dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Slash</dt>
            <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              {item.defense.physical.slash}
            </dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Pierce</dt>
            <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              {item.defense.physical.pierce}
            </dd>
          </div>
          
          <div class="col-span-2">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
            <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              <ElementalGrid value={item.defense.elemental} />
            </dd>
          </div>
        </dd>
      </div>
      {/if}

      {#if item.guard}
      <div class="px-4 py-4 sm:grid sm:gap-2 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Guard</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <div class="grid grid-cols-3 gap-5">
            <div>
              <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Standard</dt>
              <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                {Math.round(item.guard.phy * 10) / 10}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Stability</dt>
              <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                {Math.round(item.guard.sta * 10) / 10}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Resistance</dt>
              <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                {Math.round(item.guard.res * 10) / 10}
              </dd>
            </div>
            <div class="col-span-3">
              <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
              <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                <ElementalGrid value={ { 
                  mag: item.guard.mag, 
                  fir: item.guard.fir, 
                  lit: item.guard.lit, 
                  hol: item.guard.hol 
                }} />
              </dd>
            </div>
          </div>
        </dd>
      </div>
      {/if}
    </dl>

    {/if}
    
    <ModifierList data={item.modifiers} />

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