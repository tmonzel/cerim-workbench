<script lang="ts">
	import { FlatDamage } from '$lib/core';

  export let damage: FlatDamage;

  let gradient = '';
  let colorMap = ['#333', '#dc2626', 'blue', '#facc15', 'green'];

  $: {
    let v = [];
    let lastPercent = 0;
    let dist = damage.getTypeDistribution();

    for(const [k, d] of Object.entries(dist)) {
      const percent = d * 100;

      if(percent > 0) {
        v.push(colorMap[Number(k)] + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
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
<div style="padding: 2px" class="border-2">
  <div style="width: 100%; height: 6px" style:background={gradient}></div>
</div>