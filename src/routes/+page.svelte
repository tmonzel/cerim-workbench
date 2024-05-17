<script lang="ts">
  import "../app.css";
  import type { DataSchema } from '$lib/types';
	import { writable } from 'svelte/store';
	import AttributeControl from '$lib/AttributeControl.svelte';
	import GearSlot from '$lib/GearSlot.svelte';
	import MasteryControl from '$lib/MasteryControl.svelte';
	import { setContext } from 'svelte';
	import { useHero } from '$lib/hero';

	export let data: DataSchema;

  const {
    state,
    attributes, 
    equip, 
    modifiers, 
    values 
  } = useHero(data);

  function loadData(data: DataSchema): void {

  }

  export const dataState = writable<DataSchema>(data);

  setContext('data', dataState);

  const selectedMasteryTiers = writable([]);
</script>

<div class="p-12">
  <h1 class="text-4xl font-bold mb-8">Cerim Workbench</h1>
  <div class="flex gap-20 mb-10">
    <div>
      <h3 class="text-lg">Level</h3>
      <p class="mt-2 text-5xl">{$state.level}</p>
    </div>

    <div>
      <h3 class="text-lg">Attribute Points</h3>
      <p class="mt-2 text-5xl">{$state.attributePoints}</p>
    </div>
    
    <div>
      <h3 class="text-lg">Mastery Points</h3>
      <p class="mt-2 text-5xl">{$state.masteryPoints}</p>
    </div>
  </div>

  <hr class="my-8">

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Attributes</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Distribute your attribute points</p>
      </div>
      {#each Object.entries(data.attributes) as [name, attr]}
      <div class="mb-4">
        <AttributeControl 
          label={attr.name}
          value={$attributes[name]} 
          on:valueChange={(e) => $attributes[name] = e.detail}
        />
      </div>
      {/each}
    </div>
    <div class="sm:col-span-3">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Gear</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Choose your equipment</p>
      </div>
      <div class="bg-gray-100 p-5 rounded-lg my-6">
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="Head" attributes={$attributes} bind:item={$equip.head} allowedGroups={['helmets']} />
          <GearSlot type="Neck" attributes={$attributes} allowedGroups={['amulets']} />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="MainHand" attributes={$attributes} bind:item={$equip.mainHand} allowedGroups={['axes', 'bows']} />
          <GearSlot type="Chest" attributes={$attributes} bind:item={$equip.chest} allowedGroups={['bodyArmors']} />
          <GearSlot type="OffHand" attributes={$attributes} bind:item={$equip.offHand} allowedGroups={['shields']} />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="Legs" attributes={$attributes} bind:item={$equip.legs} allowedGroups={['pants']} />
          <GearSlot type="Hand" attributes={$attributes} bind:item={$equip.hand} allowedGroups={['gloves']} />
        </div>
        <div class="flex gap-5 justify-center">
          <GearSlot type="Feet" attributes={$attributes} bind:item={$equip.feet} allowedGroups={['boots']} />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        {#each data.masteries as mastery, i}
          <MasteryControl {mastery} bind:tier={$selectedMasteryTiers[i]}/>
        {/each}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Modifiers</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">What is affecting your stats?</p>
      </div>
      <dl class="divide-y divide-gray-100">
      {#each Object.entries($modifiers) as [p, m]}
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">{p}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {#if m.value > 1}+{/if}
          {#if m.type === 'flat'}
            {m.value}
          {:else}
            {Math.round((m.value - 1) * 100)}%
          {/if}
        </dd>
      </div>
      {/each}
      </dl>
    </div>

    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Stats</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Calculated hero stats based on attributes, gear etc.</p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">DPS</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.dps[0]}-{$values.dps[1]} ({Math.round(($values.dps[0] + $values.dps[1]) / 2)})</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">APS</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.attackSpeed}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Flat Damage</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {$values.damage[0]}-{$values.damage[1]} ({Math.round(($values.damage[0] + $values.damage[1]) / 2)})
            </dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Health</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.health}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Stamina</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.stamina}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Armor</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.armor}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Weight</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.weight}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Poise Defense</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.poise}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Equip Load</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.equipLoad}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Resistances</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">0/0/0/0</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</div>
