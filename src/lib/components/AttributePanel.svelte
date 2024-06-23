<script lang="ts">
	import { attributeRecord, attributeStore, type AttributeState } from '$lib/attributes';
	import { AttributeType } from '$lib/core';
	import AttributeControl from './AttributeControl.svelte';

  export let state: Partial<AttributeState>;
</script>

<div class="attribute-panel">
  {#each Object.values(AttributeType) as type}
    <div class="mb-5">
      <AttributeControl attribute={attributeRecord[type]} value={state[type]?.value ?? 0}  offset={state[type]?.offset ?? 0} on:changeValue={(e) => {
        attributeStore.update((store) => ({ ...store, [type]: { ...store[type], value: e.detail } }))
      }} />
    </div>
  {/each}
</div>