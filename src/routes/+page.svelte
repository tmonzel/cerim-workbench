<script lang="ts">
	import StatCard from '$lib/stat/StatCard.svelte';
	import { heroState } from '$lib/state';

	let activeView: string | null = null;
</script>

<div class="flex mb-5 border-b border-zinc-700">
	<button class="rounded-tl-lg text-left nav-btn basis-1/3" class:active={!activeView} on:click={() => (activeView = null)}>
		<h3 class="font-semibold text-lg">General</h3>
		<p class="mt-1 opacity-75">HP, FP, Stamina, Discovery & Equip Load</p>
	</button>

	<button class="text-left nav-btn basis-1/3" class:active={activeView === 'resistances'} on:click={() => (activeView = 'resistances')}>
		<h3 class="font-semibold text-lg">Resistance</h3>
		<p class="mt-1 opacity-75">Immunity, Robustness, Focus & Vitality</p>
	</button>

	<button class="rounded-tr-lg text-left nav-btn basis-1/3" class:active={activeView === 'defense'} on:click={() => (activeView = 'defense')}>
		<h3 class="font-semibold text-lg">Defense</h3>
		<p class="mt-1 opacity-75">Standard, Strike, Slash, Pierce & Elemental</p>
	</button>
</div>

{#if !activeView}
	<div class="grid xl:grid-cols-2 gap-5 mb-5">
		<StatCard name="hp" hero={$heroState} />
		<StatCard name="fp" hero={$heroState} />
	</div>
	<div class="grid xl:grid-cols-3 gap-5 mb-5">
		<StatCard name="stamina" hero={$heroState} />
		<StatCard name="discovery" hero={$heroState} />
		<StatCard name="equipLoad" hero={$heroState} />
	</div>
{/if}

{#if activeView === 'resistances'}
	<div class="grid grid-cols-2 gap-5 mb-5">
		<StatCard name="immunity" hero={$heroState} />
		<StatCard name="robustness" hero={$heroState} />
		<StatCard name="focus" hero={$heroState} />
		<StatCard name="vitality" hero={$heroState} />
	</div>
{/if}

{#if activeView === 'defense'}
	<div class="grid lg:grid-cols-2 2xl:grid-cols-4 gap-5 mb-5">
		<StatCard name="standardDefense" hero={$heroState} />
		<StatCard name="strikeDefense" hero={$heroState} />
		<StatCard name="slashDefense" hero={$heroState} />
		<StatCard name="pierceDefense" hero={$heroState} />
		<StatCard name="magicDefense" hero={$heroState} />
		<StatCard name="fireDefense" hero={$heroState} />
		<StatCard name="holyDefense" hero={$heroState} />
	</div>
{/if}

<style>
	.nav-btn {
		padding: 0.8rem 1.2rem;
		padding-bottom: 1rem;
		color: rgb(148, 148, 148);
		border-bottom: 4px solid transparent;
		background-color: rgb(63 63 70 / 0.05);
	}

	.nav-btn.active {
		color: #c7c7c7;
		border-bottom: 4px solid #ff6b51;
		background-color: rgb(63 63 70 / 0.2);
	}
</style>
