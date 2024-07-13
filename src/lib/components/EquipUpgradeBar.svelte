<script lang="ts">
	import type { AffinityType } from '$lib/core/types';
	import { AttackItem, itemStore, type Item } from '$lib/item';
	import Button from './Button.svelte';
	import SelectControl from './SelectControl.svelte';

  export let item: Item;

  function upgrade(tier: number): void {
    item.upgrade(tier);
    itemStore.update((items) => ({ ...items, [item!.id]: item! }));
  }

  function changeAffinity(aff: AffinityType): void {
    if(item instanceof AttackItem) {
      item.setAffinity(aff);
      itemStore.update((items) => ({ ...items, [item!.id]: item! }));
    }
  }

</script>
<div class="flex gap-2">
  {#if item instanceof AttackItem && item.affinities.size > 0}
  <div class="flex">
    <!--<span class="mat-icon me-1">construction</span>-->
    <SelectControl 
      items={[{ name: "Standard", value: null }, ...item.getAvailableAffinities()]} 
      noItemLabel="Standard" 
      value={item.affinity} 
      on:select={(e) => changeAffinity(e.detail)} 
     />
    <!--<ItemAffinitySelect 
      value={item.affinity} 
      on:affinityChange={(e) => changeAffinity(e.detail)}
      selectableTypes
    />-->
  </div>
  {/if}

  <div>
    <Button icon="add" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)} />
  </div>
  <div>
    <Button icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} />
  </div>
</div>
