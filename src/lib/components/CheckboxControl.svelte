<script lang="ts">
	import { createEventDispatcher } from 'svelte';

  export let value: unknown = undefined;
  export let checked: boolean = false;

  const id = `checkbox_${crypto.randomUUID()}`;

  const dispatch = createEventDispatcher<{ checked: boolean }>();

  function setChecked(v: boolean) {
    dispatch('checked', v);
  }
</script>

<div class="flex items-center">
  <input 
    {id} 
    bind:checked={checked}
    type="checkbox" 
    bind:value={value} 
    on:change={(e) => setChecked(checked)}
    class="w-4 h-4 rounded focus:ring-amber-300 bg-stone-700 border-stone-500 checked:text-stone-500 checkbox-control"
  >
  <label for={id} class="ms-2 text-sm font-medium text-gray-400" class:text-gray-300={checked}>
    <slot />
  </label>
</div>

<style>
  .checkbox-control {
    --tw-ring-offset-width: 0px;
  }
</style>