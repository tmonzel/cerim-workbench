<script lang="ts">
	import { damageTypes } from '$lib/core';

	export let key: string;
	export let value: number;

	$: total = Math.round(100 - value * 100);
</script>

<div class="grid text-sm grid-cols-2">
	<dt class="font-medium text-zinc-200">
		{damageTypes[key].name} Absorp
	</dt>
	<dd>
		{#if total > 0}+{/if}{total}
	</dd>
</div>
