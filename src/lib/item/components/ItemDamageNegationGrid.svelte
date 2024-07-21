<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { roundValue } from '$lib/core';
  import { type DamageNegation } from '$lib/core/types';

  export let damageNegation: DamageNegation;
</script>

<dl class="grid grid-cols-3 gap-4">
  <StatBadge name="Standard">{roundValue((1 - damageNegation.standard) * 100)}</StatBadge>
  <StatBadge name="Strike">{roundValue((1 - damageNegation.strike) * 100)}</StatBadge>
  <StatBadge name="Slash">{roundValue((1 - damageNegation.slash) * 100)}</StatBadge>
  <StatBadge name="Pierce">{roundValue((1 - damageNegation.pierce) * 100)}</StatBadge>

  <div class="col-span-2">
    <StatBadge name="Elemental">
      <span class="grid grid-cols-3 gap-2">
        <AttackTypeBadge type="mag">{roundValue((1 - damageNegation.mag) * 100)}</AttackTypeBadge>
        <AttackTypeBadge type="fir">{roundValue((1 - damageNegation.fir) * 100)}</AttackTypeBadge>
        <AttackTypeBadge type="lit">{roundValue((1 - damageNegation.lit) * 100)}</AttackTypeBadge>
        <AttackTypeBadge type="hol">{roundValue((1 - damageNegation.hol) * 100)}</AttackTypeBadge>
      </span>
    </StatBadge>
  </div>
</dl>