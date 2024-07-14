<script lang="ts">
	import { ItemCategory } from '$lib/item/types';

	import { Item, itemStore } from '$lib/item';
	import { derived } from 'svelte/store';
	import EquipSlot from './EquipSlot.svelte';
	import { slotStore, type HeroState } from '$lib/hero';
	
  export let hero: HeroState;

  const selectableItems = derived(itemStore, (items) => {
    const record: Record<ItemCategory, Item[]> = {
      [ItemCategory.WEAPON]: [],
      [ItemCategory.HELMET]: [],
      [ItemCategory.ARMOR]: [],
      [ItemCategory.LEGS]: [],
      [ItemCategory.ARMS]: [],
      [ItemCategory.RUNE]: [],
      [ItemCategory.TALISMAN]: []
    };

    for(const item of Object.values(items)) {
      switch(item.category) {
        case ItemCategory.WEAPON:
          record[ItemCategory.WEAPON].push(item);
          break;
        case ItemCategory.HELMET:
          record[ItemCategory.HELMET].push(item);
          break;
        case ItemCategory.ARMOR:
          record[ItemCategory.ARMOR].push(item);
          break;
        case ItemCategory.LEGS:
          record[ItemCategory.LEGS].push(item);
          break;
        case ItemCategory.ARMS:
          record[ItemCategory.ARMS].push(item);
          break;
        case ItemCategory.RUNE:
          record[ItemCategory.RUNE].push(item);
          break;
        case ItemCategory.TALISMAN:
          record[ItemCategory.TALISMAN].push(item);
          break;
      }
    }

    return record;
  })
</script>
<div class="flex gap-5 justify-center">
  <div class="flex flex-col gap-5" style="max-width: 52rem;">
    <EquipSlot 
      bind:slot={$slotStore.mainHand}
      label="Main Hand"
      selectableItems={$selectableItems[ItemCategory.WEAPON]} 
      item={hero.equip.mainHand}  
    />
    <EquipSlot 
      bind:slot={$slotStore.offHand}
      label="Offhand" 
      selectableItems={$selectableItems[ItemCategory.WEAPON]} 
      item={hero.equip.offHand} 
    />
    <EquipSlot 
      label="Head" 
      bind:slot={$slotStore.head}
      selectableItems={$selectableItems[ItemCategory.HELMET]} 
      item={hero.equip.head} 
    />
    <EquipSlot 
      label="Chest" 
      bind:slot={$slotStore.chest}
      selectableItems={$selectableItems[ItemCategory.ARMOR]} 
      item={hero.equip.chest} 
    />
    <EquipSlot 
      label="Legs" 
      bind:slot={$slotStore.legs}
      selectableItems={$selectableItems[ItemCategory.LEGS]} 
      item={hero.equip.legs} 
    />
    <EquipSlot 
      label="Hands" 
      bind:slot={$slotStore.hand}
      selectableItems={$selectableItems[ItemCategory.ARMS]} 
      item={hero.equip.hand} 
    />
  </div>
  <div class="flex flex-col gap-5 max-w-lg">
    <EquipSlot 
      label="Greatrune"
      bind:slot={$slotStore.rune} 
      selectableItems={$selectableItems[ItemCategory.RUNE]} 
      item={hero.equip.rune} 
    />
    <EquipSlot 
      label="Pouch"
      bind:slot={$slotStore.pouch} 
      selectableItems={$selectableItems[ItemCategory.TALISMAN]} 
      item={hero.equip.pouch} 
    />
    <EquipSlot 
      label="Pouch II"
      bind:slot={$slotStore.pouch2} 
      selectableItems={$selectableItems[ItemCategory.TALISMAN]} 
      item={hero.equip.pouch2} 
    />
    <EquipSlot 
      label="Pouch III"
      bind:slot={$slotStore.pouch3} 
      selectableItems={$selectableItems[ItemCategory.TALISMAN]} 
      item={hero.equip.pouch3} 
    />
    <EquipSlot 
      label="Pouch IV"
      bind:slot={$slotStore.pouch4} 
      selectableItems={$selectableItems[ItemCategory.TALISMAN]}
      item={hero.equip.pouch4} 
    />
  </div>
</div>
