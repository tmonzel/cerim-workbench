<script lang="ts">
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
  import AttackTypeBadge from './AttackTypeBadge.svelte';
	import { statRecord } from '$lib/records';
	import type { HeroState } from '$lib/state';
	import { StatType } from '$lib/core/types';
	import StatBadge from './StatBadge.svelte';

  export let hero: HeroState;

  let activeTab = 'general';

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
          {Math.round(hero.attack.getTotal() * 10) / 10}
        </div>
        <DamageDistBar attack={hero.attack} />
      </dd>
    </div>
    {#each Object.values(StatType) as name}
      {@const stat = hero.stats.value[name]}
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
    <div class="px-2 py-4 sm:grid sm:gap-3 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistance</dt>
      <dd class="grid grid-cols-3 gap-4">
        <StatBadge name="Immunity">
          <ValueBadge value={hero.resistance.value['immunity']} />
        </StatBadge>

        <StatBadge name="Robustness">
          <ValueBadge value={hero.resistance.value['robustness']} />
        </StatBadge>

        <StatBadge name="Focus">
          <ValueBadge value={hero.resistance.value['focus']} />
        </StatBadge>

        <StatBadge name="Vitality">
          <ValueBadge value={hero.resistance.value['vitality']} />
        </StatBadge>

        <StatBadge name="Poise">
          <ValueBadge value={hero.resistance.value['poise']} />
        </StatBadge>
      </dd>
    </div>
    <div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Defense / Damage Negation</dt>
      <dd class="grid grid-cols-3 gap-4">
        <StatBadge name="Standard">
          <ValueBadge value={hero.defense.value['standard']} /> / <ValueBadge value={hero.damageNegation.value['standard']} />
        </StatBadge>

        <StatBadge name="Strike">
          <ValueBadge value={hero.defense.value['strike']} /> / <ValueBadge value={hero.damageNegation.value['strike']} />
        </StatBadge>

        <StatBadge name="Slash">
          <ValueBadge value={hero.defense.value['slash']} /> / <ValueBadge value={hero.damageNegation.value['slash']} />
        </StatBadge>

        <StatBadge name="Pierce">
          <ValueBadge value={hero.defense.value['pierce']} /> / <ValueBadge value={hero.damageNegation.value['pierce']} />
        </StatBadge>
        
        <div class="col-span-2">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
          <dd class="grid grid-cols-3 gap-2">
            <AttackTypeBadge type="mag">
              <ValueBadge value={hero.defense.value['mag']} /> / <ValueBadge value={hero.damageNegation.value['mag']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="fir">
              <ValueBadge value={hero.defense.value['fir']} /> / <ValueBadge value={hero.damageNegation.value['fir']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="lit">
              <ValueBadge value={hero.defense.value['lit']} /> / <ValueBadge value={hero.damageNegation.value['lit']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="hol">
              <ValueBadge value={hero.defense.value['hol']} /> / <ValueBadge value={hero.damageNegation.value['hol']} />
            </AttackTypeBadge>
          </dd>
        </div>
      </dd>
    </div>
  
    <div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Guard</dt>
      <dd class="grid grid-cols-3 gap-4">
        <StatBadge name="Standard">
          <ValueBadge value={hero.guard.value['phy']} />
        </StatBadge>

        <StatBadge name="Stability">
          <ValueBadge value={hero.guard.value['sta']} />
        </StatBadge>

        <StatBadge name="Resistance">
          <ValueBadge value={hero.guard.value['res']} />
        </StatBadge>
        
        <div class="col-span-3">
          <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
          <dd class="grid grid-cols-3 gap-2">
            <AttackTypeBadge type="mag">
              <ValueBadge value={hero.guard.value['mag']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="fir">
              <ValueBadge value={hero.guard.value['mag']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="lit">
              <ValueBadge value={hero.guard.value['mag']} />
            </AttackTypeBadge>

            <AttackTypeBadge type="hol">
              <ValueBadge value={hero.guard.value['mag']} />
            </AttackTypeBadge>
          </dd>
        </div>
      </dd>
    </div>
  </dl>
  {/if}
</div>