<script lang="ts">
	import { attributeTypes } from '$lib/hero';

	export let type: string;
</script>

<div class="flex items-center">
	<span style:background-color={attributeTypes[type].color} class="inline-block me-2 w-2 h-2 rounded"
	></span>{attributeTypes[type].name}
</div>
