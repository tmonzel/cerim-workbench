<script lang="ts">
	import type { HeroStat } from '$lib/hero';

	export let value: HeroStat;

	$: total = value.getTotal();
</script>

{#if value.base < total}
	<span class="text-emerald-300 bg-emerald-600/10 px-1 rounded-lg">
		{value}^
	</span>
{:else if value.base > total}
	<span class="text-red-400">
		{value}<span class="inline-block rotate-180">^</span>
	</span>
{:else}
	<span>{value}</span>
{/if}
