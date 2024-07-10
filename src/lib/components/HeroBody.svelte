<script lang="ts">
	import { itemStore } from '$lib/item';
	import type { HeroState } from '$lib/state';
	import { slotStore } from '$lib/stores';
	import EquipSlot from './EquipSlot.svelte';
	
  export let hero: HeroState;
</script>
<div class="flex gap-5 justify-center">
  <div class="flex flex-col gap-5" style="max-width: 52rem;">
    <EquipSlot 
      bind:slot={$slotStore.mainHand}
      label="Main Hand"
      selectableItems={$itemStore.weapons} 
      item={hero.equip.mainHand}  
    />
    <EquipSlot 
      bind:slot={$slotStore.offHand}
      label="Offhand" 
      selectableItems={$itemStore.weapons} 
      item={hero.equip.offHand} 
    />
    <EquipSlot 
      label="Head" 
      bind:slot={$slotStore.head}
      selectableItems={$itemStore.helmets} 
      item={hero.equip.head} 
    />
    <EquipSlot 
      label="Chest" 
      bind:slot={$slotStore.chest}
      selectableItems={$itemStore.armors} 
      item={hero.equip.chest} 
    />
    <EquipSlot 
      label="Legs" 
      bind:slot={$slotStore.legs}
      selectableItems={$itemStore.legs} 
      item={hero.equip.legs} 
    />
    <EquipSlot 
      label="Hands" 
      bind:slot={$slotStore.hand}
      selectableItems={$itemStore.gauntlets} 
      item={hero.equip.hand} 
    />
  </div>
  <div class="flex flex-col gap-5 max-w-lg">
    <EquipSlot 
      label="Greatrune"
      bind:slot={$slotStore.rune} 
      selectableItems={$itemStore.runes} 
      item={hero.equip.rune} 
    />
    <EquipSlot 
      label="Pouch"
      bind:slot={$slotStore.pouch} 
      selectableItems={$itemStore.talismans} 
      item={hero.equip.pouch} 
    />
    <EquipSlot 
      label="Pouch II"
      bind:slot={$slotStore.pouch2} 
      selectableItems={$itemStore.talismans} 
      item={hero.equip.pouch2} 
    />
    <EquipSlot 
      label="Pouch III"
      bind:slot={$slotStore.pouch3} 
      selectableItems={$itemStore.talismans} 
      item={hero.equip.pouch3} 
    />
    <EquipSlot 
      label="Pouch IV"
      bind:slot={$slotStore.pouch4} 
      selectableItems={$itemStore.talismans}
      item={hero.equip.pouch4} 
    />
  </div>
</div>
