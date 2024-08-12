<script lang="ts">
	export let totalItems: number = 100;
	export let itemsPerPage: number = 50;
	export let currentPage: number = 1;

	$: totalPages = Math.round(totalItems / itemsPerPage);
	$: pages = Array.from({ length: totalPages }, (v, i) => i + 1);
</script>

<nav class="isolate inline-flex -space-x-px rounded-md bg-zinc-800/50" aria-label="Pagination">
	<button
		on:click={() => (currentPage -= currentPage > 1 ? 1 : 0)}
		class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0"
	>
		<span class="sr-only">Previous</span>
		<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#each pages as page}
		{#if currentPage === page}
			<button
				on:click={() => (currentPage = page)}
				aria-current="page"
				class="relative z-10 inline-flex items-center px-4 py-2 bg-zinc-700 font-semibold text-zinc-200 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>{page}</button
			>
		{:else}
			<button
				on:click={() => (currentPage = page)}
				class="relative z-10 inline-flex items-center px-4 py-2 ring-zinc-700 font-semibold text-zinc-400 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>{page}</button
			>{/if}
	{/each}
	<button
		on:click={() => (currentPage += currentPage < totalPages ? 1 : 0)}
		class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-zinc-700 focus:z-20 focus:outline-offset-0"
	>
		<span class="sr-only">Next</span>
		<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</nav>
