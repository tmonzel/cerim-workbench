<script lang="ts">
	import '../fonts.css';
	import '../app.css';
	import { loadAccessories, loadArmors, loadCalcData, loadWeapons, loadInventory } from '$lib/data';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { findBuild } from '$lib/api';
	import { applySharedBuild } from '$lib/share';
	import App from './App.svelte';

	let loading = true;

	onMount(async () => {
		await loadCalcData();
		await loadAccessories();
		await loadArmors();
		await loadWeapons();
		await loadInventory();

		const uid = $page.url.searchParams.get('uid');

		if (uid) {
			// Fetch shared build configuration
			const build = await findBuild(uid);

			if (build) {
				applySharedBuild(build);
			}
		}

		loading = false;
	});
</script>

<svelte:head>
	<title>Tarnished Creator | A Hero Planner for Elden Ring</title>
</svelte:head>

{#if loading}
	<div class="text-white p-10">
		<div class="text-md text-zinc-500">
			<div class="loader mb-2"></div>
			Stay patient, tarnished&hellip;
		</div>
	</div>
{:else}
	<App>
		<slot />
	</App>
{/if}
