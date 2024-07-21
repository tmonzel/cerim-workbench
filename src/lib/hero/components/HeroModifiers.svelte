<script lang="ts">
	import { type HeroState } from '../types';
	import HeroModifierList from './HeroModifierList.svelte';

  export let hero: HeroState;

  let allModifications = [];

  $: statMods = hero.stats.getModifiedValues();
  $: resistanceMods = hero.resistance.getModifiedValues();
  $: damageNegationMods = hero.damageNegation.getModifiedValues();
  $: attackMods = hero.attack.getModifiedValues();

  $: {
    allModifications = [...statMods, ...resistanceMods, ...damageNegationMods, ...attackMods];
  }
</script>

<div>
  {#if allModifications.length === 0}
    <span class="inline-flex items-center text-sm rounded-md bg-sky-500/20 px-2 py-1 font-medium text-sky-300 ">
      No modifiers applied
    </span>
  {/if}

  {#if attackMods.length > 0}
  <HeroModifierList type="attack" modifications={attackMods} />
  {/if}
  
  {#if statMods.length > 0}
  <HeroModifierList type="stats" modifications={statMods} />
  {/if}
  
  {#if resistanceMods.length > 0}
  <HeroModifierList type="resistance" modifications={resistanceMods} />
  {/if}

  {#if damageNegationMods.length > 0}
  <HeroModifierList type="damageNegation" modifications={damageNegationMods} />
  {/if}

  {#if hero.effects.length > 0}
  <div>
    <p class="text-sm font-medium mb-1">Effects</p>
    <ul class="list-disc ps-4">
    {#each hero.effects as effect}
      <li class="text-sm text-zinc-500 mb-2">{effect}</li>
    {/each}
    </ul>
  </div>
  {/if}
</div>
