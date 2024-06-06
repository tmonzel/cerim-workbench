<script lang="ts">
	import type { Stat } from '$lib/types';

  export let stat: Stat<number>;

  $: total = stat.getTotal();
  $: isModified = stat.isModified();
</script>

<span class:text-indigo-500={isModified}>{Math.round(total * 100) / 100}</span>