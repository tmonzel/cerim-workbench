<script lang="ts">
	import type { Guard } from '$lib/core/types';
	import AttackTypeBadge from './AttackTypeBadge.svelte';
	import StatBadge from './StatBadge.svelte';

	export let data: Guard;
</script>

<dl class="grid grid-cols-4 gap-4">
	<StatBadge name="Physical" value={data.phy} />
	<StatBadge name="Stability" value={data.sta} />
	<StatBadge name="Resistance" value={data.res} />

	<div class="col-span-1">
		<StatBadge name="Elemental Guard">
			<span class="grid grid-cols-2 gap-2 mt-2">
				<AttackTypeBadge type="mag" value={data.mag} />
				<AttackTypeBadge type="fir" value={data.fir} />
				<AttackTypeBadge type="lit" value={data.lit} />
				<AttackTypeBadge type="hol" value={data.hol} />
			</span>
		</StatBadge>
	</div>
</dl>
