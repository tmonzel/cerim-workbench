<script lang="ts">
	import type { HeroStats } from '$lib/hero';
	import DamageDistBar from './DamageDistBar.svelte';
	import ValueBadge from './ValueBadge.svelte';

  export let stats: HeroStats; 
</script>

<div class="mt-6 border-t border-gray-100">
  <dl class="divide-y divide-gray-100">
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">{stats.attackSpeed.label}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.attackSpeed.value.getTotal()} 
          isModified={stats.attackSpeed.value.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Damage</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.damage.value.getTotal()} 
          isModified={stats.damage.value.isModified()} 
        />
        <DamageDistBar damage={stats.damage.value.getTotal()} />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Health</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.health.value.getTotal()} 
          isModified={stats.health.value.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Stamina</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.stamina.value.getTotal()} 
          isModified={stats.stamina.value.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Armor</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.armor.value.getTotal()} 
          isModified={stats.armor.value.isModified()} 
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Weight</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.weight.value.getTotal()} 
          isModified={stats.weight.value.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Poise Defense</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.poise.value.getTotal()} 
          isModified={stats.poise.value.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Equip Load</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.equipLoad.value.getTotal()} 
          isModified={stats.equipLoad.value.isModified()}
        />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Resistances</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ValueBadge 
          value={stats.resistance.value.getTotal()} 
          isModified={stats.resistance.value.isModified()}
        />
      </dd>
    </div>
  </dl>
</div>