<script lang="ts">
	import type { Attack } from './types';

	export let attack: Attack;

	$: total = Object.values(attack).reduce((p, c) => p + c, 0);
</script>

<span class="damage-badge">
	{Math.round(total * 10) / 10}
</span>
