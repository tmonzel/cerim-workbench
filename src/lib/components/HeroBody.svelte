<script lang="ts">
	import { itemSlotRecord } from '$lib/records';
	import type { HeroState } from '$lib/state';
	import EquipSlot from './EquipSlot.svelte';
	
  export let hero: HeroState;
</script>
<div class="flex gap-5 justify-center">
  <div class="flex flex-col gap-5" style="max-width: 52rem;">
    <EquipSlot 
      key="mainHand"
      slot={itemSlotRecord.mainHand} 
      item={hero.equip.mainHand}  
    />
    <EquipSlot 
      key="offHand" 
      slot={itemSlotRecord.offHand}
      item={hero.equip.offHand} 
    />
    <EquipSlot 
      key="head" 
      slot={itemSlotRecord.head}
      item={hero.equip.head} 
    />
    <EquipSlot 
      key="chest" 
      slot={itemSlotRecord.chest}
      item={hero.equip.chest} 
    />
    <EquipSlot 
      key="legs" 
      slot={itemSlotRecord.legs}
      item={hero.equip.legs} 
    />
    <EquipSlot 
      key="hand" 
      slot={itemSlotRecord.hand}
      item={hero.equip.hand} 
    />
  </div>
  <div class="flex flex-col gap-5 max-w-lg">
    <EquipSlot 
      key="rune"
      slot={itemSlotRecord.rune} 
      item={hero.equip.rune} 
    />
    <EquipSlot 
      key="pouch"
      slot={itemSlotRecord.pouch} 
      item={hero.equip.pouch} 
    />
    <EquipSlot 
      key="pouch2"
      slot={itemSlotRecord.pouch2} 
      item={hero.equip.pouch2} 
    />
    <EquipSlot 
      key="pouch3"
      slot={itemSlotRecord.pouch3} 
      item={hero.equip.pouch3} 
    />
    <EquipSlot 
      key="pouch4"
      slot={itemSlotRecord.pouch4} 
      item={hero.equip.pouch4} 
    />
  </div>
</div>
