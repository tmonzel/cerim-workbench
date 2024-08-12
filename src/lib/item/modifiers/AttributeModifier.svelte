<script lang="ts">
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';

	export let key: string;
	export let value: number;
</script>

<div class="grid text-sm grid-cols-2">
	<dt class="font-medium text-zinc-200">
		<div class="flex items-center">
			<AttributeBadge type={key} />
		</div>
	</dt>
	<dd>
		+{value}
	</dd>
</div>
