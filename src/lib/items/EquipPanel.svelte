<script lang="ts">
  import EquipSlot from './EquipSlot.svelte';
	import { equipStore, type EquipState } from './state';
	
  export let body: EquipState;
</script>
<div class="grid grid-cols-2 gap-5">
  <div class="flex flex-col gap-5 mb-5">
    <EquipSlot 
      type="MainHand" 
      item={body.mainHand}  
      allowedGroups={['axes', 'bows', 'hammers', 'swords', 'daggers']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, mainHand: e.detail }))}
    />
    <EquipSlot 
      type="OffHand" 
      item={body.offHand} 
      allowedGroups={['shields']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, offHand: e.detail }))}
    />
    <EquipSlot 
      type="Head" 
      item={body.head} 
      allowedGroups={['helmets']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, head: e.detail }))}
    />
    <EquipSlot 
      type="Chest" 
      item={body.chest} 
      allowedGroups={['bodyArmors']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, chest: e.detail }))}
    />
    <EquipSlot 
      type="Legs" 
      item={body.legs} 
      allowedGroups={['greaves']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, legs: e.detail }))} 
    />
    <EquipSlot 
      type="Hands" 
      item={body.hand} 
      allowedGroups={['gauntlets']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, hand: e.detail }))}
    />
  </div>
  <div class="flex flex-col gap-5 mb-5">
    <EquipSlot 
      type="GreatRune" 
      item={body.rune} 
      allowedGroups={['runes']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, rune: e.detail }))}
    />
    <EquipSlot 
      type="Pouch" 
      item={body.pouch} 
      allowedGroups={['talismans']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, pouch: e.detail }))}
    />
    <EquipSlot 
      type="2nd Pouch" 
      item={body.pouch2} 
      allowedGroups={['talismans']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, pouch2: e.detail }))}
    />
    <EquipSlot 
      type="3rd Pouch" 
      item={body.pouch3} 
      allowedGroups={['talismans']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, pouch3: e.detail }))}
    />
    <EquipSlot 
      type="4th Pouch" 
      item={body.pouch4} 
      allowedGroups={['talismans']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, pouch4: e.detail }))}
    />
  </div>
</div>
