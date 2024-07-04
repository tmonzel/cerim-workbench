<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
  import { type DamageNegation } from '$lib/core/types';

  export let damageNegation: DamageNegation;
</script>

<dl class="grid grid-cols-3 gap-4">
  <StatBadge name="Standard">{damageNegation.standard}</StatBadge>
  <StatBadge name="Strike">{damageNegation.strike}</StatBadge>
  <StatBadge name="Slash">{damageNegation.slash}</StatBadge>
  <StatBadge name="Pierce">{damageNegation.pierce}</StatBadge>

  <div class="col-span-2">
    <StatBadge name="Elemental">
      <span class="grid grid-cols-3 gap-2">
        <AttackTypeBadge type="mag">{damageNegation.mag}</AttackTypeBadge>
        <AttackTypeBadge type="fir">{damageNegation.fir}</AttackTypeBadge>
        <AttackTypeBadge type="lit">{damageNegation.lit}</AttackTypeBadge>
        <AttackTypeBadge type="hol">{damageNegation.hol}</AttackTypeBadge>
      </span>
    </StatBadge>
  </div>
</dl>