<script lang="ts">
	import type { Item } from '../Item';

	type T = $$Generic<Item>;

	export let label: string;
	export let item: T | null = null;

	// hover:bg-stone-800/50 hover:ring-2
</script>

{#if item}
	<div class="group w-full bg-zinc-700/10 rounded-lg ring-amber-300 transition-all p-5 text-left shadow-md hover:bg-zinc-800/40 hover:shadow-xl">
		<div class="flex justify-between">
			<div>
				<span class="text-xs font-medium px-2.5 py-0.5 rounded bg-zinc-400/20 text-zinc-300">
					{label}
				</span>
			</div>
		</div>

		<div class="mt-3">
			<slot {item} />
		</div>
	</div>
{:else}
	<button
		class="w-full bg-zinc-700/20 rounded-lg p-10 shadow-md flex flex-col items-center transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800"
		on:click
	>
		<p class="text-lg text-amber-300 font-semibold">{label}</p>
	</button>
{/if}
