<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	type T = $$Generic<any>;

	export let options: T[] = [];
	export let showMenu = false;
	export let value: any = null;
	export let selectBy = 'id';
	export let compareWith = (v: T, v2: any) => v === v2[selectBy];

	const dispatch = createEventDispatcher<{ select: any }>();
	const selected = writable<null | any>(null);

	$: {
		for (const item of options) {
			if (compareWith(value, item)) {
				selected.set(item);
				break;
			}
		}
	}

	function selectValue(val: null | unknown): void {
		value = val;
		showMenu = false;

		dispatch('select', value);
	}
</script>

<svelte:document
	on:click={() => {
		showMenu = false;
	}}
/>

<div class="relative">
	<button
		type="button"
		class="relative w-full rounded-lg p-0.5 bg-zinc-700/50 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-amber-300"
		aria-expanded={showMenu}
		on:click|stopPropagation={() => (showMenu = !showMenu)}
	>
		<span class="flex items-center select-none ps-1 whitespace-nowrap">
			<slot name="selected" item={$selected} />
		</span>
		<span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
			<svg class="h-5 w-5 ring-amber-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
	</button>

	{#if showMenu}
		<div
			class="absolute z-40 mt-2 p-2 -left-1 shadow-lg rounded-md bg-zinc-800 border border-zinc-600 flex flex-col gap-y-2"
			tabindex="-1"
			role="listbox"
		>
			{#each options as item, i}
				{@const isSelected = compareWith($selected[selectBy], item)}
				<button
					class="relative w-full rounded-md select-none py-1 pl-2 pr-12 flex justify-between hover:bg-zinc-700 ring-amber-300"
					id="listbox-option-{i}"
					role="option"
					aria-selected={isSelected}
					on:click|stopPropagation={() => selectValue(item[selectBy])}
					class:bg-stone-800={isSelected}
					class:ring-2={isSelected}
				>
					<div class="flex items-center whitespace-nowrap">
						<slot {item} />
					</div>

					{#if isSelected}
						<span class="absolute inset-y-0 right-0 flex items-center pr-2">
							<svg class="h-5 w-5 fill-amber-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
