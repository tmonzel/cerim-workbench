<script lang="ts">
	import StatusEffectIcon from '$lib/components/StatusEffectIcon.svelte';

	export let key: string;
	export let value: number;
</script>

<div class="grid text-sm grid-cols-2">
	<dt class="font-medium text-zinc-200">
		<div class="flex">
			<span class="me-2">
				<StatusEffectIcon effect={key} />
			</span>
			{key}
		</div>
	</dt>
	<dd>
		+{value}
	</dd>
</div>
