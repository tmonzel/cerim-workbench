<script lang="ts">
	import { statTypes } from '$lib/core';

	export let type: 'flat' | 'percentual' | 'duration' = 'flat';
	export let affects: string;
	export let value: number;

	$: stat = statTypes[affects];
	$: total = stat && stat.resolver ? stat.resolver(value) : value;
</script>

{#if type === 'percentual'}
	<span>
		{#if total > 1}+{/if}{stat && stat.renderer ? stat.renderer(total) : Math.round((total - 1) * 100 * 10) / 10}%
	</span>
{:else if type === 'duration'}
	<span>
		{#if total >= 0}+{/if}{stat && stat.renderer ? stat.renderer(total) : Math.round(total * 10) / 10}/s
	</span>
{:else}
	{#if total >= 0}+{/if}{stat && stat.renderer ? stat.renderer(total) : Math.round(total * 10) / 10}
{/if}
