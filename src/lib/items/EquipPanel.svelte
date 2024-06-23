<script lang="ts">
  import EquipSlot from './EquipSlot.svelte';
	import { equipStore, type EquipState } from './state';
	
  export let body: EquipState;
</script>

<div class="flex gap-5 rounded-lg">
  <div class="basis-3/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="MainHand" 
      item={body.mainHand}  
      allowedGroups={['axes', 'bows', 'hammers', 'swords', 'daggers']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, mainHand: e.detail }))}
    />
  </div>
  <div class="basis-3/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="OffHand" 
      item={body.offHand} 
      allowedGroups={['shields']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, offHand: e.detail }))}
    />
  </div>
</div>

<div class="flex gap-5 my-5">
  <div class="basis-3/6 gap-5 rounded-lg flex flex-col">
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
      allowedGroups={['pants']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, legs: e.detail }))} 
    />
  
    <EquipSlot 
      type="Hands" 
      item={body.hand} 
      allowedGroups={['gloves']} 
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, hand: e.detail }))}
    />

    <EquipSlot 
      type="Feet" 
      item={body.feet} 
      allowedGroups={['boots']}
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, feet: e.detail }))} 
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
      on:itemChange={(e) => equipStore.update((store) => ({ ...store, neck: e.detail }))}
    />

    <!--<EquipSlot 
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
    />-->
  </div>
</div>


