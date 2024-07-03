<script lang="ts">
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
	import { attackTypeRecord, statRecord } from '$lib/records';
	import { type HeroStats } from '$lib/core';
	import type { HeroState } from '$lib/state';

  export let hero: HeroState;

  let activeTab = 'general';

  const displayedStats: (keyof HeroStats)[] = [
    'hp', 
    'fp', 
    'stamina', 
    'weight', 
    'equipLoad', 
    'discovery'
  ];

  const tabs: { key: string; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'protection', label: 'Protection' }
  ]
</script>

<div class="hero-stats-panel">
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex -mb-px">
      {#each tabs as tab}
      <li class="grow">
        <button 
          class="w-full p-4 rounded-t-lg border-amber-300" 
          class:border-b-2={activeTab === tab.key} 
          class:text-amber-300={activeTab === tab.key}
          on:click={() => activeTab = tab.key}>
          {tab.label}
        </button>
      </li>
      {/each}
    </ul>
  </div>
  {#if activeTab === 'general'}
  <dl class="divide-y divide-gray-100/20">
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Attack</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
        <div class="mb-2 font-semibold">
          <ValueBadge value={hero.attack} />
        </div>
        <DamageDistBar attack={hero.attack} />
      </dd>
    </div>
    {#each displayedStats as name}
      {@const stat = hero.stats[name]}
      <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{statRecord[name].name}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
          <ValueBadge value={stat} />
        </dd>
      </div>
    {/each}
  </dl>
  {:else if activeTab === 'protection'}
  <dl class="divide-y divide-gray-100/20">
    <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistance</dt>
      <dd class="grid grid-cols-3">
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:immunity'].name}</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['res:immunity']} />
          </dd>
        </div>
    
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:robustness'].name}</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['res:robustness']} />
          </dd>
        </div>
    
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:focus'].name}</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
            <ValueBadge value={hero.stats['res:focus']} />
          </dd>
        </div>
    
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:vitality'].name}</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['res:vitality']} />
          </dd>
        </div>
    
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{statRecord['res:poise'].name}</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
            <ValueBadge value={hero.stats['res:poise']} />
          </dd>
        </div>
      </dd>
      
      
    </div>
    <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Defense</dt>
      <dd class="grid grid-cols-3">
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Standard</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['def:standard']} />
          </dd>
        </div>
    
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Strike</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['def:strike']} />
          </dd>
        </div>
        
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Slash</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['def:slash']} />
          </dd>
        </div>
        
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Pierce</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['def:pierce']} />
          </dd>
        </div>
        
        <div class="col-span-2">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <span class="grid grid-cols-3 gap-2">
              {#if hero.stats['def:mag'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['def:mag']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['mag'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['def:fir'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['def:fir']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['fir'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['def:lit'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['def:lit']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['lit'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['def:hol'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['def:hol']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['hol'].color}></div>
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
            <ValueBadge value={hero.stats['guard:phy']} />
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Stability</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['guard:sta']} />
          </dd>
        </div>
  
        <div>
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Resistance</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <ValueBadge value={hero.stats['guard:res']} />
          </dd>
        </div>
        
        <div class="col-span-3">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
          <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <span class="grid grid-cols-3 gap-2">
              {#if hero.stats['guard:mag'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['guard:mag']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['mag'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['guard:fir'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['guard:fir']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['fir'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['guard:lit'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['guard:lit']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['lit'].color}></div>
              </div>
              {/if}
        
              {#if hero.stats['guard:hol'].isPresent()}
              <div class="flex flex-col">
                <span><ValueBadge value={hero.stats['guard:hol']} /></span> 
                <div class="h-1" style:background-color={attackTypeRecord['hol'].color}></div>
              </div>
              {/if}
            </span>
          </dd>
        </div>
      </dd>
    </div>
  </dl>
  {/if}
</div>