<script lang="ts">
  export let title = '';
  export let backdropClose = false;

  let dialog: HTMLDialogElement;

  export function open(): void {
    dialog.showModal();
  }

  export function close(): void {
    dialog.close();
  }

</script>

<dialog bind:this={dialog} class="rounded-lg shadow-lg max-w-screen-2xl" style="margin-top: 5%;">
  {#if backdropClose}
  <button type="button" on:click={() => close()} class="fixed w-full top-0 left-0 right-0 bottom-0">
    <span class="sr-only">Close modal</span>
  </button>
  {/if}

  <div class="relative">
    <div class="flex items-center justify-between p-4 md:p-5 border-b z-50">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <button type="button" on:click={() => close()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div> 
    <div class="p-4 md:p-5">
      <slot></slot>
    </div>
    <!-- Modal footer -->
    <!--<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
        <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
    </div>-->
  </div>
</dialog>


<style>
dialog {
  animation: fade-out 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

dialog[open] {
  animation: fade-in 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

dialog[open]::backdrop {
  animation: backdrop-fade-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
    display: none;
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateY(0);
    display: block;
  }

  100% {
    opacity: 0;
    transform: translateY(10px);
    display: none;
  }
}

@keyframes backdrop-fade-in {
  0% {
    background-color: rgb(0 0 0 / 0%);
  }

  100% {
    background-color: rgb(0 0 0 / 25%);
  }
}
</style>