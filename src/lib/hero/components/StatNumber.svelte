<script lang="ts">
	import { statTypes } from '$lib/core';

	export let name: string;
	export let value: number;
	export let modifier = false;
	export let percentual = false;

	$: stat = statTypes[name];
	$: total = stat.resolver ? stat.resolver(value) : value;
</script>

<span>
	{#if modifier && total >= 0}+{/if}{stat.renderer
		? stat.renderer(total)
		: Math.round(total * 10) / 10}{#if percentual}%{/if}
</span>
