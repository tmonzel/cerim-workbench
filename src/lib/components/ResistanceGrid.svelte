<script lang="ts">
	import type { Resistance } from '$lib/core';
	import StatBadge from './StatBadge.svelte';

	export let data: Resistance;
</script>

<dl class="grid grid-cols-2 gap-3">
	<StatBadge name="Immunity">{data.immunity}</StatBadge>
	<StatBadge name="Robustness">{data.robustness}</StatBadge>
	<StatBadge name="Focus">{data.focus}</StatBadge>
	<StatBadge name="Vitality">{data.vitality}</StatBadge>
</dl>
