<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Item } from '../../item/Item';

	export let items: Item[];
	export let selectedId: string | null = null;

	const dispatch = createEventDispatcher<{ selectItem: Item | null }>();

	export function selectItem(item: Item | null): void {
		selectedId = item ? item.id : null;
		dispatch('selectItem', item);
	}
</script>

<div>
	{#if items.length === 0}
		<div class="text-sky-200 p-4 flex items-center rounded-lg bg-sky-900/50 m-4">
			<span class="mat-icon me-2">warning</span>Sorry, no items found
		</div>
	{/if}
	<ul class="grid grid-cols-1 px-5 py-2">
		{#each items as item}
			<li>
				<button
					type="button"
					class="w-full my-2 text-left text-white rounded-lg p-5 hover:bg-zinc-800/50 group"
					on:click={() => selectItem(item)}
					class:ring-2={selectedId === item.id}
					class:bg-stone-800={selectedId === item.id}
					class:ring-amber-300={selectedId === item.id}
				>
					<slot {item} />
				</button>
			</li>
		{/each}
	</ul>
</div>
