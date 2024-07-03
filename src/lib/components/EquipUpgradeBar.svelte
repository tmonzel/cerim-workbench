<script lang="ts">
	import type { AffinityType } from '$lib/core/types';
	import { itemStore, type Item } from '$lib/item';
	import ItemAffinitySelect from '../item/components/ItemAffinitySelect.svelte';

  export let item: Item;

  function upgrade(tier: number): void {
    item.upgrade(tier);
    itemStore.update((items) => ({ ...items, [item!.id]: item! }));
  }

  function changeAffinity(aff: AffinityType): void {
    item.changeAffinity(aff);

    itemStore.update((items) => ({ ...items, [item!.id]: item! }));
  }

  $: upgradeableAffinities = Object.keys(item.affinities ?? {}) as AffinityType[];
</script>
<div class="flex gap-2 text-zinc-400">
  {#if item.affinities}
  <div class="flex rounded-lg bg-zinc-900/50 p-1">
    <svg class="fill-zinc-400 me-2" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#5f6368"><path d="M360-520v-120H160q0-83 58.5-141.5T360-840h240v120l120-120h80v320h-80L600-640v120H360Zm40 400q-17 0-28.5-11.5T360-160v-280h240v280q0 17-11.5 28.5T560-120H400Z"/></svg>
    <ItemAffinitySelect value={item.affinity} on:affinityChange={(e) => changeAffinity(e.detail)} selectableTypes={upgradeableAffinities} />
  </div>
  {/if}

  <button class="flex rounded-lg disabled:opacity-50 disabled:ring-zinc-500 bg-zinc-900/50 p-1 ring-amber-300 hover:ring-2 group" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)}>
    <svg class="group-hover:fill-amber-300 group-disabled:fill-zinc-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
  </button>

  <button class="flex rounded-lg disabled:opacity-50 disabled:ring-zinc-500 bg-zinc-900/50 p-1 ring-amber-300 hover:ring-2 group" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)}>
    <svg class="group-hover:fill-amber-300 group-disabled:fill-zinc-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z"/></svg>
  </button>
</div>
