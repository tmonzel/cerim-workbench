<script lang="ts">
	import { heroAttributes, heroModifiedAttributes, heroTypeState } from '$lib/state';
	import AttributeControl from './AttributeControl.svelte';
	import { AttributeType, attributeTypes } from './types';
</script>

<div class="attribute-panel">
	{#each Object.values(AttributeType) as type}
		<div class="mb-5">
			<AttributeControl
				base={$heroTypeState.attributes[type]}
				attribute={attributeTypes[type]}
				value={$heroAttributes[type]}
				offset={$heroModifiedAttributes[type]}
				on:changeValue={(e) => {
					heroAttributes.update((attributes) => ({ ...attributes, [type]: e.detail }));
				}}
			/>
		</div>
	{/each}
</div>
