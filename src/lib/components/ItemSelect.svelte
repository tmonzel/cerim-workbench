<script lang="ts">
	import type { Item } from '$lib/core';

  export let items: Item[];
  export let selectedItemId: string | null = null;

  export function selectItem(id: string | null): void {
    selectedItemId = id;
  }
</script>

<ul class="grid gap-5">
  <li>
    <button 
      type="button" 
      class="text-left w-full h-full rounded-lg flex p-5 hover:bg-zinc-800/50 group text-white" 
      on:click={() => selectItem(null)} 
      class:ring-2={selectedItemId === null}
      class:bg-stone-800={selectedItemId === null}
      class:ring-amber-300={selectedItemId === null}
    >
      No Item
    </button>
  </li>
  {#each items as item}
  <li>
    <button 
      type="button" 
      class="text-left text-white w-full rounded-lg flex p-5 hover:bg-zinc-800/50 group" 
      on:click={() => selectItem(item.id)} 
      class:ring-2={selectedItemId === item.id}
      class:bg-stone-800={selectedItemId === item.id}
      class:ring-amber-300={selectedItemId === item.id}
    >
      {item.name}
    </button>
  </li>
  {/each}
</ul>