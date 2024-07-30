<script lang="ts">
	import type { ItemModifier } from '../ItemModifier';
	import ModifierValue from './ModifierValue.svelte';

	export let data: ItemModifier[] = [];
</script>

<ul class="divide-y divide-gray-100/20">
	{#each data as modifier}
		<li class="py-2">
			<ModifierValue {modifier} />
		</li>
	{/each}
</ul>
