<script lang="ts">
  export let show = false;
</script>
<div 
  role="tooltip"
  class="absolute z-50 invisible group-hover:visible transition-opacity opacity-0 group-hover:opacity-100 p-5 text-sm font-medium rounded-lg shadow-sm tooltip bg-zinc-800 border border-zinc-600">
  <slot />
</div>

<style>
  .tooltip {
    top: 0;
    left: 110%;
  }
</style>