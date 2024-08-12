<script lang="ts">
	import { attackTypes } from '$lib/core';

	export let key: string;
	export let value: number;
	export let operation: 'add' | 'multiply' | undefined = undefined;
</script>

<div class="grid text-sm grid-cols-2">
	<dt class="font-medium text-zinc-200">
		{attackTypes[key].name} Damage
	</dt>
	<dd>
		{#if operation === 'multiply'}
			{#if value > 1}+{/if}{Math.round((value - 1) * 100)}%
		{:else}
			{#if value >= 0}+{/if}{Math.round(value * 10) / 10}
		{/if}
	</dd>
</div>
