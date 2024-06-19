<script lang="ts">
  export let label: string;
  export let value: number;

  const id = crypto.randomUUID();

  function changeValue(newValue: number) {
    if(newValue < 0) {
      return;
    }

    value = newValue;
  }
</script>

<label for={id} class="block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-200">{label}</label>
<div class="relative mt-2 rounded-md text-lg font-medium">
  <div class="absolute inset-y-0 left-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value - 1)}
    >
      -
    </button>
  </div>
  <input type="text" id={id} class="block w-full rounded-md text-lg border-0 py-2 text-center text-gray-900 dark:bg-zinc-600/20 dark:text-teal-300 ring-zinc-500 focus:ring-teal-300" readonly value={value}>
  <div class="absolute inset-y-0 right-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-gray-500 dark:text-zinc-200 hover:scale-150 transition-transform ease-out" 
      on:click={() => changeValue(value + 1)}
    >
      +
    </button>
  </div>
</div>