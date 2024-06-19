<script lang="ts">
  import EquipSlot from './EquipSlot.svelte';
	import { equipState, equipStore } from './state';
</script>


<div class="flex gap-3 rounded-lg">
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="MainHand" 
      item={$equipState.mainHand}  
      allowedGroups={['axes', 'bows', 'hammers', 'swords']} 
      on:selectItem={(item) => $equipStore.mainHand = item.detail}
    />
  </div>
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="OffHand" 
      item={$equipState.offHand} 
      allowedGroups={['shields']} 
      on:selectItem={(item) => $equipStore.offHand = item.detail}
    />
  </div>
  <div class="basis-2/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="Hands" 
      item={$equipState.hand} 
      allowedGroups={['gloves']} 
      on:selectItem={(item) => $equipStore.hand = item.detail}
    />
  </div>
</div>

<div class="flex gap-5 my-6">
  <div class="basis-3/6 gap-5 rounded-lg flex flex-col">
    <EquipSlot 
      type="Head" 
      item={$equipState.head} 
      allowedGroups={['helmets']}
      on:selectItem={(item) => $equipStore.head = item.detail} 
    />

    <EquipSlot 
      type="Chest" 
      item={$equipState.chest} 
      allowedGroups={['bodyArmors']}
      on:selectItem={(item) => $equipStore.chest = item.detail} 
    />
  
    <EquipSlot 
      type="Legs" 
      item={$equipState.legs} 
      allowedGroups={['pants']} 
      on:selectItem={(item) => $equipStore.legs = item.detail}
    />

    <EquipSlot 
      type="Feet" 
      item={$equipState.feet} 
      allowedGroups={['boots']} 
      on:selectItem={(item) => $equipStore.feet = item.detail}
    />
  </div>
  <div class="basis-3/6 rounded-lg gap-5 flex flex-col">
    <EquipSlot 
      type="Neck" 
      item={$equipState.neck} 
      allowedGroups={['talismans']}
      on:selectItem={(item) => $equipStore.neck = item.detail} 
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


