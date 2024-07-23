<script lang="ts">
	export let weightRatio: number;
</script>

<div>
	{#if weightRatio < 30}
		<span>Light Load ({Math.round(weightRatio * 10) / 10}%)</span>
		<div class="bg-green-400 h-1" style:width={`${weightRatio}%`}></div>
	{:else if weightRatio < 70}
		<span>Medium Load ({Math.round(weightRatio * 10) / 10}%)</span>
		<div class="bg-orange-400 h-1" style:width={`${weightRatio}%`}></div>
	{:else if weightRatio < 100}
		<span>Heavy Load ({Math.round(weightRatio * 10) / 10}%)</span>
		<div class="bg-red-400 h-1" style:width={`${weightRatio}%`}></div>
	{:else if weightRatio >= 100 && weightRatio !== Infinity}
		<span>Overloaded ({Math.round(weightRatio * 10) / 10}%)</span>
		<div class="bg-red-700 h-1" style:width={`100%`}></div>
	{:else}
		-
	{/if}
</div>
