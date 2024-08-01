<script lang="ts">
	export let value: string;
	export let placeholder: string | null = null;
</script>

<input
	type="text"
	bind:value
	{placeholder}
	class="w-full rounded-lg bg-zinc-700/50 border-none focus:outline-none focus:ring-2 focus:ring-amber-300 p-2 {$$restProps.class ||
		''}"
/>
