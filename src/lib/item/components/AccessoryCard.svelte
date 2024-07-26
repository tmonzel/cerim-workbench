<script lang="ts">
	import ItemModifierList from '$lib/item/components/ItemModifierList.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import type { AccessoryItem } from '$lib/item';

	export let item: AccessoryItem;
</script>

<div class="flex gap-x-5">
	{#if item.iconUrl}
		<div class="max-w-56">
			<img src={item.iconUrl} alt="Item icon" class="transition-all group-hover:brightness-150" />
		</div>
	{/if}

	<div class="grow">
		<ItemHeader {item} />
		<ItemModifierList data={item.modifiers} />
	</div>
</div>
