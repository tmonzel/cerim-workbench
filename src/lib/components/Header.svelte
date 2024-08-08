<script lang="ts">
	import HeroInfoBar from '$lib/hero/components/HeroInfoBar.svelte';
	import ContextNav from './ContextNav.svelte';
	import RuneProgressBar from './RuneProgressBar.svelte';
	import ShareButton from './ShareButton.svelte';
</script>

<header class="mb-16">
	<div class="flex">
		<h1 class="text-3xl font-bold dark:text-zinc-200 me-20">
			<span>Tarnished</span> Creator
		</h1>

		<HeroInfoBar />

		<div class="ml-auto flex flex-col justify-between">
			<div class="text-right">
				<p class="text-zinc-400 text-xs leading-4">
					<span class="text-emerald-300">v0.13.1</span><br />Handcrafted with
					<span class="mat-icon filled" style="font-size: 1.1em; transform: translateY(2px)">favorite</span>
					by Thomas Monzel
				</p>
				<p class="text-zinc-500 text-xs mb-3">ELDEN RING is a trademark of FromSoftware.</p>
			</div>
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
