<script lang="ts">
	import { DynamicNumber } from '$lib/core';

	export let value: DynamicNumber;
</script>

{#if value.base < value.total}
	<span class="text-emerald-300 bg-emerald-600/10 px-1 rounded-lg">
		{Math.round(value.total * 10) / 10}^
	</span>
{:else if value.base > value.total}
	<span class="text-red-400">
		{Math.round(value.total * 10) / 10}<span class="inline-block rotate-180">^</span>
	</span>
{:else}
	<span>{Math.round(value.total * 10) / 10}</span>
{/if}
