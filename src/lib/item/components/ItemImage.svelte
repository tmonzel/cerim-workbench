<script lang="ts">
	import { getIconUrl } from '$lib/helpers';
	import type { Item } from '../Item';

	export let item: Item;
</script>

<div>
	<img src={getIconUrl(item.iconId)} alt={item.name} class="object-cover transition-all duration-500 ease-out scale-95 group-hover:brightness-150" />
</div>
