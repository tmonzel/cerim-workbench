<script lang="ts">
  export let textColor: string = '#ffffff';
  export let blurColor: string = '#ffffff';
</script>

<div class="flex">
  <span class="absolute border blur-lg bg-clip-text text-transparent select-none" style:color={blurColor}>
    <slot></slot>
  </span>
  <h1
      class="relative bg-clip-text text-transparent select-auto" style:color={textColor}>
      <slot></slot>
  </h1>
</div>