<script lang="ts">
	import { ItemRarity } from '../types';
	import ItemRarityBadge from './ItemRarityBadge.svelte';

	export let type: string = '-';
	export let rarity: ItemRarity = ItemRarity.DEFAULT;
</script>

<header class="flex justify-between mb-4">
	<div>
		<div class="mb-1">
			<ItemRarityBadge {rarity} />
		</div>
		<div>
			<div class="font-medium text-xl">
				<slot />
			</div>
			<p class="text-zinc-400">{type}</p>
		</div>
	</div>
</header>
