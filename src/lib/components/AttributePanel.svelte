<script lang="ts">
	import type { AttributeState } from '$lib/attribute.store';
	import AttributeControl from './AttributeControl.svelte';

  export let state: AttributeState;
</script>

<div>
  {#each Object.keys(state) as name}
    <div class="mb-4">
      <AttributeControl 
        label={state[name].label} 
        bind:value={state[name].value} 
      />
    </div>
  {/each}
</div>