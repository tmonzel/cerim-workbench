<script lang="ts">
	import { ItemRarity } from '../types';
	import ItemRarityBadge from './ItemRarityBadge.svelte';

	export let type: string = '-';
	export let weight: number = 0;
	export let rarity: ItemRarity = ItemRarity.DEFAULT;
</script>

<div class="flex justify-between mb-4">
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
	{#if weight > 0}
		<div>
			<div class="text-xl font-light flex items-center gap-x-1">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
					<path
						d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"
					/>
				</svg>
				{weight}
			</div>
		</div>
	{/if}
</div>
