<script lang="ts">
	import { list } from '$lib/core';
	import type { AttributeType } from '$lib/core/types';
	import { attributeRecord } from '$lib/records';

  export let value: Partial<Record<AttributeType, number>>;
</script>

<div class="grid grid-cols-2">
  {#each list(value) as attr}
    <div class="flex items-center">
      <span style:background-color={attributeRecord[attr.key].color} class="me-1 w-2.5 h-2.5 rounded"></span>
      <span>+{attr.value}</span>
    </div>
  {/each}
</div>