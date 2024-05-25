<script lang="ts">
  import "../app.css";
  import type { DataSchema } from '$lib/types';
	import AttributeControl from '$lib/AttributeControl.svelte';
	import GearSlot from '$lib/GearSlot.svelte';
	import { setContext } from 'svelte';
	import { useHero } from '$lib/hero';
	import { appState, loadData } from '$lib/state';
	import { renderDamageValue } from '$lib/helpers';

	export let data: DataSchema;

  const {
    state,
    attributes, 
    equip, 
    modifiers, 
    values,
    equippedItems
  } = useHero();

  $: {
    for(const [name, schema] of Object.entries($appState.schema.attributes)) {
      $attributes[name] = schema.initialValue;
    }
  }

  setContext('attributes', attributes);
  setContext('state', state);

  loadData(data);

  function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/JSON';
    input.onchange = async(_) => {
      let files = Array.from(input.files!);
      let text = await files[0].text();

      loadData(JSON.parse(text));
    };

    input.click();
  }
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

    <div class="ml-auto">
      <button type="button" on:click={importData} 
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Import</span>
      </button>
    </div>
  </div>

  <hr class="my-8">

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Attributes</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Spend attribute points to level up ({data.attributePointsPerLevel})</p>
      </div>
      {#each Object.entries($appState.schema.attributes) as [name, attr]}
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
          <GearSlot 
            type="Head" 
            item={$equippedItems.head} 
            allowedGroups={['helmets']}
            on:selectItem={(item) => $equip.head = item.detail} 
          />
          
          <GearSlot 
            type="Neck" 
            item={$equippedItems.neck} 
            allowedGroups={['talismans']}
            on:selectItem={(item) => $equip.neck = item.detail} 
          />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot 
            type="MainHand" 
            item={$equippedItems.mainHand}  
            allowedGroups={['axes', 'bows', 'hammers', 'swords']} 
            on:selectItem={(item) => $equip.mainHand = item.detail}
          />

          <GearSlot 
            type="Chest" 
            item={$equippedItems.chest} 
            allowedGroups={['bodyArmors']}
            on:selectItem={(item) => $equip.chest = item.detail} 
          />
          
          <GearSlot 
            type="OffHand" 
            item={$equippedItems.offHand} 
            allowedGroups={['shields']} 
            on:selectItem={(item) => $equip.offHand = item.detail}
          />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot 
            type="Legs" 
            item={$equippedItems.legs} 
            allowedGroups={['pants']} 
            on:selectItem={(item) => $equip.legs = item.detail}
          />
          
          <GearSlot 
            type="Hand" 
            item={$equippedItems.hand} 
            allowedGroups={['gloves']} 
            on:selectItem={(item) => $equip.hand = item.detail}
          />
        </div>
        <div class="flex gap-5 justify-center">
          <GearSlot 
            type="Feet" 
            item={$equippedItems.feet} 
            allowedGroups={['boots']} 
            on:selectItem={(item) => $equip.feet = item.detail}
          />
        </div>
      </div>
    </div>

    <div class="sm:col-span-1">
      <div>
        <div class="px-4 sm:px-0 min-h-20">
          <h3 class="text-base font-semibold leading-7 text-gray-900">Modifiers</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">What affects your stats?</p>
        </div>
        <dl class="mt-6 divide-y divide-gray-100">
          {#each Object.entries($modifiers) as [stat, types]}
            {#each Object.entries(types) as [t, m]}
              
            <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">{stat}</dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                {m}
              </dd>
            </div>
              
            {/each}
          {/each}
        </dl>
      </div>
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
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {renderDamageValue($values.dps)}
            </dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">APS</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$values.attackSpeed}</dd>
          </div>
          <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Flat Damage</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {renderDamageValue($values.damage)}
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
