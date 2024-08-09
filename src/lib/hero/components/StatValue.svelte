<script lang="ts">
	import { heroState } from '../state';
	import { stats } from '../stats';

	export let name: string;

	const stat = stats[name];

	$: value = $heroState.stats[name];
	$: total = value.getTotal();
</script>

{#if value.base < total}
	<span class="text-emerald-300 bg-emerald-600/10 px-1 rounded-lg">
		{stat.renderer ? stat.renderer(total) : value}^
	</span>
{:else if value.base > total}
	<span class="text-red-400">
		{stat.renderer ? stat.renderer(total) : value}<span class="inline-block rotate-180">^</span>
	</span>
{:else}
	<span>{stat.renderer ? stat.renderer(total) : value}</span>
{/if}
