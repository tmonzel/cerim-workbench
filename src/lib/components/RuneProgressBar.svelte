<script lang="ts">
	import { calcNeededSouls } from '$lib/core';
	import { heroState } from '$lib/hero';
	import { uiState } from '$lib/state';
</script>

<div class="relative mb-10">
	<div class="text-right transition-all" style:width={$heroState.progress * 100 + '%'}>
		<div
			class="font-light text-sm text-zinc-400 flex items-center mb-1 transition-opacity opacity-0"
			class:justify-end={$heroState.progress > 0.075}
			class:opacity-100={$uiState.showAttributeInfo !== null}
		>
			{$heroState.souls.toLocaleString()}<span class="ms-1"
				>(+{calcNeededSouls($heroState.level).toLocaleString()})</span
			>
		</div>

		<hr class="h-1 bg-amber-300 border-amber-300" />
	</div>
	<hr class="opacity-30" />
</div>
