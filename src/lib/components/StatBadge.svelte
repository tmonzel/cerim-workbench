<script lang="ts">
  export let name: string;
</script>

<div class="text-sm">
  <dt class="font-medium text-zinc-500">{name}</dt>
  <dd class="text-zinc-300">
    <slot></slot>
  </dd>
</div>