<script lang="ts">
	import '../fonts.css';
	import '../app.css';
	import { dataStore, loadData, type DataSchema } from '$lib/data';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { findBuild } from '$lib/api';

	/** @type {import('./$types').PageData} */
	export let data: DataSchema;

	/**
	 * TODOS FOR RELEASE
	 * - Show SpEffects/Passives from items in item list
	 * - Split L1 und L2 Damage
	 * - No weapon equipped deals also damage (fist)
	 * - Show SpEffect icons
	 * - PVP Data Switch
	 * - Exclude Stamina Damage switch
	 * - Next Weapon Upgrade info
	 * - Check share your build feature and item ids
	 * - Mobile optimizations (Hide modifiers on smaller screen sizes)
	 */

	// TODOS
	// Implement local storage
	// UI: Scrolling Header
	// UI: Compact mode for equipslots (3 modes maybe)

	// Damage Negation => 50 + (base negation) / 2. ()

	/**
   * RITUAL SHIELD TALISMAN
   * Increases your damage negation by an amount equal to 30% of what you would receive. 
   * For example, at 0 base negation the talisman would provide 30 negation, thus reducing damage taken by 30%. 
   * At 50 base negation it provides 15 negation, thus still reducing damage taken by 30%.
Due to the above effect also taking into account negative negation, this talisman is particularly effective for 'glass cannon' builds. 
As the amount of negation directly scales with how much you already have, having negative negation can even further increase the net negation of the item.
For example, having two Scorpion Charms and Ragadon's Soreseal without armor equipped normally leaves you at -39.150% physical negation, 
but with the talisman it leaves you at a total of 2.5% negation, effectively cancelling out the debuffs and making stacking such items 
much more survivable and significantly decreasing your chances of being one-shot.
  */

	onMount(async () => {
		if ($page.params.uid) {
			// Merging defaults
			const defaults = await findBuild($page.params.uid);

			if (defaults) {
				Object.assign(data, { defaults });
			}
		}

		loadData(data);
	});
</script>

<svelte:head>
	<title>Tarnished Creator | An Elden Ring Hero Planner</title>
</svelte:head>

{#if $dataStore}
	<slot></slot>
{:else}
	<div class="text-white p-10">
		<div class="text-md text-zinc-500">
			<div class="loader mb-2"></div>
			Stay patient, tarnished&hellip;
		</div>
	</div>
{/if}
