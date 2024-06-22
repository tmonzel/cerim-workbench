<script lang="ts">
  import EquipSlot from './EquipSlot.svelte';
	import { equipStore, type EquipState } from './state';
	
  export let body: EquipState;
</script>

<div class="flex gap-5 rounded-lg">
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="MainHand" 
      item={body.mainHand}  
      allowedGroups={['axes', 'bows', 'hammers', 'swords', 'daggers']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, mainHand: e.detail }))}
    />
  </div>
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="OffHand" 
      item={body.offHand} 
      allowedGroups={['shields']} 
    />
  </div>
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="Hands" 
      item={body.hand} 
      allowedGroups={['gloves']} 
    />
  </div>
</div>

<div class="flex gap-5 my-5">
  <div class="basis-3/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="Head" 
      item={body.head} 
      allowedGroups={['helmets']}
    />

    <EquipSlot 
      type="Chest" 
      item={body.chest} 
      allowedGroups={['bodyArmors']}
    />
  
    <EquipSlot 
      type="Legs" 
      item={body.legs} 
      allowedGroups={['pants']} 
    />

    <EquipSlot 
      type="Feet" 
      item={body.feet} 
      allowedGroups={['boots']} 
    />
  </div>
  <div class="basis-3/6 rounded-lg gap-5 flex flex-col">
    <EquipSlot 
      type="GreatRune" 
      item={body.pocket} 
      allowedGroups={['runes']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, pocket: e.detail }))}
    />

    <EquipSlot 
      type="Neck" 
      item={body.neck} 
      allowedGroups={['talismans']} 
    />

    <EquipSlot 
      type="Waist" 
      allowedGroups={['belts']}
    />

    <EquipSlot 
      type="Left Finger" 
      allowedGroups={['rings']}
    />

    <EquipSlot 
      type="Right Finger" 
      allowedGroups={['rings']}
    />
  </div>
</div>


