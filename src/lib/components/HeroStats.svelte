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
      strike: $heroState.damageNegation.strike.getValue(),
      slash: $heroState.damageNegation.slash.getValue(),
      pierce: $heroState.damageNegation.pierce.getValue()
    },
    elemental: {
      [AttackDamageType.PHYSICAL]: $heroState.damageNegation.elemental.phy.getValue(),
      [AttackDamageType.MAGIC]: $heroState.damageNegation.elemental.mag.getValue(),
      [AttackDamageType.FIRE]: $heroState.damageNegation.elemental.fir.getValue(),
      [AttackDamageType.LIGHTNING]: $heroState.damageNegation.elemental.lit.getValue(),
      [AttackDamageType.HOLY]: $heroState.damageNegation.elemental.hol.getValue()
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
        value={$heroState.attack.getValue()} 
        isModified={$heroState.attack.isModified()} 
      />
      <DamageDistBar damage={$heroState.attack.getValue()} />
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
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Immunity</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.resistance.immunity.getValue()} 
          isModified={$heroState.resistance.immunity.isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Robustness</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.resistance.robustness.getValue()} 
          isModified={$heroState.resistance.robustness.isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Focus</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge 
          value={$heroState.resistance.focus.getValue()} 
          isModified={$heroState.resistance.focus.isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Vitality</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={$heroState.resistance.vitality.getValue()} 
          isModified={$heroState.resistance.vitality.isModified()}
        />
      </dd>
    </div>

    <div>
      <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Poise</dt>
      <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2">
        <ValueBadge 
          value={$heroState.resistance.poise.getValue()} 
          isModified={$heroState.resistance.poise.isModified()}
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