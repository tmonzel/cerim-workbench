<script lang="ts">
	import DamageDistBar from '$lib/components/DamageDistBar.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import { AffinityType, FlatResistance } from '$lib/core';
	import { FlatAttribute } from '$lib/core/values/FlatAttribute';
	import type { Item } from './Item';

  export let item: Item;
  export let slotted = false;

  const affinityNameMap: Record<AffinityType, string> = {
	  standard: 'Standard',
	  heavy: 'Heavy',
	  keen: 'Keen',
	  quality: 'Quality',
	  fire: 'Fire',
	  lightning: 'Lightning',
	  sacred: 'Sacred',
	  [AffinityType.COLD]: 'Cold'
  }

  $: stats = item.stats;
  $: scalingFlags = item.getScalingFlags();
  $: weight = stats.weight.getValue();
</script>

<div class="flex gap-x-3 dark:text-zinc-200">
  <div class="mt-1 flex h-40 w-40 flex-none items-center justify-center rounded-md bg-neutral-800/50 p-3">
    {#if item.iconUrl}
      <img src={item.iconUrl} alt="Item icon" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
    {/if}
  </div>
  <div class="grow">
    <div class="font-medium relative text-lg">
      {#if item.affinity && item.upgrades}<span class="font-bold">{affinityNameMap[item.affinity]}</span>{/if} {item.name} {#if item.tier > 0}(+{item.tier}){/if}
      <span class="absolute inset-0"></span>
    </div>
    <p class="text-sm dark:text-zinc-400">{item.caption}</p>
  
    <div class="flex items-center gap-x-12 mt-3 mb-2">
      {#if item.type === 'weapon'}
        <p class="text-xl flex gap-2">
          <ValueBadge value={item.attack.getValue()} isModified={item.attack.isModified()} />
        </p>
      {/if}

      {#if item.type === 'armor'}
        <p class="text-xl font-light flex items-center gap-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
            <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
          </svg>
          <ValueBadge value={stats.armor.getValue()} isModified={stats.armor.isModified()} />
        </p>
      {/if}

      {#if weight > 0}
      <p class="text-xl font-light flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
          <path d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"/>
        </svg>
        <ValueBadge value={weight} isModified={stats.weight.isModified()} />
      </p>
      {/if}
    </div>

    {#if item.type === 'weapon'}
      <div class="mb-3 max-w-16">
        <DamageDistBar damage={item.attack.getValue()} />
      </div>
    {/if}

    <div class="flex gap-x-4 items-center">
      {#if scalingFlags.length > 0}
        <p class="text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e4e4e7">
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/>
          </svg>
          {#each scalingFlags as flag}
          <span class="ml-1 text-xs">{flag.name}</span>
          <span class="ml-1 text-xs font-semibold text-emerald-400">({flag.id})</span>
          {/each}
        </p>
      {/if}
      {#if stats.attackSpeed.getValue() > 0}
      <p class="text-xs flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e4e4e7"><path d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61Zm62-460q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z"/></svg>
        <span class="ml-1 text-xs font-semibold">{stats.attackSpeed.getValue()}</span>
      </p>
      {/if}
    </div>
  
    <dl class="divide-y divide-gray-100/20 my-3">
      {#each item.modifications as mod}
        {#if mod.type === 'flat'}
          <div class="py-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-4">{mod.name}{#if mod.tier > 0}({mod.tier}){/if}</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-2 sm:mt-0">
              {#if mod.value instanceof FlatResistance || mod.value instanceof FlatAttribute}
                <ValueBadge value={mod.value} />
              {:else}
                +<ValueBadge value={mod.value} />
              {/if}
            </dd>
          </div>
        {/if}

        {#if mod.type === 'percentual'}
          {@const percentage = mod.value - 1}
          <div class="py-2 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200 sm:col-span-4">{mod.name}({mod.tier})</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-zinc-200 sm:col-span-2 sm:mt-0">
              {#if percentage >= 0}+{/if}{Math.round(percentage * 100)}%
            </dd>
          </div>
        {/if}
      {/each}
    </dl>

    {#if item.effects}
      <p class="text-sm font-medium">Effects</p>
      {#each item.effects as effect}
        <p class="mt-1 text-gray-500 text-sm font-medium">{effect}</p>
      {/each}
    {/if}
    
    {#if !slotted && item.description}
    <p class="mt-1 text-gray-500 italic">{item.description}</p>
    {/if}
  </div>
</div>