<script lang="ts">
	import { getValueDistribution } from '$lib/core';
	import type { Attack } from '$lib/core/types';
	import { attackTypeRecord } from '$lib/records';

  export let attack: Attack;
  
  $: dist = getValueDistribution(attack);
</script>

<div class="flex gap-4">
  {#each dist as d}
    <div style:width={`${d.amount * 100}%`}>
      <div style:background-color={attackTypeRecord[d.key].color} class="h-1"></div>
      {(Math.floor(d.value))}
    </div>
  {/each}
</div>