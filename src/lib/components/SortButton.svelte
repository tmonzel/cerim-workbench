<script lang="ts">
	export let state: number;
</script>

<button class:text-zinc-500={state === 0} class:text-amber-300={state !== 0} on:click={() => (state = (state + 1) % 3)} class="select-none">
	<slot />
	{#if state === 1}
		^
	{:else if state === 2}
		<span class="inline-block rotate-180">^</span>
	{/if}
</button>
