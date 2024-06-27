<script lang="ts">
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
	import { heroState } from '$lib/hero';
	import { ComplexDamage, damageRecord, type AffectedStat } from '$lib/core';

  const displayedStats: AffectedStat[] = [
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
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">{stat.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={stat.value} />

        {#if stat.value instanceof ComplexDamage}
          <DamageDistBar damage={stat.value} />
        {/if}
      </dd>
    </div>
  {/each}
  
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistance</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0"></dd>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:immunity'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['res:immunity'].value} />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:robustness'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['res:robustness'].value} />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:focus'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge value={$heroState.stats['res:focus'].value} />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:vitality'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['res:vitality'].value} />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:poise'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge value={$heroState.stats['res:poise'].value} />
      </dd>
    </div>
  </div>
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Defense</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0"></dd>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Strike</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['def:strike'].value} />
      </dd>
    </div>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Slash</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['def:slash'].value} />
      </dd>
    </div>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Pierce</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['def:pierce'].value} />
      </dd>
    </div>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <span class="grid grid-cols-3 gap-2">
          {#if $heroState.stats['def:phy'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['def:phy'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['phy'].color}></div>
          </div> 
          {/if}
      
          {#if $heroState.stats['def:mag'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['def:mag'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['mag'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['def:fir'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['def:fir'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['fir'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['def:lit'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['def:lit'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['lit'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['def:hol'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['def:hol'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['hol'].color}></div>
          </div>
          {/if}
        </span>
      </dd>
    </div>
  </div>

  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Guard</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0"></dd>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Stability</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['guard:sta'].value} />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Resistance</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge value={$heroState.stats['guard:res'].value} />
      </dd>
    </div>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <span class="grid grid-cols-3 gap-2">
          {#if $heroState.stats['guard:phy'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['guard:phy'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['phy'].color}></div>
          </div> 
          {/if}
      
          {#if $heroState.stats['guard:mag'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['guard:mag'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['mag'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['guard:fir'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['guard:fir'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['fir'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['guard:lit'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['guard:lit'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['lit'].color}></div>
          </div>
          {/if}
    
          {#if $heroState.stats['guard:hol'].value.isPresent()}
          <div class="flex flex-col">
            <span><ValueBadge value={$heroState.stats['guard:hol'].value} /></span> 
            <div class="h-1" style:background-color={damageRecord['hol'].color}></div>
          </div>
          {/if}
        </span>
      </dd>
    </div>
  </div>
</dl>