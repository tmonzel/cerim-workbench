<script lang="ts">
	import { type Damage } from '$lib/core';

  export let damage: Partial<Damage>;

  $: total = Object.values(damage).reduce((p, c) => p + c, 0);
</script>

<span class="damage-badge">
  {Math.round(total * 10) / 10}
</span>
