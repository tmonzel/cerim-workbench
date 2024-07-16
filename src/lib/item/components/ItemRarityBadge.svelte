<script lang="ts">
	import { ItemRarity } from '../types';

  export let rarity: ItemRarity;
</script>
{#if rarity === ItemRarity.COMMON}
  <!--<span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-stone-400/20 text-stone-300">
    Common
  </span>-->
{:else if rarity === ItemRarity.RARE}
<span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-indigo-400/20 text-indigo-300">
  Rare
</span>
{:else if rarity === ItemRarity.LEGENDARY}
<span class="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-orange-300/20 text-orange-300">
  Legendary
</span>
{/if}