<script lang="ts">
	import { getIconUrl } from '$lib/helpers';
	import type { Item } from '../Item';

	export let item: Item;
</script>

<button class="group flex flex-col items-center" on:click>
	<img src={getIconUrl(item.iconId)} alt={item.name} class="object-cover transition-all group-hover:brightness-150" />

	<div class="flex rounded-lg text-stone-400/50 p-1">
		<span
			class="mat-icon group-hover:rotate-180 duration-200 group-hover:text-amber-300 group-hover:scale-150"
			style="font-size: 1.9em">sync</span
		>
	</div>
</button>
