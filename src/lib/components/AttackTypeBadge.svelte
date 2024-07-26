<script lang="ts">
	import { AttackType, attackTypes } from '$lib/core';

	export let type: `${AttackType}`;
	export let value: number | undefined = undefined;
</script>

<div class="flex flex-col">
	<span class="text-zinc-200 text-sm">
		{#if value}
			{Math.round(value * 10) / 10}
		{:else}
			<slot></slot>
		{/if}
	</span>
	<div class="bg-zinc-500 h-1" style:background-color={attackTypes[type].color}></div>
</div>
