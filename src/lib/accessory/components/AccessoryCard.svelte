<script lang="ts">
	import { itemTypeRecord } from '$lib/records';
	import ItemModifierList from '$lib/item/components/ItemModifierList.svelte';
	import ItemRarityBadge from '$lib/item/components/ItemRarityBadge.svelte';
	import type { Accessory } from '../Accessory';

	export let accessory: Accessory;
</script>

<div class="flex gap-x-5">
	{#if accessory.iconUrl}
		<div class="max-w-56">
			<img src={accessory.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150" />
		</div>
	{/if}

	<div class="grow">
		<div class="mb-1">
			<ItemRarityBadge rarity={accessory.rarity} />
		</div>
		<div class="font-medium text-xl">
			{accessory.name}
			{#if accessory.tier > 0}(+{accessory.tier}){/if}
		</div>
		<p class=" text-zinc-400">{itemTypeRecord[accessory.type].name}</p>

		<div class="flex items-center gap-x-12 mt-3 mb-2">
			{#if accessory.weight > 0}
				<p class="text-xl font-light flex items-center gap-x-1">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
						<path
							d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"
						/>
					</svg>
					{accessory.weight}
				</p>
			{/if}
		</div>

		<ItemModifierList data={accessory.modifiers} />
	</div>
</div>
