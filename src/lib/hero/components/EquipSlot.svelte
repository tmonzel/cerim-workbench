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
				<span class="text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300">
					{label}
				</span>
			</div>
			<div>
				<button
					class="relative flex rounded-lg bg-stone-600/40 p-1 ring-stone-400 hover:ring-2 group"
					on:click|stopPropagation|preventDefault={() => (selectedItem = null)}
				>
					<svg
						class="fill-stone-400"
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#5f6368"
						><path
							d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
						/></svg
					>
				</button>
			</div>
		</div>

		<div class="pt-3">
			<slot item={selectedItem} />
		</div>
	{:else}
		<div class="text-center py-5 flex flex-col items-center">
			<p class="text-lg text-amber-300 font-semibold">{label}</p>
		</div>
	{/if}
</button>
