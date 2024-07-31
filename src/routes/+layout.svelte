<script lang="ts">
	import '../fonts.css';
	import '../app.css';
	import { loadData } from '$lib/data';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { findBuild } from '$lib/api';
	import { applySharedBuild } from '$lib/share';

	let loading = true;

	onMount(async () => {
		await loadData();

		if ($page.params.uid) {
			// Fetch shared build configuration
			const build = await findBuild($page.params.uid);

			if (build) {
				applySharedBuild(build);
			}
		}

		loading = false;
	});
</script>

<svelte:head>
	<title>Tarnished Creator | An Elden Ring Hero Planner</title>
</svelte:head>

{#if loading}
	<div class="text-white p-10">
		<div class="text-md text-zinc-500">
			<div class="loader mb-2"></div>
			Stay patient, tarnished&hellip;
		</div>
	</div>
{:else}
	<slot />
{/if}
