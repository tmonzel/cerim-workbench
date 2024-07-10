<script lang="ts">
	import { getValueDistribution } from '$lib/core';
	import type { Attack } from '$lib/core/types';
	import { attackTypeRecord } from '$lib/records';

  export let attack: Attack;
  export let compact = false;

  let gradient = '';
  
  $: dist = getValueDistribution(attack);

  $: {
    let v = [];
    let lastPercent = 0;

    for(const d of dist) {
      const percent = d.amount * 100;

      if(percent > 0) {
        v.push(attackTypeRecord[d.key].color + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
        lastPercent += percent;
      }
    }

    if(v.length > 0) {
      gradient = `linear-gradient(to right, ${v.join(',')})`;
    } else {
      gradient = '';
    }
  }
</script>

{#if compact}
<div style="padding: 2px" class="border border-zinc-300">
  <div style="width: 100%; height: 6px" style:background={gradient}></div>
</div>
{:else}
<div class="flex gap-4">
  {#each dist as d}
    <div style:width={`${d.amount * 100}%`}>
      <div style:background-color={attackTypeRecord[d.key].color} class="h-1"></div>
      {(Math.floor(d.value))}
    </div>
  {/each}
</div>
{/if}