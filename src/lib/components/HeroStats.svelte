<script lang="ts">
	import { derived } from 'svelte/store';
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
	import { heroState } from '$lib/hero';
	import { AttackDamageType } from '$lib/core';
	import DamageNegationStat from './DamageNegationStat.svelte';

  const stats = derived(heroState, (hero) => hero.stats);

  $: damageNegation = {
    attack: {
      strike: $heroState.stats['def:strike'].getValue(),
      slash: $heroState.stats['def:slash'].getValue(),
      pierce: $heroState.stats['def:pierce'].getValue()
    },
    elemental: {
      [AttackDamageType.PHYSICAL]: $heroState.stats['def:phy'].getValue(),
      [AttackDamageType.MAGIC]: $heroState.stats['def:mag'].getValue(),
      [AttackDamageType.FIRE]: $heroState.stats['def:fir'].getValue(),
      [AttackDamageType.LIGHTNING]: $heroState.stats['def:lit'].getValue(),
      [AttackDamageType.HOLY]: $heroState.stats['def:hol'].getValue()
    }
  };

</script>

<dl class="divide-y divide-gray-100/20">
  <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">APS</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.attackSpeed.getValue()} 
        isModified={$stats.attackSpeed.isModified()} 
      />
    </dd>
  </div>
  <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Damage</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$heroState.stats['damage'].getValue()} 
        isModified={$heroState.stats['damage'].isModified()} 
      />
      <DamageDistBar damage={$heroState.stats['damage'].getValue()} />
    </dd>
  </div>
  <div class="px-4 py-3 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="font-medium leading-6 text-gray-900 dark:text-zinc-300">Health</dt>
    <dd class="mt-1 leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.hp.getValue()} 
        isModified={$stats.hp.isModified()} 
      />
    </dd>
  </div>
  <div class="px-4 py-3 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="font-medium leading-6 text-gray-900 dark:text-zinc-300">FP</dt>
    <dd class="mt-1 leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.fp.getValue()} 
        isModified={$stats.fp.isModified()} 
      />
    </dd>
  </div>
  <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Stamina</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.stamina.getValue()} 
        isModified={$stats.stamina.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Weight</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.weight.getValue()} 
        isModified={$stats.weight.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Equip Load</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.equipLoad.getValue()} 
        isModified={$stats.equipLoad.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Discovery</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.discovery.getValue()} 
        isModified={$stats.discovery.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistance</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0"></dd>
    
    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:immunity'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.stats['res:immunity'].getValue()} 
          isModified={$heroState.stats['res:immunity'].isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:robustness'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.stats['res:robustness'].getValue()} 
          isModified={$heroState.stats['res:robustness'].isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:focus'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge 
          value={$heroState.stats['res:focus'].getValue()} 
          isModified={$heroState.stats['res:focus'].isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:vitality'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.stats['res:vitality'].getValue()} 
          isModified={$heroState.stats['res:vitality'].isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">{$heroState.stats['res:poise'].name}</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge 
          value={$heroState.stats['res:poise'].getValue()} 
          isModified={$heroState.stats['res:poise'].isModified()}
        />
      </dd>
    </div>
  </div>
  <div class="px-4 py-3 sm:grid sm:gap-2 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Damage Negation</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0"></dd>
    
    <DamageNegationStat value={damageNegation} />
  </div>
</dl>