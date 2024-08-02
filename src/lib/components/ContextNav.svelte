<script lang="ts">
	import { appStore } from '$lib/state';

	const contexts = [
		{
			name: 'attack',
			label: 'Combat',
			icon: 'swords'
		},

		{
			name: 'protection',
			label: 'Protection',
			icon: 'shield'
		}
	];
</script>

<div>
	<ul class="flex flex-wrap -mb-px text-lg font-medium text-center text-zinc-400">
		{#each contexts as context}
			<li class="me-2">
				<button
					class="inline-flex items-center justify-center px-4 py-2 transition-colors rounded-lg"
					class:text-violet-300={$appStore.heroContext === context.name}
					class:bg-violet-900={$appStore.heroContext === context.name}
					on:click={() => ($appStore.heroContext = context.name)}
				>
					<span class="mat-icon me-1">{context.icon}</span>{context.label}
				</button>
			</li>
		{/each}
	</ul>
</div>
