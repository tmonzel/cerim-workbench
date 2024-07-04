<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
  import type { Guard } from '$lib/core/types';

  export let guard: Guard;
</script>

<dl class="grid grid-cols-3 gap-4">
  <StatBadge name="Standard">{guard.phy}</StatBadge>
  <StatBadge name="Stability">{guard.sta}</StatBadge>
  <StatBadge name="Resistance">{guard.res}</StatBadge>

  <div class="col-span-2">
    <StatBadge name="Elemental">
      <span class="grid grid-cols-3 gap-2">
        <AttackTypeBadge type="mag">{guard.mag}</AttackTypeBadge>
        <AttackTypeBadge type="fir">{guard.fir}</AttackTypeBadge>
        <AttackTypeBadge type="lit">{guard.lit}</AttackTypeBadge>
        <AttackTypeBadge type="hol">{guard.hol}</AttackTypeBadge>
      </span>
    </StatBadge>
  </div>
</dl>