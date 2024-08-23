<script lang="ts">
	import { statTypes } from './types';

	export let name: string;
	export let value: number;

	$: stat = statTypes[name];
	$: total = stat.resolver ? stat.resolver(value) : value;
</script>

<span>
	{stat.renderer ? stat.renderer(total) : Math.round(total * 10) / 10}
</span>
