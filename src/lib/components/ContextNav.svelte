<script lang="ts">
	import { appStore } from '$lib/state';

	const contexts = [
		{
			name: 'attack',
			label: 'Combat'
		},

		{
			name: 'protection',
			label: 'Protection'
		},

		{
			name: 'accessories',
			label: 'Accessories'
		}
	];
</script>

<div>
	<ul class="flex flex-wrap -mb-px text-lg font-medium text-center text-zinc-400">
		{#each contexts as context}
			<li class="me-2">
				<button
					class="inline-flex items-center justify-center px-4 py-2 transition-colors rounded-lg"
					class:text-indigo-300={$appStore.heroContext === context.name}
					class:bg-indigo-900={$appStore.heroContext === context.name}
					on:click={() => ($appStore.heroContext = context.name)}
				>
					<svg
						class="w-4 h-4 me-2 text-zinc-600 group-hover:text-zinc-400"
						class:fill-indigo-300={$appStore.heroContext === context.name}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
						/>
					</svg>{context.label}
				</button>
			</li>
		{/each}
	</ul>
</div>
