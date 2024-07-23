<script lang="ts">
	export let weightRatio: number;
</script>

<div>
	{#if weightRatio < 30}
		<div class="bg-green-400 h-1" style:width={`${weightRatio}%`}></div>
		<span>Light Load</span>
	{:else if weightRatio < 70}
		<div class="bg-orange-400 h-1" style:width={`${weightRatio}%`}></div>
		<span>Medium Load</span>
	{:else if weightRatio < 100}
		<div class="bg-red-400 h-1" style:width={`${weightRatio}%`}></div>
		<span>Heavy Load</span>
	{:else if weightRatio >= 100 && weightRatio !== Infinity}
		<div class="bg-red-700 h-1" style:width={`100%`}></div>
		<span>Overloaded</span>
	{:else}
		-
	{/if}

	{#if weightRatio && weightRatio !== Infinity}({Math.round(weightRatio * 10) / 10}%){/if}
</div>
