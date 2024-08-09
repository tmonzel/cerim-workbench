<script lang="ts">
	type T = $$Generic<Item>;

	export let label: string;
	export let selectedItem: T | null = null;
</script>

<button
	type="button"
	class="group w-full bg-stone-700/20 rounded-lg p-5 text-left items-start shadow-md transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800"
	on:click
>
	{#if selectedItem}
		<div class="flex justify-between">
			<div>
				<span class="text-xs font-medium px-2.5 py-0.5 rounded bg-zinc-400/20 text-zinc-300">
					{label}
				</span>
			</div>
		</div>

		<div class="mt-3">
			<slot item={selectedItem} />
		</div>
	{:else}
		<div class="text-center py-5 flex flex-col items-center">
			<p class="text-lg text-amber-300 font-semibold">{label}</p>
		</div>
	{/if}
</button>
