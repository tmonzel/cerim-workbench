<script lang="ts">
	import { AttackDamageType } from '$lib/core';
	import type { AttackDamageStat } from '$lib/core/stats/AttackDamageStat';

  export let damage: AttackDamageStat;

  function getTypeDistribution(value: AttackDamageStat): Partial<Record<AttackDamageType, number>> {
    const dist: Partial<Record<AttackDamageType, number>> = {};
    const total = value.getTotal();
    
    const n = 100 / total;

    for(const t of Object.values(AttackDamageType)) {
      if(value[t] === 0) {
        continue;
      }

      dist[t] = Math.round(n * value[t]) / 100;
    }
    
    return dist;
  }
// ['#444', '#dc2626', 'blue', '#facc15', 'green']
  let gradient = '';
  let colorMap: Record<AttackDamageType, string> = {
	  [AttackDamageType.PHYSICAL]: 'var(--damage-phy)',
	  [AttackDamageType.MAGIC]: 'var(--damage-mag)',
	  [AttackDamageType.FIRE]: 'var(--damage-fir)',
	  [AttackDamageType.LIGHTNING]: 'var(--damage-lit)',
	  [AttackDamageType.HOLY]: 'var(--damage-hol)',
	  [AttackDamageType.FROSTBITE]: 'cyan',
	  [AttackDamageType.POISON]: 'green',
	  [AttackDamageType.HEMORRHAGE]: 'red',
	  [AttackDamageType.STAMINA]: 'var(--damage-sta)'
  };

  $: {
    let v = [];
    let lastPercent = 0;
    let dist = getTypeDistribution(damage);

    for(const [k, d] of Object.entries(dist)) {
      const percent = d * 100;

      if(percent > 0) {
        v.push(colorMap[k as AttackDamageType] + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
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