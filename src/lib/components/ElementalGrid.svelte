<script lang="ts">
	import { AttackType, type DamageType } from '$lib/core/types';
	import { attackTypeRecord } from '$lib/records';

  export let value: Partial<Record<DamageType, number>>;

  const elementTypes = [AttackType.MAGIC, AttackType.FIRE, AttackType.LIGHTNING, AttackType.HOLY];

  $: elements = (Object.entries(value) as { [0]: AttackType; [1]: number }[]).filter(v => elementTypes.includes(v[0]));
</script>

<span class="grid grid-cols-3 gap-2">
  {#each elements as el}
    {#if el[1] > 0}
    <div class="flex flex-col">
      <span>{Math.round(el[1] * 10) / 10}</span> 
      <div class="bg-zinc-500 h-1" style:background-color={attackTypeRecord[el[0]].color}></div>
    </div> 
    {/if}
  {/each}
</span>