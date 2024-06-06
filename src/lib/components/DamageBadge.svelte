<script lang="ts">
	import { ComplexDamage } from '$lib/core';
	import { roundValue } from '$lib/core/helpers';
	import type { Stat } from '$lib/types';

  export let stat: Stat<ComplexDamage>;
  export let showTypes = false;

  let avg = 0;
  let gradient = '';
  let colorMap = ['#ccc', 'red', 'yellow', 'blue', 'green'];
  let total = [0, 0];
  let damage = new ComplexDamage();

  $: {
    damage = stat.getTotal();
    total = damage.getTotal();

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
    
    
    const sumDmg = total[0] + total[1];
    avg = sumDmg > 0 ? Math.round((sumDmg / 2) * 100) / 100 : 0;
  }
</script>

<span>{roundValue(total[0])}-{roundValue(total[1])} ({avg})</span>
{#if showTypes}
<div style="width: 100%; height: 2px" style:background={gradient}></div>
{/if}