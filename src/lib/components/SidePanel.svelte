<script lang="ts">
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
	class="bg-neutral-900 me-0 mt-0 h-screen overflow-y-scroll border-s border-zinc-800"
	style="scrollbar-width: thin; scrollbar-color: #444 transparent;"
>
	<button
		type="button"
		class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50 backdrop-blur-sm flex items-center"
		on:click={() => close()}
	>
		<span class="sr-only">Close modal</span>
	</button>

	<div class="relative z-30 bg-neutral-800/30">
		<slot />
	</div>
</dialog>

<style>
	dialog:modal {
		max-height: 100vh;
	}

	dialog > div {
		animation: fade-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	dialog[open] > div {
		animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateX(20px);
		}

		100% {
			opacity: 1;
			transform: translateX(0px);
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: translateX(0px);
		}

		100% {
			opacity: 0;
			transform: translateX(20px);
		}
	}
</style>
