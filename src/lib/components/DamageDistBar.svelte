<script lang="ts">
	import { AttackDamageType } from '$lib/core';
	import type { ComplexDamage } from '$lib/core/values';

  export let damage: ComplexDamage;

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
    let dist = damage.getValueDistribution();

    for(const d of dist) {
      const percent = d.amount * 100;

      if(percent > 0) {
        v.push(colorMap[d.key] + ' ' + lastPercent + '% ' + (lastPercent + percent) + '%');
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