<script lang="ts">
	import Button from './Button.svelte';

	let selectionDialog: HTMLDialogElement;
	let opened = false;

	export function open(): void {
		selectionDialog.showModal();
		opened = true;
	}

	export function close(): void {
		selectionDialog.close();
		opened = false;
	}
</script>

<dialog
	bind:this={selectionDialog}
	class="bg-neutral-900"
	style="scrollbar-width: thin; scrollbar-color: #444 transparent; height: 90vh; min-width: 80vw"
>
	<button
		type="button"
		class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/80 flex items-center"
		on:click={() => close()}
	>
		<span class="sr-only">Close modal</span>
	</button>

	<div class="relative z-30 bg-neutral-800/30">
		<div class="text-stone-300 bg-zinc-800 text-xl p-5 flex justify-between items-center border-b border-zinc-700">
			<div>
				<slot name="title" />
			</div>

			<Button icon="close" on:click={() => close()}></Button>
		</div>
		<slot />
	</div>
</dialog>

<style>
	dialog:modal {
		max-height: 100vh;
	}

	dialog > div {
		animation: fade-out 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	dialog[open] > div {
		animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(0px);
		}

		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: translateY(0px);
		}

		100% {
			opacity: 0;
			transform: translateY(0px);
		}
	}
</style>
