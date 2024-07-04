<script lang="ts">
	import { DynamicNumber } from '$lib/core';

  export let value: DynamicNumber;
</script>

{#if value.base < value.total}
  <span class="text-emerald-400 font-normal">
    {Math.round(value.total * 100) / 100}^
  </span>
{:else if value.base > value.total}
  <span class="text-red-400 font-normal">
    {Math.round(value.total * 100) / 100}<span class="inline-block rotate-180">^</span>
  </span>
{:else}
  <span>{Math.round(value.total * 10) / 10}</span>
{/if}
