<script lang="ts">
	import { heroTypeState } from '$lib/state';
	import AttributeControl from './AttributeControl.svelte';
	import { attributeStore, modifiedAttributes } from './state';
	import { AttributeType, attributeTypes } from './types';
</script>

<div class="attribute-panel">
	{#each Object.values(AttributeType) as type}
		<div class="mb-5">
			<AttributeControl
				base={$heroTypeState.attributes[type]}
				attribute={attributeTypes[type]}
				offset={$modifiedAttributes[type]}
				bind:value={$attributeStore[type]}
			/>
		</div>
	{/each}
</div>
