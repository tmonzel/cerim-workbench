<script lang="ts">
	import { AttackDamageType, type ComplexDamage } from '$lib/core';

  export let damage: ComplexDamage;

  const colorMap: Record<AttackDamageType, string> = {
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

  $: dist = damage.getValueDistribution();
</script>

<div class="flex gap-4">
  {#each dist as d}
    <div style:width={`${d.amount * 100}%`}>
      <div style:background-color={colorMap[d.key]} class="h-1"></div>
      {Math.round(d.value * 10) / 10}
    </div>
  {/each}
</div>