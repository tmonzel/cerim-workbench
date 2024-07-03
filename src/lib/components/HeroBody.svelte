<script lang="ts">
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
      groups={['axes', 'bows', 'hammers', 'swords', 'daggers', 'halberds', 'staffs']} 
      item={hero.equip.mainHand}  
    />
    <EquipSlot 
      bind:slot={$slotStore.offHand}
      label="Offhand" 
      groups={['shields', 'seals']} 
      item={hero.equip.offHand} 
    />
    <EquipSlot 
      label="Head" 
      bind:slot={$slotStore.head}
      groups={['helmets']} 
      item={hero.equip.head} 
    />
    <EquipSlot 
      label="Chest" 
      bind:slot={$slotStore.chest}
      groups={['armors']} 
      item={hero.equip.chest} 
    />
    <EquipSlot 
      label="Legs" 
      bind:slot={$slotStore.legs}
      groups={['greaves']} 
      item={hero.equip.legs} 
    />
    <EquipSlot 
      label="Hands" 
      bind:slot={$slotStore.hand}
      groups={['gauntlets']} 
      item={hero.equip.hand} 
    />
  </div>
  <div class="flex flex-col gap-5 max-w-lg">
    <EquipSlot 
      label="Greatrune"
      bind:slot={$slotStore.rune} 
      groups={['runes']} 
      item={hero.equip.rune} 
    />
    <EquipSlot 
      label="Pouch"
      bind:slot={$slotStore.pouch} 
      groups={['talismans']} 
      item={hero.equip.pouch} 
    />
    <EquipSlot 
      label="Pouch II"
      bind:slot={$slotStore.pouch2} 
      groups={['talismans']} 
      item={hero.equip.pouch2} 
    />
    <EquipSlot 
      label="Pouch III"
      bind:slot={$slotStore.pouch3} 
      groups={['talismans']} 
      item={hero.equip.pouch3} 
    />
    <EquipSlot 
      label="Pouch IV"
      bind:slot={$slotStore.pouch4} 
      groups={['talismans']} 
      item={hero.equip.pouch4} 
    />
  </div>
</div>
