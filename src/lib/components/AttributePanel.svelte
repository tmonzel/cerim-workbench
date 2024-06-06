<script lang="ts">
	import type { Attribute } from '$lib/types';
	import AttributeControl from './AttributeControl.svelte';

  export let attributes: Record<string, Attribute>;
</script>

<div>
  {#each Object.keys(attributes) as name}
    <div class="mb-4">
      <AttributeControl 
        label={attributes[name].label} 
        bind:value={attributes[name].value} 
      />
    </div>
  {/each}
</div>