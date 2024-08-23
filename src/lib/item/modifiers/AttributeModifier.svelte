<script lang="ts">
	import AttributeBadge from '$lib/attribute/AttributeBadge.svelte';

	export let key: string;
	export let value: number;
</script>

<div class="flex gap-x-5 text-sm">
	<dt class="font-medium text-zinc-200">
		<div class="flex items-center">
			<AttributeBadge type={key} />
		</div>
	</dt>
	<dd>
		+{value}
	</dd>
</div>
