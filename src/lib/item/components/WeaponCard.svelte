<script lang="ts">
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import GuardGrid from '$lib/components/GuardGrid.svelte';
	import type { AttackItem } from '../AttackItem';
	import ItemHeader from './ItemHeader.svelte';
	import WeaponInfo from './WeaponInfo.svelte';

	export let item: AttackItem;
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
		<ItemHeader {item} />

		<div class="flex items-center gap-x-12 mt-3 mb-2">
			<p class="grow text-xl flex gap-2">
				<AttackBadge attack={item.attack} />
			</p>
		</div>

		<div class="mb-3">
			<AttackDetail attack={item.attack} />
		</div>

		<WeaponInfo {item} />

		<dl class="divide-y divide-gray-100/20 my-3">
			<div class="px-4 py-4 sm:grid sm:gap-2 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-zinc-300">Guard</dt>
				<dd><GuardGrid guard={item.guard} /></dd>
			</div>
		</dl>
	</div>
</div>
