<script lang="ts">
	import type { AttackType } from '$lib/core/types';
	import { attackTypeRecord } from '$lib/records';

  export let type: `${AttackType}`;
</script>
<div class="flex flex-col">
  <span class="text-zinc-200 text-sm"><slot></slot></span> 
  <div class="bg-zinc-500 h-1" style:background-color={attackTypeRecord[type].color}></div>
</div>