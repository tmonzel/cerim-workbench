<script lang="ts">
	import { statRecord } from '$lib/records';
	import type { HeroState } from '$lib/hero';
	import DamageDistBar from '$lib/components/DamageDistBar.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import HeroWeightStatus from './HeroWeightStatus.svelte';

  export let hero: HeroState;

  let activeTab = 'general';

  const tabs: { key: string; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'protection', label: 'Protection' }
  ];

  function calcDamageNegation(m: number): number {
    return Math.round(((1 - m) * 100) * 1000) / 1000;
  }
</script>

<div class="hero-stats-panel">
  <div class="text-sm font-medium text-center border-b text-gray-400 border-gray-700">
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
      <dt class="text-sm font-medium leading-6 text-zinc-500">Attack</dt>
      <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
        <div class="mb-2 font-semibold">
          {Math.round(hero.attack.getTotal() * 10) / 10}
        </div>
        <DamageDistBar attack={hero.attack} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.hp.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.hp} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.fp.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.fp} />
      </dd>
    </div>

    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.stamina.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.stamina} />
      </dd>
    </div>

    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.discovery.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        {Math.floor(hero.stats.value.discovery.total * 100)}
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">Poise</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.poise} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.weight.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.weight} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">{statRecord.equipLoad.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <ValueBadge value={hero.stats.value.equipLoad} />
      </dd>
    </div>
    <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-500">Weight Status</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-70 sm:col-span-2 sm:mt-0">
        <HeroWeightStatus  weightRatio={hero.weightRatio} />
      </dd>
    </div>
    
  </dl>
  {:else if activeTab === 'protection'}
  <dl class="divide-y divide-gray-100/20">
    <div class="px-2 py-4 sm:grid sm:gap-3 sm:px-0">
      <dt class="text-sm font-medium leading-6">Resistance</dt>
      <dd class="grid grid-cols-2 gap-4">
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
      </dd>
    </div>
    <div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Damage Negation</dt>
      <dd class="grid grid-cols-2 gap-4">
        <StatBadge name="Standard">
          <ValueBadge value={hero.defense.value['standard']} /> / {calcDamageNegation(hero.damageNegation.value['standard'].multiplier)}%
        </StatBadge>

        <StatBadge name="Strike">
          <ValueBadge value={hero.defense.value['strike']} /> / {calcDamageNegation(hero.damageNegation.value['strike'].multiplier)}%
        </StatBadge>

        <StatBadge name="Slash">
          <ValueBadge value={hero.defense.value['slash']} /> / {calcDamageNegation(hero.damageNegation.value['slash'].multiplier)}%
        </StatBadge>

        <StatBadge name="Pierce">
          <ValueBadge value={hero.defense.value['pierce']} /> / {calcDamageNegation(hero.damageNegation.value['pierce'].multiplier)}%
        </StatBadge>
        
        <div class="col-span-2">
          <dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
          <dd class="grid grid-cols-3 gap-2">
            <AttackTypeBadge type="mag">
              <ValueBadge value={hero.defense.value['mag']} /> / {calcDamageNegation(hero.damageNegation.value['mag'].multiplier)}%
            </AttackTypeBadge>

            <AttackTypeBadge type="fir">
              <ValueBadge value={hero.defense.value['fir']} /> / {calcDamageNegation(hero.damageNegation.value['fir'].multiplier)}%
            </AttackTypeBadge>

            <AttackTypeBadge type="lit">
              <ValueBadge value={hero.defense.value['lit']} /> / {calcDamageNegation(hero.damageNegation.value['lit'].multiplier)}%
            </AttackTypeBadge>

            <AttackTypeBadge type="hol">
              <ValueBadge value={hero.defense.value['hol']} /> / {calcDamageNegation(hero.damageNegation.value['hol'].multiplier)}%
            </AttackTypeBadge>
          </dd>
        </div>
      </dd>
    </div>
  
    <div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-zinc-300">Guard</dt>
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
          <dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
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