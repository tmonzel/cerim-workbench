<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import { AffinityType } from '$lib/core/types';
	import { affinityRecord, itemTypeRecord } from '$lib/records';
	import GuardGrid from '$lib/combat/components/GuardGrid.svelte';
	import ItemRarityBadge from '$lib/item/components/ItemRarityBadge.svelte';
	import type { Weapon } from '../Weapon';
	import WeaponInfo from '$lib/combat/components/WeaponInfo.svelte';

	export let weapon: Weapon;
</script>

<div class="flex gap-x-10">
	{#if weapon.iconUrl}
		<div class="flex justify-center px-5">
			<div>
				<img src={weapon.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150 w-full" />
			</div>
		</div>
	{/if}

	<div class="grow">
		<div class="mb-1">
			<ItemRarityBadge rarity={weapon.rarity} />
		</div>
		<div class="font-medium text-lg">
			{#if weapon.affinity && weapon.affinity !== AffinityType.STANDARD}
				<span class="font-bold">{affinityRecord[weapon.affinity].name}</span>
			{/if}
			{weapon.name}
			{#if weapon.tier > 0}(+{weapon.tier}){/if}
		</div>
		<p class=" text-zinc-400">{itemTypeRecord[weapon.type].name}</p>

		<div class="flex items-center gap-x-12 mt-3 mb-2">
			<p class="grow text-xl flex gap-2">
				<AttackBadge attack={weapon.attack} />
			</p>

			{#if weapon.weight > 0}
				<p class="text-xl font-light flex items-center gap-x-1">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ddd">
						<path
							d="M240-200h480l-57-400H297l-57 400Zm240-480q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm113 0h70q30 0 52 20t27 49l57 400q5 36-18.5 63.5T720-120H240q-37 0-60.5-27.5T161-211l57-400q5-29 27-49t52-20h70q-3-10-5-19.5t-2-20.5q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-5 19.5ZM240-200h480-480Z"
						/>
					</svg>
					{weapon.weight}
				</p>
			{/if}
		</div>

		<div class="mb-3">
			<AttackDetail attack={weapon.attack} />
		</div>

		<WeaponInfo {weapon} />

		<dl class="divide-y divide-gray-100/20 my-3">
			<div class="px-4 py-4 sm:grid sm:gap-2 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-zinc-300">Guard</dt>
				<dd><GuardGrid guard={weapon.guard} /></dd>
			</div>
		</dl>
	</div>
</div>
