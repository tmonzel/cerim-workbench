<script lang="ts">
	import { heroState } from '../state';
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
		<StatCard stat={$heroState.hp} />
		<StatCard stat={$heroState.fp} />
	</div>
	<div class="grid grid-cols-3 gap-5 mb-5">
		<StatCard stat={$heroState.stamina} />
		<StatCard stat={$heroState.discovery} />
		<StatCard stat={$heroState.equipLoad} />
	</div>
{/if}

{#if activeView === 'resistances'}
	<div class="grid grid-cols-2 gap-5 mb-5">
		<StatCard stat={$heroState.immunity} />
		<StatCard stat={$heroState.robustness} />
		<StatCard stat={$heroState.focus} />
		<StatCard stat={$heroState.vitality} />
	</div>
{/if}

{#if activeView === 'defense'}
	<div class="grid grid-cols-4 gap-5 mb-5">
		<StatCard stat={$heroState.standardDefense} />
		<StatCard stat={$heroState.strikeDefense} />
		<StatCard stat={$heroState.slashDefense} />
		<StatCard stat={$heroState.pierceDefense} />
		<StatCard stat={$heroState.magicDefense} />
		<StatCard stat={$heroState.fireDefense} />
		<StatCard stat={$heroState.holyDefense} />
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
