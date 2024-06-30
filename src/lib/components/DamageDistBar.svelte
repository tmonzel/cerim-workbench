<script lang="ts">
	import { damageRecord } from '$lib/records';
	import type { ComplexDamage } from '$lib/core/values';

  export let damage: ComplexDamage;

  let gradient = '';

  $: dist = damage.getValueDistribution();
  $: {
    let v = [];
    let lastPercent = 0;

    for(const d of dist) {
      const percent = d.amount * 100;

      if(percent > 0) {
        v.push(damageRecord[d.key].color + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
        lastPercent = percent;
      }
    }

    if(v.length > 0) {
      gradient = `linear-gradient(to right, ${v.join(',')})`;
    } else {
      gradient = '';
    }
  }
</script>
<!--<div style="padding: 2px" class="border border-zinc-300">
  <div style="width: 100%; height: 6px" style:background={gradient}></div>
</div>-->

<div class="flex gap-1">
  {#each dist as d}
    <div style:width={`${d.amount * 100}%`}>
      <div style:background-color={damageRecord[d.key].color} class="h-2"></div>
      {(Math.floor(d.value))}
    </div>
  {/each}
</div>