<script lang="ts">
	import { heroState } from '../state';
	import StatNumber from './StatNumber.svelte';

	export let name: string;

	$: dv = $heroState.stats[name];
	$: value = dv.getTotal();
</script>

{#if dv.base < value}
	<span class="text-emerald-300 bg-emerald-600/10 px-1 rounded-lg">
		<StatNumber {name} {value} />^
	</span>
{:else if dv.base > value}
	<span class="text-red-400">
		<StatNumber {name} {value} /><span class="inline-block rotate-180">^</span>
	</span>
{:else}
	<span><StatNumber {name} {value} /></span>
{/if}
