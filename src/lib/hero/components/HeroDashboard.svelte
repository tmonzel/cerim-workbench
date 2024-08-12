<script lang="ts">
	import StatCard from './StatCard.svelte';

	let activeView: string | null = null;
</script>

<div class="flex mb-5 border-b border-zinc-700">
	<button class="rounded-tl-lg text-left nav-btn" class:active={!activeView} on:click={() => (activeView = null)}>
		<h3 class="font-semibold text-lg">General</h3>
		<p class="mt-1 opacity-75">HP, FP, Stamina, Discovery & Equip Load</p>
	</button>

	<button
		class="text-left nav-btn"
		class:active={activeView === 'resistances'}
		on:click={() => (activeView = 'resistances')}
	>
		<h3 class="font-semibold text-lg">Resistance</h3>
		<p class="mt-1 opacity-75">Immunity, Robustness, Focus & Vitality</p>
	</button>

	<button
		class="rounded-tr-lg text-left nav-btn"
		class:active={activeView === 'defense'}
		on:click={() => (activeView = 'defense')}
	>
		<h3 class="font-semibold text-lg">Defense</h3>
		<p class="mt-1 opacity-75">Standard, Strike, Slash, Pierce & Elemental</p>
	</button>
</div>

{#if !activeView}
	<div class="grid grid-cols-2 gap-5 mb-5">
		<StatCard name="hp" />
		<StatCard name="fp" />
	</div>
	<div class="grid grid-cols-3 gap-5 mb-5">
		<StatCard name="stamina" />
		<StatCard name="discovery" />
		<StatCard name="equipLoad" />
	</div>
{/if}

{#if activeView === 'resistances'}
	<div class="grid grid-cols-2 gap-5 mb-5">
		<StatCard name="immunity" />
		<StatCard name="robustness" />
		<StatCard name="focus" />
		<StatCard name="vitality" />
	</div>
{/if}

{#if activeView === 'defense'}
	<div class="grid grid-cols-4 gap-5 mb-5">
		<StatCard name="standardDefense" />
		<StatCard name="strikeDefense" />
		<StatCard name="slashDefense" />
		<StatCard name="pierceDefense" />
		<StatCard name="magicDefense" />
		<StatCard name="fireDefense" />
		<StatCard name="holyDefense" />
	</div>
{/if}

<style>
	.nav-btn {
		padding: 0.8rem 1.2rem;
		padding-bottom: 1rem;
		color: rgb(148, 148, 148);
		border-bottom: 2px solid transparent;
		background-color: rgb(39 39 42 / 0.3);
	}

	.nav-btn.active {
		color: rgb(209, 209, 209);
		border-bottom: 2px solid #ff7951;
		background-color: #272727;
	}
</style>
