<script lang="ts">
	import { itemSlotRecord } from '$lib/records';
	import { type EquipState } from '$lib/stores';
	import EquipSlot from './EquipSlot.svelte';
	
  export let body: EquipState;
</script>
<div class="flex gap-5 justify-center">
  <div class="flex flex-col gap-5" style="max-width: 52rem;">
    <EquipSlot 
      key="mainHand"
      slot={itemSlotRecord.mainHand} 
      item={body.mainHand}  
    />
    <EquipSlot 
      key="offHand" 
      slot={itemSlotRecord.offHand}
      item={body.offHand} 
    />
    <EquipSlot 
      key="head" 
      slot={itemSlotRecord.head}
      item={body.head} 
    />
    <EquipSlot 
      key="chest" 
      slot={itemSlotRecord.chest}
      item={body.chest} 
    />
    <EquipSlot 
      key="legs" 
      slot={itemSlotRecord.legs}
      item={body.legs} 
    />
    <EquipSlot 
      key="hand" 
      slot={itemSlotRecord.hand}
      item={body.hand} 
    />
  </div>
  <div class="flex flex-col gap-5 max-w-lg">
    <EquipSlot 
      key="rune"
      slot={itemSlotRecord.rune} 
      item={body.rune} 
    />
    <EquipSlot 
      key="pouch"
      slot={itemSlotRecord.pouch} 
      item={body.pouch} 
    />
    <EquipSlot 
      key="pouch2"
      slot={itemSlotRecord.pouch2} 
      item={body.pouch2} 
    />
    <EquipSlot 
      key="pouch3"
      slot={itemSlotRecord.pouch3} 
      item={body.pouch3} 
    />
    <EquipSlot 
      key="pouch4"
      slot={itemSlotRecord.pouch4} 
      item={body.pouch4} 
    />
  </div>
</div>
