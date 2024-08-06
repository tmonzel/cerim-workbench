<script lang="ts">
	import type { ComponentType } from 'svelte';

	type NavTabItem = {
		label: string;
		component: ComponentType;
	};

	export let items: NavTabItem[];
	export let activeIndex: number = 0;
</script>

<ul class="flex flex-wrap -mb-px text-sm font-medium text-zinc-500 border-b border-zinc-700">
	{#each items as item, i}
		<li class="flex-1">
			<button
				class="w-full p-4 border-b-4 rounded-t-lg"
				class:border-transparent={activeIndex !== i}
				class:text-amber-300={activeIndex === i}
				class:border-amber-300={activeIndex === i}
				on:click={() => (activeIndex = i)}
			>
				{item.label}
			</button>
		</li>
	{/each}
</ul>

{#each items as item, i}
	{#if activeIndex == i}
		<div>
			<svelte:component this={item.component} />
		</div>
	{/if}
{/each}
