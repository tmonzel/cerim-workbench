<script lang="ts">
  import "../app.css";
  import type { DataSchema, Gear, StatModifier } from '$lib/types';
	import { derived, writable } from 'svelte/store';
	import AttributeControl from '$lib/AttributeControl.svelte';
	import GearSlot from '$lib/GearSlot.svelte';
	import MasteryControl from '$lib/MasteryControl.svelte';

	export let data: DataSchema;

  const heroGear = writable<Gear>({
    head: null,
    chest: null,
    legs: null,
    hand: null,
    feet: null,
    mainHand: null,
    offHand: null
  });

  const HERO_LEVEL = 30;
  const AVAILABLE_ATTR_POINTS = 3 * HERO_LEVEL;
  const AVAILABLE_MASTERY_POINTS = 1 * HERO_LEVEL;
  const INIT_POINTS = 10;

  const selectedMasteryTiers = writable([]);

  const heroState = writable({
    vitality: INIT_POINTS,
    endurance: INIT_POINTS,
    strength: INIT_POINTS,
    dexterity: INIT_POINTS,
  });

  const modifiers = writable<{ [property: string]: StatModifier }>({});

  const heroStats = derived([heroState, heroGear, selectedMasteryTiers], (state) => {
    const hero = state[0];
    const gear = state[1];
    const masteryTiers = state[2];

    const stats: { [property: string]: any } = {
      dps: [0, 0],
      attackSpeed: 1,
      health: hero.vitality * 20,
      armor: 0,
      damage: [0, 0],
      stamina: hero.endurance * 20,
      undistributedPoints: AVAILABLE_ATTR_POINTS - (hero.vitality + hero.endurance + hero.strength + hero.dexterity) + INIT_POINTS * 4,
      undistributedMasteryPoints: AVAILABLE_MASTERY_POINTS - masteryTiers.reduce((p, c) => p + c, 0)
    }

    const gearItems = [
      gear.head, 
      gear.chest, 
      gear.legs, 
      gear.feet, 
      gear.mainHand, 
      gear.offHand, 
      gear.hand
    ];

    let mods: { [property: string]: StatModifier } = {};

    for(const item of gearItems) {
      if(!item) {
        continue;
      }

      let itemDamage = item.damage ?? [0, 0];
      stats.armor += item.armor ?? 0;

      for(const mod of item.modifiers) {
        if(mods[mod.stat]) {
          mods[mod.stat].value += mod.type === 'flat' ? mod.value : mod.value - 1;
          continue;
        }
        
        mods[mod.stat] = { property: mod.stat, value: mod.value, type: mod.type, affectedGroups: [] }
      }

      for(const i in masteryTiers) {
        const tier = masteryTiers[i];

        if(tier === 0) continue;

        const mastery = data.masteries[i];
        const tierSchema = mastery.tiers[tier - 1];
        
        for(const mod of tierSchema.modifiers) {
          if(!mod.affectedGroups.includes(item.group)) continue;

          switch(mod.property) {
            case 'damage':
              itemDamage = [mod.value * itemDamage[0], mod.value * itemDamage[1]];
          }
        }
      }

      stats.damage = [
        Math.round(stats.damage[0] + itemDamage[0]), 
        Math.round(stats.damage[1] + itemDamage[1])
      ];

      stats.attackSpeed = item.attackSpeed ?? stats.attackSpeed;
    }
    
    for(const [p, m] of Object.entries(mods)) {
      if(m.type === 'flat') {
        // Flat
        stats[p] = m.value + stats[p];
      } else {
        // Percentual
        stats[p] = m.value * stats[p];
      }
    }

    stats.dps = [
      Math.round(stats.damage[0] * stats.attackSpeed), 
      Math.round(stats.damage[1] * stats.attackSpeed)
    ];

    modifiers.set(mods);

    return stats;
  });
  
</script>

<div class="p-12">
  <h1 class="text-4xl font-bold mb-8">Cerim Workbench</h1>
  <div class="flex gap-20 mb-10">
    <div>
      <h3 class="text-lg">Level</h3>
      <p class="mt-2 text-5xl">{ HERO_LEVEL }</p>
    </div>

    <div>
      <h3 class="text-lg">Attribute Points</h3>
      <p class="mt-2 text-5xl">{ $heroStats.undistributedPoints }</p>
    </div>
    
    <div>
      <h3 class="text-lg">Mastery Points</h3>
      <p class="mt-2 text-5xl">{ $heroStats.undistributedMasteryPoints}</p>
    </div>
  </div>

  <hr class="my-8">

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Attributes</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Distribute your attribute points</p>
      </div>
      <div class="mb-4">
        <AttributeControl 
          label="Vitality" 
          value={$heroState.vitality} 
          on:valueChange={(e) => $heroState.vitality = e.detail}
        />
      </div>
      <div class="mb-4">
        <AttributeControl 
          label="Endurance" 
          value={$heroState.endurance}
          on:valueChange={(e) => $heroState.endurance = e.detail}
        />
      </div>
      <div class="mb-4">
        <AttributeControl 
          label="Strength" 
          value={$heroState.strength} 
          on:valueChange={(e) => $heroState.strength = e.detail}
        />
      </div>
      <div class="mb-4">
        <AttributeControl 
          label="Dexterity" 
          value={$heroState.dexterity} 
          on:valueChange={(e) => $heroState.dexterity = e.detail}
        />
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Gear</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Select your equipment</p>
      </div>
      <div class="bg-gray-100 p-5 rounded-lg my-6">
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="Head" bind:item={$heroGear.head} allowedGroups={['helmets']} />
          <GearSlot type="Neck" allowedGroups={['amulets']} />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="MainHand" bind:item={$heroGear.mainHand} allowedGroups={['axes', 'bows']} />
          <GearSlot type="Chest" bind:item={$heroGear.chest} allowedGroups={['bodyArmors']} />
          <GearSlot type="OffHand" bind:item={$heroGear.offHand} allowedGroups={['shields']} />
        </div>
        <div class="flex gap-5 justify-center mb-5">
          <GearSlot type="Legs" bind:item={$heroGear.legs} allowedGroups={['pants']} />
          <GearSlot type="Hand" bind:item={$heroGear.hand} allowedGroups={['gloves']} />
        </div>
        <div class="flex gap-5 justify-center">
          <GearSlot type="Feet" bind:item={$heroGear.feet} allowedGroups={['boots']} />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        {#each data.masteries as mastery, i}
          <MasteryControl {mastery} bind:tier={$selectedMasteryTiers[i]}/>
        {/each}
      </div>
    </div>

    <div class="sm:col-span-1">
      <div class="px-4 sm:px-0 min-h-20">
        <h3 class="text-base font-semibold leading-7 text-gray-900">Modifiers</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Affixes affecting your stats</p>
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
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">DPS</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$heroStats.dps[0]}-{$heroStats.dps[1]} ({Math.round(($heroStats.dps[0] + $heroStats.dps[1]) / 2)})</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">APS</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$heroStats.attackSpeed}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Damage(flat)</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {$heroStats.damage[0]}-{$heroStats.damage[1]} ({Math.round(($heroStats.damage[0] + $heroStats.damage[1]) / 2)})
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Health</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$heroStats.health}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Stamina</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$heroStats.stamina}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Armor</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{$heroStats.armor}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</div>
