<script lang="ts">
	import { createBuild } from '$lib/api';
	import { calcNeededSouls } from '$lib/core';
	import { heroContexts, heroTypes, sharedDataState, type HeroState } from '$lib/hero';
	import HeroWeightStatus from '$lib/hero/components/HeroWeightStatus.svelte';
	import { appState, uiState } from '$lib/state';
	import CheckboxControl from './CheckboxControl.svelte';
	import Dialog from './Dialog.svelte';
	import SelectControl from './SelectControl.svelte';

	export let hero: HeroState;

	let sharedResultDialog: Dialog;

	let creatingUrl = false;
	let sharedUrl = '';

	async function createSharedUrl() {
		creatingUrl = true;
		sharedUrl = await createBuild($sharedDataState);
		creatingUrl = false;

		sharedResultDialog.open();
	}
</script>

<header>
	<div class="flex justify-between">
		<h1 class="text-3xl font-bold dark:text-zinc-200 mb-7">
			<span>Tarnished</span> Creator
		</h1>

		<div class="flex text-right">
			<a
				href="https://www.buymeacoffee.com/digitaleshandwerk"
				class="inline-block w-40 me-5"
				target="_blank"
			>
				<img
					alt="Buy me a coffee button"
					src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=digitaleshandwerk&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"
				/>
			</a>
			<div>
				<p class="text-zinc-500 text-xs leading-4">
					Developed with <span
						class="mat-icon filled"
						style="font-size: 1.1em; transform: translateY(2px)">favorite</span
					>
					by Thomas Monzel <span>(v0.10.1)</span>
				</p>
				<p class="text-zinc-600 text-xs mb-3">ELDEN RING is a trademark of FromSoftware.</p>
			</div>
		</div>
	</div>

	<div class="flex gap-20 mb-3">
		<div>
			<h3 class="text-md text-zinc-500 mb-2">Class</h3>
			<div>
				<SelectControl options={heroTypes} bind:value={$appState.heroType} let:item>
					<svelte:fragment slot="selected" let:item>
						<div class="p-1 text-xl">{item?.name}</div>
					</svelte:fragment>

					{item.name}
				</SelectControl>
			</div>
		</div>

		<div>
			<h3 class="text-md text-zinc-500 mb-2">Level</h3>
			<p class="text-4xl">{hero.level}</p>
		</div>

		<div>
			<h3 class="text-md text-zinc-500 mb-2">Attribute Points</h3>
			<p class="text-4xl">{hero.attributePoints}</p>
		</div>

		<div>
			<h3 class="text-md text-zinc-500 mb-2">Attack Power (Mainhand/Offhand)</h3>
			<p class="text-4xl">
				{Math.round(hero.attack.mainHand.getTotal() * 10) / 10} / {Math.round(
					hero.attack.offHand.getTotal() * 10
				) / 10}
			</p>
		</div>

		<div class="ml-auto flex items-end">
			<div class="me-10 max-w-44">
				<CheckboxControl bind:checked={$appState.excludeStaminaFromAttackCalc}>
					Exclude Stamina from total attack damage
				</CheckboxControl>
			</div>
			<div class="me-10 max-w-44"></div>
			<div>
				<button
					type="button"
					class="px-3 py-2 font-medium border-2 rounded-xl flex items-center disabled:text-zinc-500 disabled:border-zinc-500 group"
					disabled={creatingUrl}
					on:click={() => createSharedUrl()}
				>
					{#if creatingUrl}
						<div class="spinner me-2"></div>
					{:else}
						<svg
							class="fill-zinc-200 group-disabled:fill-zinc-500 me-2"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#5f6368"
							><path
								d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"
							/></svg
						>
					{/if}
					<span>Share your build</span>
				</button>
			</div>
		</div>
	</div>

	<div class="relative mb-10">
		<div class="text-right transition-all" style:width={hero.progress * 100 + '%'}>
			<div
				class="font-light text-sm text-zinc-400 flex items-center mb-1 transition-opacity opacity-0"
				class:justify-end={hero.progress > 0.075}
				class:opacity-100={$uiState.showAttributeInfo !== null}
			>
				{hero.souls.toLocaleString()}<span class="ms-1"
					>(+{calcNeededSouls(hero.level).toLocaleString()})</span
				>
			</div>

			<hr class="h-1 bg-amber-300 border-amber-300" />
		</div>
		<hr class="opacity-30" />
	</div>
</header>

<Dialog bind:this={sharedResultDialog}>
	<h3 class="text-lg font-semibold text-amber-300 flex" slot="title">
		<svg
			class="me-2 fill-amber-300"
			xmlns="http://www.w3.org/2000/svg"
			height="26px"
			viewBox="0 -960 960 960"
			width="26px"
			fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg
		> Shared build created
	</h3>
	<label for="sharedBuildUrlInput" class="mb-2 block text-zinc-400"
		>Your build is available at:</label
	>
	<input
		id="sharedBuildUrlInput"
		type="text"
		class="rounded-md bg-zinc-800 w-full focus:ring-amber-300 focus:border-amber-300"
		value={sharedUrl}
		readonly
	/>
</Dialog>

<style>
	.spinner {
		width: 20px;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 2px solid #71717a;
		animation:
			l20-1 0.8s infinite linear alternate,
			l20-2 1.6s infinite linear;
	}
	@keyframes l20-1 {
		0% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
		}
		12.5% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
		}
		25% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
		}
		62.5% {
			clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
		}
		75% {
			clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
		}
	}
	@keyframes l20-2 {
		0% {
			transform: scaleY(1) rotate(0deg);
		}
		49.99% {
			transform: scaleY(1) rotate(135deg);
		}
		50% {
			transform: scaleY(-1) rotate(0deg);
		}
		100% {
			transform: scaleY(-1) rotate(-135deg);
		}
	}
</style>
