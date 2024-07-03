<script lang="ts">
	import ItemSelectList from './ItemSelectList.svelte';
	import type { Item } from '../Item';

  export let items: Item[] = [];

  let dialog: HTMLDialogElement;
  let opened = false;

  let selectedItemId: string | null = null;

  export function open(): void {
    dialog.showModal();
    opened = true;
  }

  export function close(): void {
    dialog.close();
    opened = false;
  }

  export function selectItem(item: Item | null): void {
    //equipStore.update((store) => ({ ...store, [slotKey]: item }));
    selectedItemId = item ? item.id : null;

    close();
  }
</script>

<dialog bind:this={dialog} class="bg-neutral-900 me-0 mt-0 h-screen overflow-x-hidden overflow-y-scroll border-s border-zinc-800" style="min-width: 600px; scrollbar-width: thin; scrollbar-color: #444 transparent;">
  <button type="button" class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50" on:click={() => close()}>
    <span class="sr-only">Close modal</span>
  </button> 

  <div class="relative z-50">
    <ItemSelectList {items} on:selectItem={(e) => selectItem(e.detail)} />
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