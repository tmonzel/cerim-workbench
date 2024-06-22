<script lang="ts">
	import { derived } from 'svelte/store';
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';
	import { heroState } from '$lib/hero';

  const stats = derived(heroState, (hero) => hero.stats);; 
</script>

<dl class="divide-y divide-gray-100/20">
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">APS</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-70 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.attackSpeed.getValue()} 
        isModified={$stats.attackSpeed.isModified()} 
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Damage</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$heroState.attack.getValue()} 
        isModified={$heroState.attack.isModified()} 
      />
      <DamageDistBar damage={$heroState.attack.getValue()} />
    </dd>
  </div>
  <div class="px-4 py-4 text-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="font-medium leading-6 text-gray-900 dark:text-zinc-300">Health</dt>
    <dd class="mt-1 leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.health.getValue()} 
        isModified={$stats.health.isModified()} 
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Stamina</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.stamina.getValue()} 
        isModified={$stats.stamina.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Focus</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.focus.getValue()} 
        isModified={$stats.focus.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Robustness</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.robustness.getValue()} 
        isModified={$stats.robustness.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Immunity</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.immunity.getValue()} 
        isModified={$stats.immunity.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Vitality</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.vitality.getValue()} 
        isModified={$stats.vitality.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Armor</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.armor.getValue()} 
        isModified={$stats.armor.isModified()} 
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
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Poise Defense</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.poise.getValue()} 
        isModified={$stats.poise.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Equip Load</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.equipLoad.getValue()} 
        isModified={$stats.equipLoad.isModified()}
      />
    </dd>
  </div>
  <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-300">Resistances</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
      <ValueBadge 
        value={$stats.resistance.getValue()} 
        isModified={$stats.resistance.isModified()}
      />
    </dd>
  </div>
</dl>