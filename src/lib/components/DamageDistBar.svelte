<script lang="ts">
	import { damageRecord } from '$lib/records';
	import type { ComplexDamage } from '$lib/core/values';

  export let damage: ComplexDamage;

  let gradient = '';

  $: {
    let v = [];
    let lastPercent = 0;
    let dist = damage.getValueDistribution();

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
<div style="padding: 2px" class="border border-zinc-300">
  <div style="width: 100%; height: 6px" style:background={gradient}></div>
</div>