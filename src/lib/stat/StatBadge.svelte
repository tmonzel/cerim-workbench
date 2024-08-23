<script lang="ts">
  export let name: string;
  export let value: number | undefined = undefined;
</script>

<div class="text-sm">
  <dt class="font-medium text-zinc-500">{name}</dt>
  <dd class="text-zinc-300">
    {#if value}
      {Math.round(value * 10) / 10}
    {:else}
      <slot></slot>
    {/if}
  </dd>
</div>