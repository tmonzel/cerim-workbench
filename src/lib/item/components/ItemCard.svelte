<script lang="ts">
	import { AffinityType } from '$lib/core/types';
	import { affinityRecord, itemTypeRecord } from '$lib/records';
	import type { Item } from '../Item';
	import { Weapon } from '$lib/combat';
	import ItemRarityBadge from './ItemRarityBadge.svelte';

	export let item: Item;
</script>

<div class="flex gap-x-10">
	{#if item.iconUrl}
		<div class="flex justify-center px-5">
			<div>
				<img src={item.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150 w-full" />
			</div>
		</div>
	{/if}

	<div class="grow">
		<div class="mb-1">
			<ItemRarityBadge rarity={item.rarity} />
		</div>
		<div class="flex justify-between mb-4">
			<div>
				<div class="font-medium text-lg">
					{#if item instanceof Weapon && item.affinity && item.affinity !== AffinityType.STANDARD}
						<span class="font-bold">{affinityRecord[item.affinity].name}</span>
					{/if}
					{item.name}
					{#if item.tier > 0}(+{item.tier}){/if}
				</div>
				<p class=" text-zinc-400">{itemTypeRecord[item.type].name}</p>
			</div>

			<div class="flex mb-2">
				{#if item.weight > 0}
					<p class="text-xl font-light flex items-center gap-x-1">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
							<path
								d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"
							/>
						</svg>
						{item.weight}
					</p>
				{/if}
			</div>
		</div>

		<slot />
	</div>
</div>
