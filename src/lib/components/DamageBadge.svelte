<script lang="ts">
	import { roundValue } from '$lib/helpers';
	import type { ComplexDamage } from '$lib/values/complex-damage';

  export let damage: ComplexDamage;
  export let showTypes = false;

  let avg = 0;
  let gradient = '';
  let colorMap = ['#ccc', 'red', 'yellow', 'blue', 'green'];

  $: {
    const dist = damage.getTypeDistribution();

    let v = [];
    let lastPercent = 0;
  

    for(const i in dist) {
      const percent = dist[i] * 100;

      if(percent > 0) {
        v.push(colorMap[i] + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
        lastPercent = percent;
      }
    }

    gradient = `linear-gradient(to right, ${v.join(',')})`;

    const sumDmg = damage.min + damage.max;
    avg = sumDmg > 0 ? Math.round((sumDmg / 2) * 100) / 100 : 0;
  }
</script>

<span>{roundValue(damage.min)}-{roundValue(damage.max)} ({avg})</span>
{#if showTypes}
<div style="width: 100%; height: 2px" style:background={gradient}></div>
{/if}