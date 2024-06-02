<script lang="ts">
	import { roundValue } from '$lib/helpers';
	import type { HeroState } from '$lib/hero';
	import DamageBadge from './DamageBadge.svelte';

  export let state: HeroState; 
</script>

<div class="mt-6 border-t border-gray-100">
  <dl class="divide-y divide-gray-100">
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">DPS</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {state.dps}
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">APS</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{state.attackSpeed}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Damage</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <DamageBadge damage={state.damage} showTypes />
      </dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Health</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.health)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Stamina</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.stamina)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Armor</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.armor)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Weight</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.weight)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Poise Defense</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.poise)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Equip Load</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{roundValue(state.equipLoad)}</dd>
    </div>
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Resistances</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">0/0/0/0</dd>
    </div>
  </dl>
</div>