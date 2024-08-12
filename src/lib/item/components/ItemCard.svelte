<script lang="ts">
	import { getIconUrl } from '$lib/helpers';
	import type { Item } from '../Item';

	export let item: Item;
</script>

<article class="max-w-sm w-full lg:max-w-full lg:flex">
	<div class="px-5">
		<img src={getIconUrl(item.iconId)} alt={item.name} class="object-cover transition-all group-hover:brightness-150" />
	</div>

	<div class="grow">
		<slot />
	</div>
</article>
