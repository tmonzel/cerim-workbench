<script lang="ts">
	import { attributeRecord } from '$lib/records';

  export let type: string;
</script>

<div class="flex items-center">
  <span style:background-color={attributeRecord[type].color} class="inline-block me-2 w-2 h-2 rounded"></span>{attributeRecord[type].name}
</div>