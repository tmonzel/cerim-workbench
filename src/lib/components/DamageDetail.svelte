<script lang="ts">
	import { getValueDistribution, type Damage } from '$lib/core';
	import { damageRecord } from '$lib/records';

  export let damage: Damage;

  $: dist = getValueDistribution(damage);
</script>

<div class="flex gap-4">
  {#each dist as d}
    <div style:width={`${d.amount * 100}%`}>
      <div style:background-color={damageRecord[d.key].color} class="h-1"></div>
      {(Math.floor(d.value))}
    </div>
  {/each}
</div>