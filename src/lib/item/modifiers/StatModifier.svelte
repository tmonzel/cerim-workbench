<script lang="ts">
	import { statTypes } from '$lib/stat';

	export let key: string;
	export let value: number;
	export let operation: 'multiply' | 'add' | undefined = undefined;

	$: stat = statTypes[key];
	$: total = stat && stat.resolver ? stat.resolver(value) : value;
</script>

<div class="grid text-sm grid-cols-2">
	<dt class="font-medium text-zinc-200">
		{statTypes[key].name}
	</dt>
	<dd>
		{#if operation === 'multiply'}
			{#if total > 1}+{/if}{stat && stat.renderer ? stat.renderer(total) : Math.round((total - 1) * 100 * 10) / 10}%
		{:else}
			{#if total >= 0}+{/if}{stat && stat.renderer ? stat.renderer(total) : Math.round(total * 10) / 10}
		{/if}
	</dd>
</div>
