<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { roundValue } from '$lib/core';
  import { type DamageNegation } from '$lib/core/types';

  export let damageNegation: DamageNegation;
</script>

<dl class="grid grid-cols-3 gap-4">
  <StatBadge name="Standard">{roundValue(damageNegation.standard)}</StatBadge>
  <StatBadge name="Strike">{roundValue(damageNegation.strike)}</StatBadge>
  <StatBadge name="Slash">{roundValue(damageNegation.slash)}</StatBadge>
  <StatBadge name="Pierce">{roundValue(damageNegation.pierce)}</StatBadge>

  <div class="col-span-2">
    <StatBadge name="Elemental">
      <span class="grid grid-cols-3 gap-2">
        <AttackTypeBadge type="mag">{roundValue(damageNegation.mag)}</AttackTypeBadge>
        <AttackTypeBadge type="fir">{roundValue(damageNegation.fir)}</AttackTypeBadge>
        <AttackTypeBadge type="lit">{roundValue(damageNegation.lit)}</AttackTypeBadge>
        <AttackTypeBadge type="hol">{roundValue(damageNegation.hol)}</AttackTypeBadge>
      </span>
    </StatBadge>
  </div>
</dl>