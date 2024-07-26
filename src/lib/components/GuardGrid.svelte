<script lang="ts">
	import type { Guard } from '$lib/core/types';
	import AttackTypeBadge from './AttackTypeBadge.svelte';
	import StatBadge from './StatBadge.svelte';

	export let guard: Guard;
</script>

<dl class="grid grid-cols-3 gap-4">
	<StatBadge name="Standard" value={guard.phy} />
	<StatBadge name="Stability" value={guard.sta} />
	<StatBadge name="Resistance" value={guard.res} />

	<div class="col-span-3">
		<StatBadge name="Elemental">
			<span class="grid grid-cols-2 gap-2 mt-2">
				<AttackTypeBadge type="mag" value={guard.mag} />
				<AttackTypeBadge type="fir" value={guard.fir} />
				<AttackTypeBadge type="lit" value={guard.lit} />
				<AttackTypeBadge type="hol" value={guard.hol} />
			</span>
		</StatBadge>
	</div>
</dl>
