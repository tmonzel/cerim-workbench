<script lang="ts">
  export let icon: string | undefined = undefined;
  export let disabled = false;
</script>
<button 
  {disabled} 
  on:click 
  class="flex rounded-lg bg-stone-700 text-stone-200 p-1 group disabled:opacity-50 disabled:ring-zinc-500 disabled:text-zinc-500  ring-amber-300 hover:ring-2 hover:text-amber-300">
  {#if icon}
  <span class="mat-icon">{icon}</span>
  {/if}
  <slot />
</button>