<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import { roundValue, type DamageNegation } from '$lib/core';
	import StatBadge from '$lib/stat/StatBadge.svelte';

	export let data: DamageNegation;
</script>

<dl class="grid grid-cols-3 gap-4">
	<StatBadge name="Standard">{roundValue(data.standard)}</StatBadge>
	<StatBadge name="Strike">{roundValue(data.strike)}</StatBadge>
	<StatBadge name="Slash">{roundValue(data.slash)}</StatBadge>
	<StatBadge name="Pierce">{roundValue(data.pierce)}</StatBadge>

	<div class="col-span-2">
		<StatBadge name="Elemental">
			<span class="grid grid-cols-2 gap-2">
				<AttackTypeBadge type="mag">{roundValue(data.mag)}</AttackTypeBadge>
				<AttackTypeBadge type="fir">{roundValue(data.fir)}</AttackTypeBadge>
				<AttackTypeBadge type="lit">{roundValue(data.lit)}</AttackTypeBadge>
				<AttackTypeBadge type="hol">{roundValue(data.hol)}</AttackTypeBadge>
			</span>
		</StatBadge>
	</div>
</dl>
