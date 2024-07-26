<script lang="ts">
	import { roundValue, type DamageNegation } from '$lib/core';
	import AttackTypeBadge from './AttackTypeBadge.svelte';
	import StatBadge from './StatBadge.svelte';

	export let data: DamageNegation;
</script>

<dl class="grid grid-cols-2 gap-4">
	<StatBadge name="Standard">{roundValue((1 - data.standard) * 100)}</StatBadge>
	<StatBadge name="Strike">{roundValue((1 - data.strike) * 100)}</StatBadge>
	<StatBadge name="Slash">{roundValue((1 - data.slash) * 100)}</StatBadge>
	<StatBadge name="Pierce">{roundValue((1 - data.pierce) * 100)}</StatBadge>

	<div class="col-span-2">
		<StatBadge name="Elemental">
			<span class="grid grid-cols-2 gap-2">
				<AttackTypeBadge type="mag">{roundValue((1 - data.mag) * 100)}</AttackTypeBadge>
				<AttackTypeBadge type="fir">{roundValue((1 - data.fir) * 100)}</AttackTypeBadge>
				<AttackTypeBadge type="lit">{roundValue((1 - data.lit) * 100)}</AttackTypeBadge>
				<AttackTypeBadge type="hol">{roundValue((1 - data.hol) * 100)}</AttackTypeBadge>
			</span>
		</StatBadge>
	</div>
</dl>
