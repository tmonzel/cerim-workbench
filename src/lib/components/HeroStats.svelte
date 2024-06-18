<script lang="ts">
	import type { HeroStats } from '$lib/hero';
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';

  export let stats: HeroStats; 
</script>

<div class="mt-6 border-t border-gray-100">
  <dl class="divide-y divide-gray-100">
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">APS</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.attackSpeed.getValue()} 
          isModified={stats.attackSpeed.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Damage</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.damage.getValue()} 
          isModified={stats.damage.isModified()} 
        />
        <DamageDistBar damage={stats.damage.getValue()} />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Health</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.health.getValue()} 
          isModified={stats.health.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Stamina</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.stamina.getValue()} 
          isModified={stats.stamina.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Armor</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.armor.getValue()} 
          isModified={stats.armor.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Weight</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.weight.getValue()} 
          isModified={stats.weight.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Poise Defense</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.poise.getValue()} 
          isModified={stats.poise.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Equip Load</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.equipLoad.getValue()} 
          isModified={stats.equipLoad.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Resistances</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.resistance.getValue()} 
          isModified={stats.resistance.isModified()}
        />
      </dd>
    </div>
  </dl>
</div>