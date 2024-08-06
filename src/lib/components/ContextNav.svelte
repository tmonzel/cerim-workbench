<script lang="ts">
	import { appStore } from '$lib/state';

	const contexts = [
		{
			name: 'attack',
			label: 'Weapons',
			icon: 'swords'
		},

		{
			name: 'protection',
			label: 'Armor',
			icon: 'shield'
		},

		{
			name: 'accessories',
			label: 'Accessories',
			icon: 'diamond'
		}
	];
</script>

<div>
	<ul class="flex flex-wrap -mb-px text-lg font-medium text-center text-zinc-400">
		{#each contexts as context}
			<li class="me-2">
				<button
					class="inline-flex items-center justify-center px-4 py-2 transition-colors rounded-lg"
					class:text-teal-300={$appStore.heroContext === context.name}
					class:bg-teal-900={$appStore.heroContext === context.name}
					on:click={() => ($appStore.heroContext = context.name)}
				>
					<span class="mat-icon me-1">{context.icon}</span>{context.label}
				</button>
			</li>
		{/each}
	</ul>
</div>
