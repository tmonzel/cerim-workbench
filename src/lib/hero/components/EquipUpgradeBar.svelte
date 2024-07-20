<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import { AffinityType } from '$lib/core/types';
	import { AttackItem, itemStore, type Item } from '$lib/item';
	import { affinityRecord } from '$lib/records';

  export let item: Item;

  let availableAffinities: AffinityType[] = [];

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

  const affinityOptions = Object.entries(affinityRecord).map(entry => ({ name: entry[1].name, value: entry[0] }))

  $: {
    if(item instanceof AttackItem) {
      availableAffinities = [...item.affinities.keys()] as AffinityType[];
    }
  }

</script>
<div class="flex gap-2">
  {#if item instanceof AttackItem && availableAffinities.length > 0}
  <div class="flex">
    <SelectControl 
      items={affinityOptions} 
      value={item.affinity ?? AffinityType.STANDARD} 
      on:select={(e) => changeAffinity(e.detail)} 
      let:item={item}
     >
      <svelte:fragment slot="selected" let:selectedItem>
        {#if selectedItem}
        <img class="w-5 me-2" src={affinityRecord[selectedItem.value].iconUrl} alt="{item.name} Affinity Icon"/> {selectedItem.name}
        {/if}
        
      </svelte:fragment>

      <img class="w-5 me-2" src={affinityRecord[item.value].iconUrl} alt="{item.name} Affinity Icon"/> <span>{item.name}</span>
     </SelectControl>
  </div>
  {/if}

  <div>
    <Button icon="add" disabled={item.tier >= item.possibleUpgrades} on:click={() => upgrade(item.tier + 1)} />
  </div>
  <div>
    <Button icon="remove" disabled={item.tier === 0} on:click={() => upgrade(item.tier - 1)} />
  </div>
</div>
