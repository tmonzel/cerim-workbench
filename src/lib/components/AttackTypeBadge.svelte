<script lang="ts">
	import type { AttackType } from '$lib/core/types';
	import { attackTypeRecord } from '$lib/records';

  export let type: `${AttackType}`;
  export let value: number | undefined = undefined;
</script>
<div class="flex flex-col">
  <span class="text-zinc-200 text-sm">
    {#if value}
      {Math.round(value * 10) / 10}
    {:else}
      <slot></slot>
    {/if}
  </span> 
  <div class="bg-zinc-500 h-1" style:background-color={attackTypeRecord[type].color}></div>
</div>