<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { DynamicNumber } from '$lib/core';
	import { heroState, type HeroAttribute } from '$lib/hero';
	import { appState } from '$lib/state';
	import { createEventDispatcher } from 'svelte';
	import AttributeModifierGraph from './AttributeModifierGraph.svelte';

  export let attribute: HeroAttribute;
  export let num: DynamicNumber;

  const id = crypto.randomUUID();
  const dispatch = createEventDispatcher<{ changeValue: number }>();

  let showTooltip = false;

  $: {
    $appState.showAttributeInfo = showTooltip ? attribute.name : null;
  }

  function changeValue(newValue: number) {
    if(newValue < 0 || newValue > 99) {
      return;
    }
    
    //value = newValue;
    dispatch('changeValue', newValue);
  }
</script>

<label for={id} class="flex items-center text-sm font-medium leading-6 text-zinc-200">
  {#if attribute.color}<span style:background-color={attribute.color} class="me-2 w-2.5 h-2.5 rounded"></span>{/if}
  {attribute.name} 
</label>
<div 
  class="relative mt-2 rounded-md text-lg font-medium dark:bg-zinc-600/20 group" 
>
  <div class="absolute inset-y-0 left-0 flex items-center z-20">
    <button 
      class="h-full rounded-md border-0 px-5 text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:pointerover={() => showTooltip = true} 
      on:pointerout={() => showTooltip = false}
      on:click={() => changeValue(num.base - 1)}
    >
      -
    </button>
  </div>
  <div class="rounded-md text-lg border-0 py-1 text-center text-zinc-300">
    {num.base} {#if num.offset > 0}<span class="opacity-60">(+{num.offset})</span>{/if}
  </div>
  <div class="absolute inset-y-0 right-0 flex items-center z-20">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:pointerover={() => showTooltip = true} 
      on:pointerout={() => showTooltip = false}
      on:click={() => $heroState.attributePoints > 0 ? changeValue(num.base + 1) : -1}
    >
      +
    </button>
  </div>
  <div class="absolute z-10 rounded-md top-0 left-0 bottom-0 bg-zinc-400/20" style:width={`${(num.total / 99) * 100}%`}></div>

  {#if attribute.modifier && showTooltip}
  <div class="absolute z-50 transition-opacity tooltip">
    <div class="p-5 rounded-lg shadow bg-zinc-800/95 border border-zinc-600">
      <div class="flex">
        {#each Object.entries(attribute.modifier.modifications) as [group, mod]}
        {#each Object.entries(mod) as [stat, mutations]}
        <div class="basis-1/2">
          <AttributeModifierGraph label={`${group}:${stat}`} {mutations} progress={num.total} />
        </div>
        {/each}
      {/each}
      </div>
    </div>
  </div>
  {/if}
</div>

<style>
  .tooltip {
    left: 50%;
    bottom: 120%;
  }
</style>
