<script lang="ts">
	export let tabs: string[];
	export let activeIndex: number = 0;
</script>

<ul class="flex flex-wrap -mb-px text-sm font-medium text-zinc-500 border-b border-zinc-700">
	{#each tabs as tab, i}
		<li class="flex-1">
			<button
				class="w-full p-4 border-b-4 rounded-t-lg"
				class:border-transparent={activeIndex !== i}
				class:text-amber-300={activeIndex === i}
				class:border-amber-300={activeIndex === i}
				on:click={() => (activeIndex = i)}
			>
				{tab}
			</button>
		</li>
	{/each}
</ul>

<slot {activeIndex} />
