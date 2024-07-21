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

<div class="flex">
  <input 
    {id} 
    bind:checked={checked}
    type="checkbox" 
    bind:value={value} 
    on:change={(e) => setChecked(checked)}
    class="w-4 h-4 rounded text-amber-300 bg-zinc-700 border-zinc-300 focus:ring-amber-300 focus:ring-2 tc-checkbox-input transition-all focus:ring-offset-zinc-800 checked:ring-1 checked:ring-amber-300"
  >
  <label for={id} class="ms-2 text-sm select-none" class:text-zinc-300={checked} class:text-zinc-400={!checked} style="line-height: 1.13rem;">
    <slot />
  </label>
</div>

<style>
  .tc-checkbox-input:focus {
    --tw-ring-offset-width: 2px;
  }

  .tc-checkbox-input:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='111827' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }
</style>