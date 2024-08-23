<script lang="ts">
	import { uiState, heroState } from '$lib/state';
	import { createEventDispatcher } from 'svelte';
	import type { Attribute } from './types';

	export let base: number;
	export let attribute: Attribute;
	export let value: number;
	export let offset: number = 0;

	const id = crypto.randomUUID();
	const dispatch = createEventDispatcher<{ changeValue: number }>();

	let showTooltip = false;
	let total = 0;

	$: {
		$uiState.showRuneInfo = showTooltip;
	}

	$: total = base + value;

	function changeValue(newValue: number) {
		if (newValue < 0) {
			return;
		}

		if (newValue + base > 99) {
			return 99 - base;
		}

		dispatch('changeValue', newValue);
	}
</script>

<label for={id} class="flex items-center text-sm font-medium text-zinc-200">
	{#if attribute.color}<span style:background-color={attribute.color} class="me-2 w-2.5 h-2.5 rounded"></span>{/if}
	{attribute.name}
</label>
<div class="relative mt-2 rounded-md font-medium bg-zinc-600/20 group">
	<div class="absolute inset-y-0 left-0 flex items-center z-20">
		<button
			class="rounded-md border-0 px-4 text-zinc-200 hover:scale-150 transition-transform ease-out"
			on:pointerover={() => (showTooltip = true)}
			on:pointerout={() => (showTooltip = false)}
			on:click={() => changeValue(value - 1)}
		>
			-
		</button>
	</div>
	<div class="rounded-md border-0 py-1 text-center text-zinc-300">
		{base + value}
		{#if offset > 0}<span class="opacity-60">(+{offset})</span>{/if}
	</div>
	<div class="absolute inset-y-0 right-0 flex items-center z-20">
		<button
			class="rounded-md border-0 bg-transparent px-4 text-zinc-200 hover:scale-150 transition-transform ease-out"
			on:pointerover={() => (showTooltip = true)}
			on:pointerout={() => (showTooltip = false)}
			on:click={() => ($heroState.attributePoints > 0 ? changeValue(value + 1) : -1)}
		>
			+
		</button>
	</div>
	<div class="absolute z-10 rounded-md top-0 left-0 bottom-0 bg-zinc-400/20" style:width={`${(total / 99) * 100}%`}></div>
</div>
