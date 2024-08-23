<script lang="ts">
	import { createBuild } from '$lib/api';
	import Dialog from '$lib/components/Dialog.svelte';
	import { makeSharedBuildSnapshot } from '$lib/share';

	let sharedResultDialog: Dialog;

	let creatingUrl = false;
	let sharedUrl = '';

	async function createSharedUrl() {
		creatingUrl = true;
		sharedUrl = await createBuild(makeSharedBuildSnapshot());
		creatingUrl = false;

		sharedResultDialog.open();
	}
</script>

<button
	type="button"
	class="px-3 py-2 font-medium border-2 rounded-xl flex items-center disabled:text-zinc-500 disabled:border-zinc-500 select-none group"
	disabled={creatingUrl}
	on:click={() => createSharedUrl()}
>
	{#if creatingUrl}
		<div class="spinner me-2"></div>
	{:else}
		<span class="mat-icon me-2">share</span>
	{/if}
	<span>Share your build</span>
</button>

<Dialog bind:this={sharedResultDialog} class="mt-10 share-dialog">
	<h3 class="text-lg font-semibold text-amber-300 flex me-10" slot="title">
		<span class="mat-icon me-2">check</span> Shared build created
	</h3>
	<div class="p-5">
		<label for="sharedBuildUrlInput" class="mb-2 block text-zinc-400">Your build is available at:</label>
		<input
			id="sharedBuildUrlInput"
			type="text"
			class="rounded-md bg-zinc-800 w-full focus:ring-amber-300 focus:border-amber-300"
			value={sharedUrl}
			readonly
		/>
	</div>
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
