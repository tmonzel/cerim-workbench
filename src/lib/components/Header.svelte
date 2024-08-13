<script lang="ts">
	import HeroInfoBar from '$lib/hero/components/HeroInfoBar.svelte';
	import ContextNav from './ContextNav.svelte';
	import DonateButton from './DonateButton.svelte';
	import RuneProgressBar from './RuneProgressBar.svelte';
	import ShareButton from './ShareButton.svelte';
</script>

<header class="mb-16">
	<div class="flex">
		<div>
			<h1 class="text-3xl font-bold text-zinc-300 me-20">Tarnished Creator</h1>
			<h2 class="text-zinc-600 font-medium">An Elden Ring Hero Planner</h2>
		</div>

		<HeroInfoBar />

		<div class="ml-auto text-right">
			<p class="text-zinc-400 text-xs leading-4">
				<span class="text-emerald-300">v0.19</span><br />Handcrafted with
				<span class="mat-icon filled" style="font-size: 1.1em; transform: translateY(2px)">favorite</span>
				by Thomas Monzel
			</p>
			<p class="text-zinc-500 text-xs mb-4">ELDEN RING is a trademark of FromSoftware.</p>

			<DonateButton />
		</div>
	</div>

	<RuneProgressBar />

	<div class="flex justify-between">
		<ContextNav />
		<div class="flex justify-end items-center">
			<ShareButton />
		</div>
	</div>
</header>
