<script lang="ts">
	import { createBuild } from '$lib/api';
	import { makeSharedBuildSnapshot } from '$lib/share';

	import Dialog from './Dialog.svelte';

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
	class="px-4 py-2 font-medium border-2 rounded-xl text-lg flex items-center disabled:text-zinc-500 disabled:border-zinc-500 group"
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
	<label for="sharedBuildUrlInput" class="mb-2 block text-zinc-400">Your build is available at:</label>
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
