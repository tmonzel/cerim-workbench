<script lang="ts">
	import { DamageType, ElementalDamageType, damageRecord } from '$lib/core';

  export let value: Partial<Record<ElementalDamageType, number>>;

  $: elements = Object.entries(value) as { [0]: DamageType; [1]: number }[]
</script>

<span class="grid grid-cols-3 gap-2">
  {#each elements as el}
    {#if el[1] > 0}
    <div class="flex flex-col">
      <span>{Math.round(el[1] * 10) / 10}</span> 
      <div class="bg-zinc-500 h-1" style:background-color={damageRecord[el[0]].color}></div>
    </div> 
    {/if}
  {/each}
</span>