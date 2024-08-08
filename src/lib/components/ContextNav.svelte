<script lang="ts">
	import { appStore } from '$lib/state';

	const contexts = [
		{
			name: 'dashboard',
			label: 'Dashboard',
			icon: 'insert_chart'
		},
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
	<ul class="flex flex-wrap -mb-px gap-x-3 text-lg font-medium text-center text-zinc-400">
		{#each contexts as context}
			<li>
				<button
					class="inline-flex items-center justify-center px-4 py-2 transition-colors rounded-lg nav-btn"
					class:active={$appStore.heroContext === context.name}
					on:click={() => ($appStore.heroContext = context.name)}
				>
					<span class="mat-icon me-1">{context.icon}</span>{context.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.nav-btn {
		background-color: rgb(39 39 42 / 0.3);
	}

	.nav-btn.active {
		color: #5eead4;
		background-color: #172a29;
	}
</style>
