<script lang="ts">
	import HeroInfoBar from '$lib/hero/components/HeroInfoBar.svelte';
	import DonateButton from './DonateButton.svelte';
	import RuneProgressBar from './RuneProgressBar.svelte';
	import ShareButton from './ShareButton.svelte';
</script>

<header class="mb-12">
	<div class="flex">
		<div class="me-16">
			<h1 class="font-bold text-zinc-200 mb-2 leading-8" style="font-size: 2rem;">
				<span class="text-zinc-200">Tarnished</span><br /><span class="">Creator</span>
			</h1>
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

	<!--<div class="flex justify-between">
		<ContextNav />
		<div class="flex justify-end items-center">
			<ShareButton />
		</div>
	</div>-->
</header>
