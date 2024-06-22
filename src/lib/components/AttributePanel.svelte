<script lang="ts">
	import { attributeStore } from '$lib/attributes';
	import type { Attribute } from '$lib/types';
	import AttributeControl from './AttributeControl.svelte';

  export let attributes: Record<string, Attribute>;
</script>

<div class="attribute-panel">
  {#each Object.entries(attributes) as [name, attr]}
    <div class="mb-5">
      <AttributeControl attribute={attr} on:changeValue={(e) => {
        attributeStore.update((store) => ({ ...store, [name]: { ...store[name], value: e.detail } }))
      }} />
    </div>
  {/each}
</div>