<script lang="ts">
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
	import { heroState } from '$lib/hero';
	import { ComplexDamage, damageRecord, statRecord } from '$lib/core';

  const displayedStats: string[] = [
    'attackSpeed', 
    'damage', 
    'hp', 
    'fp', 
    'stamina', 
    'weight', 
    'equipLoad', 
    'discovery'
  ];
</script>

<dl class="divide-y divide-gray-100/20">
  {#each displayedStats as name}
    {@const stat = $heroState.stats[name]}
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{statRecord[name].name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={stat} />

        {#if stat instanceof ComplexDamage}
          <DamageDistBar damage={stat} />
        {/if}
      </dd>
    </div>
  {/each}
  
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistance</dt>
    <dd class="grid grid-cols-3">
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:immunity'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['res:immunity']} />
        </dd>
      </div>
  
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:robustness'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['res:robustness']} />
        </dd>
      </div>
  
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:focus'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
          <ValueBadge value={$heroState.stats['res:focus']} />
        </dd>
      </div>
  
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:vitality'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['res:vitality']} />
        </dd>
      </div>
  
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:poise'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
          <ValueBadge value={$heroState.stats['res:poise']} />
        </dd>
      </div>
    </dd>
    
    
  </div>
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Defense</dt>
    <dd class="grid grid-cols-3">
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['def:standard'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['def:standard']} />
        </dd>
      </div>
  
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['def:strike'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['def:strike']} />
        </dd>
      </div>
      
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['def:slash'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['def:slash']} />
        </dd>
      </div>
      
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['def:pierce'].name}</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['def:pierce']} />
        </dd>
      </div>
      
      <div class="col-span-2">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <span class="grid grid-cols-3 gap-2">
            {#if $heroState.stats['def:mag'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['def:mag']} /></span> 
              <div class="h-1" style:background-color={damageRecord['mag'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['def:fir'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['def:fir']} /></span> 
              <div class="h-1" style:background-color={damageRecord['fir'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['def:lit'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['def:lit']} /></span> 
              <div class="h-1" style:background-color={damageRecord['lit'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['def:hol'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['def:hol']} /></span> 
              <div class="h-1" style:background-color={damageRecord['hol'].color}></div>
            </div>
            {/if}
          </span>
        </dd>
      </div>
    </dd>
    
    
  </div>

  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Guard</dt>
    <dd class="grid grid-cols-3">
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Standard</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['guard:phy']} />
        </dd>
      </div>
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Stability</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['guard:sta']} />
        </dd>
      </div>

      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Resistance</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={$heroState.stats['guard:res']} />
        </dd>
      </div>
      
      <div>
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
        <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
          <span class="grid grid-cols-3 gap-2">
            {#if $heroState.stats['guard:mag'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['guard:mag']} /></span> 
              <div class="h-1" style:background-color={damageRecord['mag'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['guard:fir'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['guard:fir']} /></span> 
              <div class="h-1" style:background-color={damageRecord['fir'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['guard:lit'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['guard:lit']} /></span> 
              <div class="h-1" style:background-color={damageRecord['lit'].color}></div>
            </div>
            {/if}
      
            {#if $heroState.stats['guard:hol'].isPresent()}
            <div class="flex flex-col">
              <span><ValueBadge value={$heroState.stats['guard:hol']} /></span> 
              <div class="h-1" style:background-color={damageRecord['hol'].color}></div>
            </div>
            {/if}
          </span>
        </dd>
      </div>
    </dd>
  </div>
</dl>