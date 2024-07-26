<script lang="ts">
	import type { Item } from '../Item';
	import ItemHeader from './ItemHeader.svelte';

	export let item: Item;
</script>

<div class="max-w-sm w-full lg:max-w-full lg:flex">
	{#if item.iconUrl}
		<div class="me-5">
			<img
				src={item.iconUrl}
				alt="Item icon"
				class="w-full object-cover md:w-60 transition-all group-hover:brightness-150"
			/>
		</div>
	{/if}

	<div class="grow">
		<ItemHeader {item} />

		<slot />
	</div>
</div>
