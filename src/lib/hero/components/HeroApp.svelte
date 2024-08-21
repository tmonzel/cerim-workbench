<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import TabPanel from '$lib/components/TabPanel.svelte';
	import AttributePanel from './AttributePanel.svelte';
	import HeroStats from './HeroStats.svelte';
	import ProtectionStats from './ProtectionStats.svelte';

	const statTabs = [
		{
			label: 'General',
			component: HeroStats
		},

		{
			label: 'Protection',
			component: ProtectionStats
		}
	];
</script>

<div class="px-12 py-10">
	<Header />

	<div class="flex gap-10">
		<div class="min-w-56">
			<div class="sticky top-5 z-10">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Attributes</h3>
					<p class="mt-1 text-zinc-400">Distribute your attributes</p>
				</div>
				<AttributePanel />
			</div>
		</div>

		<div class="grow">
			<slot />
		</div>

		<div class="max-w-72">
			<div class="sticky top-5">
				<div class="mb-10">
					<h3 class="font-semibold text-lg">Stats</h3>
					<p class="mt-1 text-zinc-400">Calculated hero stats based on attributes, gear etc.</p>
				</div>
				<TabPanel items={statTabs} />
			</div>
		</div>
	</div>
</div>
